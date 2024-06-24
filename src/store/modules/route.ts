import { cloneDeep } from 'lodash-es'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import useSettingsStore from './settings'

import useTabbarStore from './tabbar'
import { resolveRoutePath } from '@/util'
import type { Route } from '#/global'
import api from '@/api'
import { systemRoutes } from '@/router/routes'

function Layout() {
  return import('@/layouts/index.vue')
}

const useRouteStore = defineStore(
  'route',
  () => {
    const settingsStore = useSettingsStore()
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
    // TODO 将设置 meta.sidebar 的属性转换成 meta.menu ，过渡处理，未来将被弃用
    let isUsedDeprecatedAttribute = false
    // TODO 将设置 meta.i18n 的属性转换成 meta.title ，过渡处理，未来将被弃用
    let isUsedDeprecatedAttributeI18n = false
    function converDeprecatedAttribute<T extends Route.recordMainRaw[]>(routes: T): T {
      routes.forEach((route) => {
        route.children = converDeprecatedAttributeRecursive(route.children)
      })
      if (isUsedDeprecatedAttribute) {
        // turbo-console-disable-next-line
        console.warn('[Fantastic-admin] 路由配置中的 "sidebar" 属性即将被弃用, 请尽快替换为 "menu" 属性')
      }
      if (isUsedDeprecatedAttributeI18n) {
        // turbo-console-disable-next-line
        console.warn('[Fantastic-admin] 路由配置中的 "i18n" 属性即将被弃用, 请尽快替换为 "title" 属性')
      }
      return routes
    }
    function converDeprecatedAttributeRecursive(routes: RouteRecordRaw[]) {
      if (routes) {
        routes.forEach((route) => {
          if (typeof route.meta?.sidebar === 'boolean') {
            isUsedDeprecatedAttribute = true
            route.meta.menu = route.meta.sidebar
            delete route.meta.sidebar
          }
          if (route.meta?.i18n) {
            isUsedDeprecatedAttributeI18n = true
            route.meta.title = route.meta.i18n
            delete route.meta.sidebar
          }
          if (route.children) {
            converDeprecatedAttributeRecursive(route.children)
          }
        })
      }
      return routes
    }
    function processRoutes(routes: Route.recordMainRaw[]) {
      return routes.map((route) => {
        if (route.children) {
          route.children.forEach((child, index, array) => {
            if (child.meta?.singleMenu) {
              array[index] = {
                ...child,
                component: Layout,
                children: [
                  {
                    path: '',
                    name: child.name,
                    component: child.component,
                    meta: {
                      title: child.meta.title,
                      i18n: child.meta.i18n,
                      menu: false,
                      breadcrumb: false,
                    },
                  } as unknown as RouteRecordRaw,
                ],
              } as unknown as RouteRecordRaw
              delete array[index].name
              delete array[index].meta?.singleMenu
            }
          },
          )
        }
        return route
      })
    }

    // 根据权限动态生成路由（前端获取）
    async function generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
      routesRaw.value = converDeprecatedAttribute(processRoutes(cloneDeep(asyncRoutes)))
      isGenerate.value = true
      settingsStore.settings.tabbar.enable && tabbarStore.initPermanentTab()
    }
    // 格式化后端路由数据
    function formatBackRoutes(routes: any, views = import.meta.glob('../../views/**/*.vue')): Route.recordMainRaw[] {
      return routes.map((route: any) => {
        switch (route.component) {
          case 'LAYOUT':
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
          url: '/anyone/visible/allRouter',
          // noLoading: true,
        })
        routesRaw.value = converDeprecatedAttribute(processRoutes(formatBackRoutes(res))) as any
        settingsStore.settings.tabbar.enable && tabbarStore.initPermanentTab()
        isGenerate.value = true
      }
      catch (error: any) {
        if (['ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST'].includes(error.code)) {
          isGenerate.value = true
        }
        else {
          isGenerate.value = false
        }

        console.error(error)
      }
    }
    // 生成路由（文件系统生成）
    function generateRoutesAtFilesystem(asyncRoutes: RouteRecordRaw[]) {
      // 设置 routes 数据
      filesystemRoutesRaw.value = processRoutes(cloneDeep(asyncRoutes) as any) as any
      isGenerate.value = true
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
    // isGenerate: Ie,
    // routesRaw: Fe,
    // currentRemoveRoutes: qe,
    // flatRoutes: bn,
    // flatSystemRoutes: wn,
    // generateRoutesAtFront: Cn,
    // generateRoutesAtBack: Sn,
    // generateRoutesAtFilesystem: Pn,
    // setCurrentRemoveRoutes: Tn,
    // removeRoutes: Nn,
    return {
      isGenerate,
      // routes,
      routesRaw,
      currentRemoveRoutes,
      flatRoutes,
      flatSystemRoutes,
      generateRoutesAtFront,
      generateRoutesAtBack,
      generateRoutesAtFilesystem,
      setCurrentRemoveRoutes,
      removeRoutes,
    }
  },
)
export default useRouteStore
