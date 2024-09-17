import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/tab_example',
  component: Layout,
  redirect: '/tab_example/index',
  name: 'tabExample',
  meta: {
    title: 'route.tabbar',
    icon: 'i-ic:round-tab',
  },
  children: [
    {
      path: 'index',
      name: 'tabExampleIndex',
      component: () => import('@/views/tab_example/index.vue'),
      meta: {
        title: 'route.tabbar',
        menu: false,
        breadcrumb: false,
        activeMenu: '/tab_example',
      },
    },
  ],
}

export default routes