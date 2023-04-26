import type { RouteRecordRaw } from 'vue-router'
import router from './router'
import { asyncRoutes } from './router/routes'
import useRouteStore from './store/modules/route'
import useSettingsStore from './store/modules/settings'
import useMenuStore from './store/modules/menu'
import useUserStore from './store/modules/user'
import useTabbarStore from './store/modules/tabbar'
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const settingsStore = useSettingsStore()
  const routeStore = useRouteStore()
  const menuStore = useMenuStore()
  const tabbarStore = useTabbarStore()
  // console.log('to', to)
  if (userStore.isLogin) {
    // 否已根据权限动态生成并注册路由
    if (routeStore.isGenerate) {
      // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
      // settingsStore.settings.menu.menuMode !== 'single' && menuStore.setActived(to.path)
      // 如果已登录状态下，进入登录页会强制跳转到主页
      if (to.path === '/login') {
        next({ name: 'home', replace: true })
      }
      // 如果未开启主页，但进入的是主页，则会进入侧边栏导航第一个模块
      else if (!settingsStore.settings.home.enable && to.name === 'home') {
        // TODO: 待开发
        const tabbar = tabbarStore.list.find(item => item.isPin)
        if (settingsStore.settings.tabbar.enable && tabbar) {
          next({ path: tabbar.fullPath, replace: true })
        }
        else {
          menuStore.sidebarMenus.length > 0 ? next({ path: menuStore.sidebarMenusFirstDeepestPath, replace: true }) : next()
        }
      }
      else {
        next()
      }
    }
    else {
      settingsStore.settings.tabbar.enable && await tabbarStore.recoveryStorage()
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
          redirect: to.fullPath !== '/' ? to.fullPath : undefined,
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
  if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
    settingsStore.setTitle(to.meta.breadcrumbNeste?.at(-1)?.title ?? to.meta.title, false)
  }
  else {
    settingsStore.setTitle(to.meta.title, false)
  }
})
