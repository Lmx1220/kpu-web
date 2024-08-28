import type { RouteRecordRaw, Router } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import '@/assets/styles/nprogress.css'
import { asyncRoutes, asyncRoutesByFilesystem } from './routes'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import useRouteStore from '@/store/modules/route'
import useMenuStore from '@/store/modules/menu'
import useKeepAliveStore from '@/store/modules/keepAlive'
import useTabbarStore from '@/store/modules/tabbar.ts'
import useFavoritesStore from '@/store/modules/favorites.ts'
import useIframeStore from '@/store/modules/iframe.ts'

function setupRoutes(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()
    const tabbarStore = useTabbarStore()
    const favoritesStore = useFavoritesStore()
    // 是否已登录
    if (userStore.isLogin) {
      // 是否已根据权限动态生成并注册路由
      if (routeStore.isGenerate) {
        // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
        settingsStore.settings.menu.mode !== 'single' && menuStore.setActived(to.path)
        // 如果已登录状态下，进入登录页会强制跳转到主页
        if (to.name === 'login') {
          next({
            path: settingsStore.settings.home.fullPath,
            replace: true,
          })
        }
        // 如果未开启主页，但进入的是主页，则会进入侧边栏导航第一个模块
        else if (!settingsStore.settings.home.enable && to.fullPath === settingsStore.settings.home.fullPath) {
          const tabbar = tabbarStore.list.find(item => item.isPin)
          if (settingsStore.settings.tabbar.enable && tabbar) {
            next({ path: tabbar.fullPath, replace: true })
          }
          else if (menuStore.sidebarMenus.length > 0) {
            next({ path: menuStore.sidebarMenusFirstDeepestPath, replace: true })
          }
          else {
            next()
          }
        }
        // 正常访问页面
        else {
          next()
        }
      }
      else {
        // 获取用户权限
        settingsStore.settings.app.enablePermission && await userStore.getPermissions()
        // 获取用户偏好设置
        settingsStore.settings.userPreferences.enable && await userStore.getPreferences()
        // 复原固定标签页
        settingsStore.settings.tabbar.enable && await tabbarStore.recoveryStorage()
        // 复原收藏夹
        settingsStore.settings.toolbar.favorites && await favoritesStore.recoveryStorage()
        // 生成动态路由
        switch (settingsStore.settings.app.routeBaseOn) {
          case 'frontend':
            routeStore.generateRoutesAtFront(asyncRoutes)
            break
          case 'backend':
            await routeStore.generateRoutesAtBack()
            break
          case 'filesystem':
            routeStore.generateRoutesAtFilesystem(asyncRoutesByFilesystem)
            // 文件系统生成的路由，需要手动生成导航数据
            switch (settingsStore.settings.menu.baseOn) {
              case 'frontend':
                menuStore.generateMenusAtFront()
                break
              case 'backend':
                await menuStore.generateMenusAtBack()
                break
            }
            break
        }
        // 注册并记录路由数据
        // 记录的数据会在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
        const removeRoutes: (() => void)[] = []
        routeStore.flatRoutes.forEach((route) => {
          if (!/^(?:https?:|mailto:|tel:)/.test(route.path)) {
            removeRoutes.push(router.addRoute(route as RouteRecordRaw))
          }
        })
        if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
          routeStore.flatSystemRoutes.forEach((route) => {
            removeRoutes.push(router.addRoute(route as RouteRecordRaw))
          })
        }
        routeStore.setCurrentRemoveRoutes(removeRoutes)
        // 动态路由生成并注册后，重新进入当前路由
        next({
          path: to.path,
          query: to.query,
          replace: true,
        })
      }
    }
    else {
      if (to.name !== 'login') {
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
}

// 进度条
function setupProgress(router: Router) {
  const { isLoading } = useNProgress()
  router.beforeEach((to, from, next) => {
    const settingsStore = useSettingsStore()
    if (settingsStore.settings.app.enableProgress) {
      isLoading.value = true
    }
    next()
  })
  router.afterEach(() => {
    const settingsStore = useSettingsStore()
    if (settingsStore.settings.app.enableProgress) {
      isLoading.value = false
    }
  })
}

// 标题
function setupTitle(router: Router) {
  router.afterEach((to) => {
    const settingsStore = useSettingsStore()
    if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
      settingsStore.setTitle(to.meta.breadcrumbNeste?.at(-1)?.title ?? to.meta.title)
    }
    else {
      settingsStore.setTitle(to.meta.title)
    }
  })
}

// 页面缓存
function setupKeepAlive(router: Router) {
  router.afterEach((to, from) => {
    const keepAliveStore = useKeepAliveStore()
    const iframeStore = useIframeStore()
    if (to.fullPath !== from.fullPath) {
      /**
       * 处理普通页面的缓存
       */
      // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
      if (to.meta.cache && !to.meta.iframe) {
        const componentName = to.matched.at(-1)?.components?.default.name
        if (componentName) {
          keepAliveStore.add(componentName)
        }
        else {
          // turbo-console-disable-next-line
          console.warn('[Kpu-web] 该页面组件未设置组件名，会导致缓存失效，请检查')
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
      /**
       * 处理 iframe 页面的缓存
       */
      if (to.meta.iframe) {
        iframeStore.open({
          path: to.fullPath,
          src: to.query.iframe as string ?? to.meta.iframe,
          title: to.query.title as string ?? to.meta.title,
        })
      }
      if (from.meta.iframe) {
        if (from.meta.cache) {
          switch (typeof from.meta.cache) {
            case 'string':
              if (from.meta.cache !== to.name) {
                iframeStore.close(from.fullPath)
              }
              break
            case 'object':
              if (!from.meta.cache.includes(to.name as string)) {
                iframeStore.close(from.fullPath)
              }
              break
          }
          if (from.meta.noCache) {
            switch (typeof from.meta.noCache) {
              case 'string':
                if (from.meta.noCache === to.name) {
                  iframeStore.close(from.fullPath)
                }
                break
              case 'object':
                if (from.meta.noCache.includes(to.name as string)) {
                  iframeStore.close(from.fullPath)
                }
                break
            }
          }
          if (to.name === 'reload') {
            iframeStore.close(from.fullPath)
          }
        }
        else {
          iframeStore.close(from.fullPath)
        }
      }
    }
  })
}

// 其他
function setupOther(router: Router) {
  router.afterEach(() => {
    document.documentElement.scrollTop = 0
  })
}

export default function setupGuards(router: Router) {
  setupRoutes(router)
  setupProgress(router)
  setupTitle(router)
  setupKeepAlive(router)
  setupOther(router)
}
