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
      redirect: '/system/menu',
      meta: {
        title: '菜单管理',
        i18n: 'route.general.menu.root',
        badge: '风格1',
      },
      children:
        [
          {
            path: '',
            name: 'menuList',
            component: () => import('@/views/system/menu/index.vue'),
            meta: {
              title: '菜单列表',
              badge: 'PRO',
              roles: ['admin'],
              sidebar: false,
              cache: ['menuCreate', 'menuEdit'],
            },
          },
          {
            path: 'detail',
            name: 'menuCreate',
            component: () => import('@/views/system/menu/detail.vue'),
            meta: {
              title: '新增导航',
              i18n: 'route.general.menu.create',
              sidebar: false,
              activeMenu: '/system/menu',
              cache: true,
              noCache: 'menuList',
              copyright: false,
              paddingBottom: '80px',
            },
          },
          {
            path: 'detail/:id',
            name: 'menuEdit',
            component: () => import('@/views/system/menu/detail.vue'),
            meta: {
              title: '编辑导航',
              i18n: 'route.general.menu.edit',
              sidebar: false,
              activeMenu: '/system/menu',
              cache: true,
              noCache: 'menuList',
              copyright: false,
              paddingBottom: '80px',
            },
          },
        ],
    },
    // {
    //   path: 'dept',
    //   name: 'dept',
    //   // component: () => import('@/views/system/dept/index.vue'),
    //   meta: {
    //     title: '部门管理',
    //     badge: false,
    //     roles: ['admin'],
    //   },
    // },
    // {
    //   path: 'dict',
    //   name: 'dict',
    //   component: () => import('@/views/system/dict/index.vue'),
    //   meta: {
    //     title: '字典管理',
    //     badge: () => true,
    //     roles: ['admin'],
    //   },
    // },
    // {
    //   path: 'config',
    //   name: 'config',
    //   component: () => import('@/views/system/config/index.vue'),
    //   meta: {
    //     title: '配置管理',
    //     roles: ['admin'],
    //   },
    // },
    // {
    //   path: 'log',
    //   name: 'log',
    //   component: () => import('@/views/system/log/index.vue'),
    //   meta: {
    //     title: '日志管理',
    //     roles: ['admin'],
    //   },
    // },
  ],
}
export default routes
