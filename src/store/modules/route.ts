import type { Route } from '#/global'
import type { RouteRecordRaw } from 'vue-router'
import { requestClient } from '@/api'
import { systemRoutes } from '@/router/routes'
import { resolveRoutePath } from '@/utils'
import { cloneDeep } from 'es-toolkit'
import useSettingsStore from './settings'
import useTabbarStore from './tabbar'

const useRouteStore = defineStore(
  // 唯一ID
  'route',
  () => {
    const settingsStore = useSettingsStore()
    const tabbarStore = useTabbarStore()
    const isGenerate = ref(false)
    const routesRaw = ref<Route.recordMainRaw[]>([])
    const filesystemRoutesRaw = ref<RouteRecordRaw[]>([])
    const currentRemoveRoutes = ref<(() => void)[]>([])

    // 将多层嵌套路由处理成两层，保留顶层和最子层路由，中间层级将被拍平
    function flatAsyncRoutes<T extends RouteRecordRaw>(route: T): T {
      if (route.children) {
        route.children = flatAsyncRoutesRecursive(route.children, [{
          path: route.path,
          title: route.meta?.title,
          icon: route.meta?.icon,
          activeIcon: route.meta?.activeIcon,
          hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false,
        }], route.path)
      }
      return route
    }
    function flatAsyncRoutesRecursive(routes: RouteRecordRaw[], breadcrumb: Route.breadcrumb[] = [], baseUrl = ''): RouteRecordRaw[] {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        if (route.children) {
          const childrenBaseUrl = resolveRoutePath(baseUrl, route.path)
          const tmpBreadcrumb = cloneDeep(breadcrumb)
          tmpBreadcrumb.push({
            path: childrenBaseUrl,
            title: route.meta?.title,
            icon: route.meta?.icon,
            activeIcon: route.meta?.activeIcon,
            hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false,
          })
          const tmpRoute = cloneDeep(route)
          tmpRoute.path = childrenBaseUrl
          if (!tmpRoute.meta) {
            tmpRoute.meta = {}
          }
          tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
          delete tmpRoute.children
          res.push(tmpRoute)
          const childrenRoutes = flatAsyncRoutesRecursive(route.children, tmpBreadcrumb, childrenBaseUrl)
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
            hide: !tmpRoute.meta?.breadcrumb && tmpRoute.meta?.breadcrumb === false,
          })
          if (!tmpRoute.meta) {
            tmpRoute.meta = {}
          }
          tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
          res.push(tmpRoute)
        }
      })
      return res
    }
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    const flatRoutes = computed(() => {
      const returnRoutes: RouteRecordRaw[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        if (routesRaw.value) {
          routesRaw.value.forEach((item: any) => {
            const tmpRoutes = cloneDeep(item.children) as RouteRecordRaw[]
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
      }
      else {
        returnRoutes.push(...cloneDeep(filesystemRoutesRaw.value) as RouteRecordRaw[])
      }
      return returnRoutes
    })
    const flatSystemRoutes = computed(() => {
      const routes = [...systemRoutes]
      routes.forEach(item => flatAsyncRoutes(item))
      return routes
    })

    // 将设置 meta.singleMenu 的一级路由转换成二级路由
    function convertSingleRoutes<T extends Route.recordMainRaw[]>(routes: T): T {
      routes.map((route) => {
        if (route.children) {
          route.children.forEach((item, index, arr) => {
            if (item.meta?.singleMenu) {
              arr[index] = {
                ...item,
                component: () => import('@/layouts/index.vue'),
                children: [
                  {
                    path: '',
                    name: item.name,
                    component: item.component,
                    meta: {
                      title: item.meta.title,
                      i18n: item.meta.i18n,
                      menu: false,
                      breadcrumb: false,
                    },
                  },
                ],
              } as RouteRecordRaw
              delete arr[index].name
              delete arr[index].meta!.singleMenu
            }
          })
        }
        return route
      })
      return routes
    }

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
        console.warn('[Kpu-web] 路由配置中的 "sidebar" 属性即将被弃用, 请尽快替换为 "menu" 属性')
      }
      if (isUsedDeprecatedAttributeI18n) {
        // turbo-console-disable-next-line
        console.warn('[Kpu-web] 路由配置中的 "i18n" 属性即将被弃用, 请尽快替换为 "title" 属性')
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
            route.meta.title = route.meta.i18n as string
            delete route.meta.sidebar
          }
          if (route.children) {
            converDeprecatedAttributeRecursive(route.children)
          }
        })
      }
      return routes
    }

    // 生成路由（前端生成）
    function generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
      // 设置 routes 数据
      routesRaw.value = converDeprecatedAttribute(convertSingleRoutes(cloneDeep(asyncRoutes) as any))
      isGenerate.value = true
      // 加载常驻标签页
      if (settingsStore.settings.tabbar.enable) {
        tabbarStore.initPermanentTab()
      }
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
    // 生成路由（后端获取）
    async function generateRoutesAtBack() {
      try {
        const res = await requestClient.get<any>('/anyone/visible/allRouter', {
          baseURL: '/mock/',
        })
        // 设置 routes 数据
        routesRaw.value = converDeprecatedAttribute(convertSingleRoutes(formatBackRoutes(res.data) as any))
        isGenerate.value = true
        // 初始化常驻标签页
        if (settingsStore.settings.tabbar.enable) {
          tabbarStore.initPermanentTab()
        }
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
      filesystemRoutesRaw.value = convertSingleRoutes(cloneDeep(asyncRoutes) as any)
      isGenerate.value = true
      // 加载常驻标签页
      if (settingsStore.settings.tabbar.enable) {
        tabbarStore.initPermanentTab()
      }
    }
    // 记录 accessRoutes 路由，用于登出时删除路由
    function setCurrentRemoveRoutes(routes: (() => void)[]) {
      currentRemoveRoutes.value = routes
    }
    // 清空动态路由
    function removeRoutes() {
      isGenerate.value = false
      routesRaw.value = []
      filesystemRoutesRaw.value = []
      currentRemoveRoutes.value.forEach((removeRoute) => {
        removeRoute()
      })
      currentRemoveRoutes.value = []
    }

    return {
      isGenerate,
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
