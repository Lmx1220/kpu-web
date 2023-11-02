import { cloneDeep } from 'lodash-es'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import useSettingsStore from './settings'

import useUserStore from './user'
import useTabbarStore from './tabbar'
import { resolveRoutePath } from '@/util'
import type { Route } from '#/global'
import api from '@/api'
import systemRoutes from '@/router/modules/systemRoutes'

const useRouteStore = defineStore(
  'route',
  () => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const tabbarStore = useTabbarStore()
    // 是否已根据权限动态生成并注册路由
    const isGenerate = ref(false)
    const routesRaw = ref<Route.recordMainRaw[]>([])
    const filesystemRoutesRaw = ref<RouteRecordRaw[]>([])
    const currentRemoveRoutes = ref<Function[]>([])
    // 将多层嵌套路由处理成两层，保留顶层和最子层路由，中间层级将被拍平
    function flatAsyncRoutes<T extends RouteRecordRaw>(route: T): T {
      if (route.children) {
        route.children = flatAsyncRoutesRecursive(route.children, [{
          path: route.path,
          title: route.meta?.title,
          i18n: route.meta?.i18n,
          icon: route.meta?.icon,
          activeIcon: route.meta?.activeIcon,
          hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false,
        }], route.path, route.meta?.auth)
      }
      return route
    }
    function flatAsyncRoutesRecursive(routes: RouteRecordRaw[], breadcrumb: Route.breadcrumb[] = [], baseUrl = '', baseAuth: RouteMeta['auth']): RouteRecordRaw[] {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        if (route.children) {
          const childrenBaseUrl = resolveRoutePath(baseUrl, route.path)
          const childrenBaseAuth = baseAuth ?? route.meta?.auth
          const tmpBreadcrumb = cloneDeep(breadcrumb)
          tmpBreadcrumb.push({
            path: childrenBaseUrl,
            title: route.meta?.title,
            i18n: route.meta?.i18n,
            icon: route.meta?.icon,
            activeIcon: route.meta?.activeIcon,
            hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false,
          })
          const tmpRoute = cloneDeep(route)
          tmpRoute.path = childrenBaseUrl
          if (!tmpRoute.meta) {
            tmpRoute.meta = {}
          }
          tmpRoute.meta.auth = childrenBaseAuth
          tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
          delete tmpRoute.children
          res.push(tmpRoute)
          const childrenRoutes = flatAsyncRoutesRecursive(route.children, tmpBreadcrumb, childrenBaseUrl, childrenBaseAuth)
          childrenRoutes.forEach((item) => {
            // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
            if (res.some(v => v.path === item.path)) {
              res.forEach((v, i) => {
                if (v.path === item.path) {
                  res[i] = item
                }
              })
            }
            else {
              res.push(item)
            }
          })
        }
        else {
          const tmpRoute = cloneDeep(route)
          tmpRoute.path = resolveRoutePath(baseUrl, tmpRoute.path)
          // 处理面包屑导航
          const tmpBreadcrumb = cloneDeep(breadcrumb)
          tmpBreadcrumb.push({
            path: tmpRoute.path,
            title: tmpRoute.meta?.title,
            icon: tmpRoute.meta?.icon,
            activeIcon: tmpRoute.meta?.activeIcon,
            i18n: tmpRoute.meta?.i18n,
            hide: !tmpRoute.meta?.breadcrumb && tmpRoute.meta?.breadcrumb === false,
          })
          if (!tmpRoute.meta) {
            tmpRoute.meta = {}
          }
          tmpRoute.meta.auth = baseAuth ?? tmpRoute.meta?.auth
          tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
          res.push(tmpRoute)
        }
      })
      return res
    }
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    const flatRoutes = computed(() => {
      const settingsStore = useSettingsStore()
      const returnRoutes: RouteRecordRaw[] = []
      if (routesRaw.value) {
        if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
          routesRaw.value.forEach((item) => {
            const tmpRoutes = cloneDeep(item.children || []) as RouteRecordRaw[]
            tmpRoutes.map((v) => {
              if (!v.meta) {
                v.meta = {}
              }
              v.meta.auth = item.meta?.auth ?? v.meta?.auth
              return v
            })
            returnRoutes.push(...tmpRoutes)
          })
          returnRoutes.forEach(item => flatAsyncRoutes(item))
        }
        else {
          returnRoutes.push(...cloneDeep(filesystemRoutesRaw.value) as RouteRecordRaw[])
        }
      }
      return returnRoutes
    })
    const flatSystemRoutes = computed(() => {
      const routes = [...systemRoutes]
      routes.forEach(item => flatAsyncRoutes(item))
      return routes
    })

    // 判断是否有权限
    function hasPermission(permissions: string[], route: Route.recordMainRaw | RouteRecordRaw) {
      let isAuth = false
      if (route.meta?.auth) {
        isAuth = permissions.some((auth) => {
          if (typeof route.meta?.auth === 'string') {
            return route.meta.auth !== '' ? route.meta.auth === auth : true
          }
          else if (typeof route.meta?.auth === 'object') {
            return route.meta.auth.length > 0 ? route.meta.auth.includes(auth) : true
          }
          else {
            return false
          }
        })
      }
      else {
        isAuth = true
      }
      return isAuth
    }
    // 根据权限过滤路由
    function filterAsyncRoutes<T extends Route.recordMainRaw[] | RouteRecordRaw[]>(routes: T, permissions: string[]): T {
      const res: any = []
      routes.forEach((route) => {
        if (hasPermission(permissions, route)) {
          const tmpRoute = cloneDeep(route)
          if (tmpRoute.children) {
            tmpRoute.children = filterAsyncRoutes(tmpRoute.children, permissions)
            tmpRoute.children.length && res.push(tmpRoute)
          }
          else {
            res.push(tmpRoute)
          }
        }
      })
      return res
    }
    const routes = computed(() => {
      let returnRoutes: Route.recordMainRaw[]
      // 如果权限功能开启，则需要对路由数据进行筛选过滤
      if (settingsStore.settings.app.enablePermission && false) {
        returnRoutes = filterAsyncRoutes(routesRaw.value as any, userStore.permissions)
      }
      else {
        returnRoutes = cloneDeep(routesRaw.value) as any
      }
      return returnRoutes
    })

    // 根据权限动态生成路由（前端获取）
    async function generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
      routesRaw.value = cloneDeep(asyncRoutes) as any
      if (settingsStore.settings.app.enablePermission) {
        await userStore.getPermissions()
      }
      isGenerate.value = true
      settingsStore.settings.tabbar.enable && tabbarStore.initPermanentTab()
    }
    // 格式化后端路由数据
    function formatBackRoutes(routes: any, views = import.meta.glob('../../views/**/*.vue')): Route.recordMainRaw[] {
      return routes.map((route: any) => {
        switch (route.component) {
          case 'Layout':
            route.component = () => import('@/layouts/index.vue')
            break
          default:
            if (route.component) {
              route.component = views[`../../views/${route.component}`]
            }
            else {
              delete route.component
            }
        }
        if (route.children) {
          route.children = formatBackRoutes(route.children, views)
        }
        return route
      })
    }
    async function generateRoutesAtBack() {
      try {
        const res = await api.get<any>({
          url: '/menu/routerInit',
          // noLoading: true,
        })
        routesRaw.value = formatBackRoutes(res) as any
        if (settingsStore.settings.app.enablePermission) {
          userStore.getPermissions()
        }
        isGenerate.value = true
      }
      catch (error: any) {
        if (error.code === 'ERR_BAD_RESPONSE') {
          isGenerate.value = true
        }
        else {
          isGenerate.value = false
        }

        console.error(error)
      }
    }
    // 记录 accessRoutes 路由，用于登出时删除路由
    function setCurrentRemoveRoutes(routes: Function[]) {
      currentRemoveRoutes.value = routes
    }
    // 清空动态路由
    function removeRoutes() {
      isGenerate.value = false
      routesRaw.value = []
      currentRemoveRoutes.value.forEach((removeRoute) => {
        removeRoute()
      })
      currentRemoveRoutes.value = []
    }
    return {
      isGenerate,
      routes,
      routesRaw,
      currentRemoveRoutes,
      flatRoutes,
      flatSystemRoutes,
      generateRoutesAtFront,
      generateRoutesAtBack,
      setCurrentRemoveRoutes,
      removeRoutes,
    }
  },
)
export default useRouteStore
