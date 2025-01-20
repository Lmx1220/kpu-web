import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/keep_alive_example',
  component: Layout,
  redirect: '/keep_alive_example/page',
  name: 'keepAliveExample',
  meta: {
    title: 'route.keepAlive.root',
    icon: 'i-cil:window-restore',
  },
  children: [
    {
      path: 'page',
      name: 'keepAliveExamplePage',
      component: () => import('@/views/keep_alive_example/page.vue'),
      meta: {
        title: 'route.keepAlive.page',
        breadcrumb: false,
      },
    },
    {
      path: 'detail',
      name: 'keepAliveExampleDetail',
      component: () => import('@/views/keep_alive_example/detail.vue'),
      meta: {
        title: 'route.keepAlive.detail',
        menu: false,
        activeMenu: '/keep_alive_example/page',
      },
    },
    {
      path: 'nested',
      redirect: '/keep_alive_example/nested/detail',
      meta: {
        title: 'route.keepAlive.nested',
        menu: false,
      },
      children: [
        {
          path: 'detail',
          name: 'keepAliveExampleNestedDetail',
          component: () => import('@/views/keep_alive_example/detail.vue'),
          meta: {
            title: 'route.keepAlive.nested',
            activeMenu: '/keep_alive_example/page',
          },
        },
      ],
    },
    {
      path: 'nested1',
      name: 'keepAliveExampleNested1',
      component: () => import('@/views/keep_alive_example/nested/nested.vue'),
      meta: {
        title: 'route.keepAlive.nested1.root',
      },
      children: [
        {
          path: 'nested2',
          name: 'keepAliveExampleNested2',
          component: () => import('@/views/keep_alive_example/nested/nested/nested.vue'),
          meta: {
            title: 'route.keepAlive.nested1.nested2.root',
          },
          children: [
            {
              path: 'index',
              name: 'keepAliveExampleNestedIndex',
              component: () => import('@/views/keep_alive_example/nested/nested/nested/index.vue'),
              meta: {
                title: 'route.keepAlive.nested1.nested2.index',
                cache: true,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default routes
