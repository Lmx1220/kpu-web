import type { Route } from '@/types/global'
import type { RouteRecordRaw } from 'vue-router'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings.ts'
// import generatedRoutes from 'virtual:generated-pages'
// import { setupLayouts } from 'virtual:meta-layouts'
// 固定路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]
// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: useSettingsStore(pinia).settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: useSettingsStore(pinia).settings.home.title,
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]
// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: 'route.demo',
      icon: 'sidebar-default',
    },
    children: [
    ],
  },
  {
    meta: {
      title: '页面',
      icon: 'sidebar-default',
    },
    children: [
      // ...systemRoutes,
    ],
  },
]

// const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
//   return item.meta?.enabled !== false && item.meta?.constant === true
// })
const constantRoutesByFilesystem: RouteRecordRaw[] = []
// const asyncRoutesByFilesystem: RouteRecordRaw[] = setupLayouts(generatedRoutes.filter((item) => {
//   return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
// }))
const asyncRoutesByFilesystem: RouteRecordRaw[] = []
export {
  asyncRoutes,
  asyncRoutesByFilesystem,
  constantRoutes,
  constantRoutesByFilesystem,
  systemRoutes,
}
