import type { RouteRecordRaw } from 'vue-router'
import Laout from '@/layout/index.vue'
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
// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => Laout,
    redirect: '/',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
          i18n: 'route.home',
          breadcrumb: false,
        },
      },

    ],
  },
]
// 系统路由
const systemExample: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'system',
    component: () => Laout,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'system',
      roles: ['admin'],
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'system',
          badge: 10,
          roles: ['admin'],
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'role',
          badge: '热门',
          roles: ['admin'],
        },
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menu',
          badge: 'PRO',
          roles: ['admin'],
        },
      },
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/views/system/dept/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'dept',
          badge: false,
          roles: ['admin'],
        },
      },
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/system/dict/index.vue'),
        meta: {
          title: '字典管理',
          icon: 'dict',
          badge: () => true,
          roles: ['admin'],
        },
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/system/config/index.vue'),
        meta: {
          title: '配置管理',
          icon: 'config',
          roles: ['admin'],
        },
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system/log/index.vue'),
        meta: {
          title: '日志管理',
          icon: 'log',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => Laout,
    redirect: '/monitor/online',
    meta: {
      title: '系统监控',
      icon: 'monitor',
      roles: ['admin'],
    },
    children: [
      {
        path: 'online',
        name: 'online',
        component: () => import('@/views/monitor/online/index.vue'),
        meta: {
          title: '在线用户',
          icon: 'online',
          roles: ['admin'],
        },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/monitor/login/index.vue'),
        meta: {
          title: '登录日志',
          icon: 'login',
          roles: ['admin'],
        },
      },
      {
        path: 'oper',
        name: 'oper',
        component: () => import('@/views/monitor/oper/index.vue'),
        meta: {
          title: '操作日志',
          icon: 'oper',
          roles: ['admin'],
        },
      },
      {
        path: 'error',
        name: 'error',
        component: () => import('@/views/monitor/error/index.vue'),
        meta: {
          title: '错误日志',
          icon: 'error',
          roles: ['admin'],
        },
      },
      {
        path: 'druid',
        name: 'druid',
        component: () => import('@/views/monitor/druid/index.vue'),
        meta: {
          title: '数据源监控',
          icon: 'druid',
          roles: ['admin'],
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
      ...systemExample,
    ],
  },
  {
    meta: {
      title: '页面',
      icon: 'sidebar-default',
    },
    children: [
      ...systemRoutes,
    ],
  },
]
export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
}
