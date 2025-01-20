import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/menu_icon_example',
  redirect: '/menu_icon_example/child',
  component: Layout,
  name: 'menuIconExample',
  meta: {
    title: 'route.menuIcon.root',
    icon: 'i-ri:check-fill',
    badge: 'PRO',
  },
  children: [
    {
      path: 'child',
      name: 'menuIconExampleChild',
      component: () => import('@/views/menu_icon_example/child.vue'),
      meta: {
        title: 'route.menuIcon.child',
        icon: 'i-twemoji:face-without-mouth',
        activeIcon: 'i-twemoji:grinning-face-with-big-eyes',
      },
    },
    {
      path: 'parent',
      name: 'menuIconExampleParent',
      meta: {
        title: 'route.menuIcon.parent.root',
        icon: 'i-twemoji:face-without-mouth',
        activeIcon: 'i-twemoji:grinning-face-with-big-eyes',
      },
      children: [
        {
          path: 'index',
          name: 'menuIconExampleParentIndex',
          component: () => import('@/views/menu_icon_example/parent.vue'),
          meta: {
            title: 'route.menuIcon.parent.index',
          },
        },
      ],
    },
  ],
}
export default routes
