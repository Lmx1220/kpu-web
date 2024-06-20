import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/always_opened_example',
  component: Layout,
  redirect: '/always_opened_example/page',
  name: 'alwaysOpenedExample',
  meta: {
    title: 'route.alwaysOpened.root',
    icon: 'i-fluent:text-bullet-list-tree-16-filled',
    badge: 'PRO',
  },
  children: [
    {
      path: 'page',
      name: 'alwaysOpenedExample1',
      component: () => import('@/views/always_opened_example/page.vue'),
      meta: {
        title: 'route.alwaysOpened.page',
      },
    },
    {
      path: 'level2',
      name: 'alwaysOpenedExample2',
      redirect: '/always_opened_example/level2/page',
      meta: {
        title: 'route.alwaysOpened.level2.root',
        alwaysOpened: true,
      },
      children: [
        {
          path: 'page',
          name: 'alwaysOpenedExample2-1',
          component: () => import('@/views/always_opened_example/level2/page.vue'),
          meta: {
            title: 'route.alwaysOpened.level2.page',
          },
        },
        {
          path: 'level3',
          name: 'alwaysOpenedExample2-2',
          redirect: '/always_opened_example/level2/level3/page1',
          meta: {
            title: 'route.alwaysOpened.level2.level3.root',
            alwaysOpened: true,
          },
          children: [
            {
              path: 'page1',
              name: 'alwaysOpenedExample2-2-1',
              component: () => import('@/views/always_opened_example/level2/level3/page1.vue'),
              meta: {
                title: 'route.alwaysOpened.level2.level3.page1',
              },
            },
            {
              path: 'page2',
              name: 'alwaysOpenedExample2-2-2',
              component: () => import('@/views/always_opened_example/level2/level3/page2.vue'),
              meta: {
                title: 'route.alwaysOpened.level2.level3.page2',
              },
            },
          ],
        },
      ],
    },
  ],
}
export default routes
