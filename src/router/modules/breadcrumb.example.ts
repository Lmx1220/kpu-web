import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/breadcrumb_example',
  component: Layout,
  redirect: '/breadcrumb_example/list1',
  name: 'breadcrumbExample',
  meta: {
    title: 'route.breadcrumb.root',
    icon: 'i-ic:twotone-double-arrow',
  },
  children: [
    {
      path: 'list1',
      name: 'breadcrumbExampleList1',
      component: () => import('@/views/breadcrumb_example/list1.vue'),
      meta: {
        title: 'route.breadcrumb.list1',
      },
    },
    {
      path: 'detail1',
      name: 'breadcrumbExampleDetail1',
      component: () => import('@/views/breadcrumb_example/detail1.vue'),
      meta: {
        title: 'route.breadcrumb.detail1',
        menu: false,
        activeMenu: '/breadcrumb_example/list1',
      },
    },
    {
      path: 'list2',
      name: 'breadcrumbExampleList2',
      redirect: '/breadcrumb_example/list2',
      meta: {
        title: 'route.breadcrumb.list2',
      },
      children: [
        {
          path: '',
          component: () => import('@/views/breadcrumb_example/list2.vue'),
          meta: {
            title: 'route.breadcrumb.list2',
            menu: false,
            breadcrumb: false,
          },
        },
        {
          path: 'detail2',
          name: 'breadcrumbExampleDetail2',
          component: () => import('@/views/breadcrumb_example/detail2.vue'),
          meta: {
            title: 'route.breadcrumb.detail2',
            menu: false,
            activeMenu: '/breadcrumb_example/list2',
          },
        },
      ],
    },
  ],
}

export default routes
