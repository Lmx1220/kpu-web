import type { Route } from '@/types/global'
import type { RouteRecordRaw } from 'vue-router'
import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings.ts'
import AlwaysOpenedExample from './modules/always.opened.example.ts'
import BreadcrumbExample from './modules/breadcrumb.example.ts'
import ComponentExample from './modules/component.example.ts'

import ExternalLinkExample from './modules/external.link.example.ts'
import FeatureExample from './modules/feature.example.ts'
import IconExample from './modules/icon.example.ts'
import JsxExample from './modules/jsx.example.ts'
import KeepAliveExample from './modules/keep.alive.example'
import LayoutContainerExample from './modules/layout.container.example.ts'

import MenuBadgeExample from './modules/menu.badge.example.ts'
import MenuIconExample from './modules/menu.icon.example.ts'
import MenuQueryExample from './modules/menu.query.example.ts'
import MockExample from './modules/mock.example.ts'
// import LinkExample from './modules/link.example'
// import SystemExample from './modules/system.example'
import MultilevelMenuExample from './modules/multilevel.menu.example.ts'
import PermissionExample from './modules/permission.example.ts'
import PluginExample from './modules/plugin.example.ts'
import StandardModuleExample from './modules/standard.module.example.ts'
import TabExample from './modules/tab.example.ts'
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
      MultilevelMenuExample,
      BreadcrumbExample,
      KeepAliveExample,
      AlwaysOpenedExample,
      MenuIconExample,
      MenuQueryExample,
      MenuBadgeExample,
      TabExample,
      ComponentExample,
      IconExample,
      FeatureExample,
      LayoutContainerExample,
      PluginExample,
      PermissionExample,
      MockExample,
      JsxExample,
      ExternalLinkExample,
      StandardModuleExample,
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
