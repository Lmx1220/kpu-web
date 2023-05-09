import type { RouteRecordRaw } from 'vue-router'
import KeepAliveExample from './modules/keep.alive.example'
import SystemExample from './modules/system.example'
import LinkExample from './modules/link.example'
import Monitorxample from './modules/monitor.example'
import type { Route } from '@/types/global'

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
// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'sidebar-default',
    },
    children: [
      KeepAliveExample,
      LinkExample,
      SystemExample,
      Monitorxample,
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
export {
  constantRoutes,
  // systemRoutes,
  asyncRoutes,
}
