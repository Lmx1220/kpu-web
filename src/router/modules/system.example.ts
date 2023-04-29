import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}
const routes: RouteRecordRaw = {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'ri:function-line',
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
        roles: ['admin'],
      },
    },
    {
      path: 'log',
      name: 'log',
      component: () => import('@/views/system/log/index.vue'),
      meta: {
        title: '日志管理',
        roles: ['admin'],
      },
    },
  ],
}
export default routes
