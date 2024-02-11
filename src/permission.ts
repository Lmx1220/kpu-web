import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import '@/assets/styles/nprogress.scss'
import router from './router'
import { asyncRoutes } from './router/routes'
import useRouteStore from '@/store/modules/route'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import useUserStore from '@/store/modules/user'
import useTabbarStore from '@/store/modules/tabbar'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useIframeStore from '@/store/modules/iframe'
import useFavoritesStore from '@/store/modules/favorites'
import type { Iframe } from '@/types/global'

const { isLoading } = useNProgress()
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const settingsStore = useSettingsStore()
  const routeStore = useRouteStore()
  const menuStore = useMenuStore()
  const tabbarStore = useTabbarStore()
  const favoritesStore = useFavoritesStore()
  const iframeStore = useIframeStore()
  // console.log('to', to)
  // 是否开启进度条
  settingsStore.settings.app.enableProgress && (isLoading.value = true)
  // 是否已登录
  if (userStore.isLogin) {
    // 否已根据权限动态生成并注册路由
    if (routeStore.isGenerate) {
      if (!iframeStore.isGenerate) {
        const iframes: Iframe.recordRaw[] = []
        router.getRoutes().forEach((item) => {
          if (item.meta?.iframe && !item.meta.link) {
            iframes.push({
              path: item.path,
              src: item.meta.iframe,
              isOpen: false,
              isLoading: true,
            })
          }
        })
        iframeStore.generateList(iframes)
      }
      // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
      settingsStore.settings.menu.menuMode !== 'single' && menuStore.setActived(to.path)
      // 如果已登录状态下，进入登录页会强制跳转到主页
      if (to.name === 'login') {
        next({ path: settingsStore.settings.home.fullPath, replace: true })
      }
      // 如果未开启主页，但进入的是主页，则会进入侧边栏导航第一个模块
      else if (!settingsStore.settings.home.enable && to.fullPath === settingsStore.settings.home.fullPath) {
        const tabbar = tabbarStore.list.find(item => item.isPin)
        if (settingsStore.settings.tabbar.enable && tabbar) {
          next({ path: tabbar.fullPath, replace: true })
        }
        else if (
          menuStore.sidebarMenus.length > 0) {
          next({ path: menuStore.sidebarMenusFirstDeepestPath, replace: true })
        }
        else {
          next()
        }
      }
      else {
        next()
      }
    }
    else {
      settingsStore.settings.app.enableUserPreferences && await userStore.getPreferences()
      settingsStore.settings.tabbar.enable && await tabbarStore.recoveryStorage()
      settingsStore.settings.toolbar.favorites && await favoritesStore.recoveryStorage()
      switch (settingsStore.settings.app.routeBaseOn) {
        case 'frontend':
          await routeStore.generateRoutesAtFront(asyncRoutes)
          break
        case 'backend':
          await routeStore.generateRoutesAtBack()
          break
      }
      // 重置路由
      const removeRoutes: Function[] = []
      // 生成路由
      routeStore.flatRoutes.forEach((route) => {
        if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        }
      })
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        routeStore.flatSystemRoutes.forEach((route) => {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        })
      }
      routeStore.setCurrentRemoveRoutes(removeRoutes)
      next({
        path: to.path,
        query: to.query,
        replace: true,
      })
    }
  }
  else {
    // 如果未登录状态下，进入非登录页会强制跳转到登录页
    if (to.name !== 'login' && to.name !== 'login2') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath !== settingsStore.settings.home.fullPath ? to.fullPath : undefined,
        },
      })
    }
    else {
      next()
    }
  }
})
router.afterEach((to, from) => {
  const settingsStore = useSettingsStore()
  const keepAliveStore = useKeepAliveStore()
  const iframeStore = useIframeStore()
  settingsStore.settings.app.enableProgress && (isLoading.value = false)

  if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
    settingsStore.setTitle(to.meta.breadcrumbNeste?.at(-1)?.title ?? to.meta.title, false)
  }
  else {
    settingsStore.setTitle(to.meta.title, false)
  }
  // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
  if (to.meta.cache && !to.meta.iframe) {
    const componentName = to.matched.at(-1)?.components?.default.name
    if (componentName) {
      keepAliveStore.add(componentName)
    }
    else {
      console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
    }
  }
  // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
  if (from.meta.cache && !from.meta.iframe) {
    const componentName = from.matched.at(-1)?.components?.default.name
    if (componentName) {
      // 通过 meta.cache 判断针对哪些页面进行缓存
      switch (typeof from.meta.cache) {
        case 'string':
          if (from.meta.cache !== to.name) {
            keepAliveStore.remove(componentName)
          }
          break
        case 'object':
          if (!from.meta.cache.includes(to.name as string)) {
            keepAliveStore.remove(componentName)
          }
          break
      }
      // 通过 meta.noCache 判断针对哪些页面不需要进行缓存
      if (from.meta.noCache) {
        switch (typeof from.meta.noCache) {
          case 'string':
            if (from.meta.noCache === to.name) {
              keepAliveStore.remove(componentName)
            }
            break
          case 'object':
            if (from.meta.noCache.includes(to.name as string)) {
              keepAliveStore.remove(componentName)
            }
            break
        }
      }
      // 如果进入的是 reload 页面，则也将离开页面的缓存清空
      if (to.name === 'reload') {
        keepAliveStore.remove(componentName)
      }
    }
  }
  if (to.meta.iframe) {
    iframeStore.open(to.fullPath)
    if (from.meta.iframe) {
      if (from.meta.cache) {
        switch (typeof from.meta.cache) {
          case 'string':
            if (from.meta.cache !== to.name) {
              iframeStore.close(from.fullPath)
            }
            break
          case 'object':
            from.meta.cache.includes(to.name as string) || iframeStore.close(from.fullPath)
            break
        }
      }
      if (from.meta.noCache) {
        switch (typeof from.meta.noCache) {
          case 'string':
            if (from.meta.noCache === to.name) {
              iframeStore.close(from.fullPath)
            }
            break
          case 'object':
            from.meta.noCache.includes(to.name as string) && iframeStore.close(from.fullPath)
            break
        }
      }
    }
  }
  document.documentElement.scrollTop = 0
})
