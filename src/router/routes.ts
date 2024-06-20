import type { RouteRecordRaw } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:meta-layouts'
import KeepAliveExample from './modules/keep.alive.example'
// import LinkExample from './modules/link.example'
// import SystemExample from './modules/system.example'
import MultilevelMenuExample from './modules/multilevel.menu.example.ts'
import BreadcrumbExample from './modules/breadcrumb.example.ts'
import AlwaysOpenedExample from './modules/always.opened.example.ts'
import type { Route } from '@/types/global'
import useSettingsStore from '@/store/modules/settings.ts'
import MenuIconExample from '@/router/modules/menu.icon.example.ts'
// 固定路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/login2',
    name: 'login2',
    component: () => import('@/views/login2.vue'),
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
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
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
      {
        path: 'personal/setting',
        name: 'personalSetting',
        component: () => import('@/views/personal/setting.vue'),
        meta: {
          title: '个人设置',
          cache: 'personalEditPassword',
        },
      },
      {
        path: 'personal/edit/password',
        name: 'personalEditPassword',
        component: () => import('@/views/personal/edit.password.vue'),
        meta: {
          title: '修改密码',
        },
      },
    ],
  },
]
// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'sidebar-default',
    },
    children: [
      MultilevelMenuExample,
      BreadcrumbExample,
      KeepAliveExample,
      AlwaysOpenedExample,
      MenuIconExample,
      // LinkExample,
      // SystemExample,
      // Monitorxample,
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

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
}))
export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
  // constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
}
