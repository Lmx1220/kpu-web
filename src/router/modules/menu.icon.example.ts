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
    title: '导航图标激活',
    icon: 'i-ri:check-fill',
    badge: 'PRO',
  },
  children: [
    {
      path: 'child',
      name: 'menuIconExampleChild',
      component: () => import('@/views/menu_icon_example/child.vue'),
      meta: {
        title: '子级图标激活',
        icon: 'i-twemoji:face-without-mouth',
        activeIcon: 'i-twemoji:grinning-face-with-big-eyes',
      },
    },
    {
      path: 'parent',
      name: 'menuIconExampleParent',
      meta: {
        title: '父级图标激活',
        icon: 'i-twemoji:face-without-mouth',
        activeIcon: 'i-twemoji:grinning-face-with-big-eyes',
      },
      children: [
        {
          path: 'index',
          name: 'menuIconExampleParentIndex',
          component: () => import('@/views/menu_icon_example/parent.vue'),
          meta: {
            title: '测试页面',
          },
        },
      ],
    },
  ],
}
export default routes
