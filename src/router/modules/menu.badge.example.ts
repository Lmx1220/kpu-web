import type { RouteRecordRaw } from 'vue-router'
import useMenuBadgeStore from '@/store/modules/menuBadge.ts'

function Layout() {
  return import('@/layouts/index.vue')
}

// const menuBadgeStore =
const routes: RouteRecordRaw = {
  path: '/menu_badge_example',
  component: Layout,
  redirect: '/menu_badge_example/dot',
  name: 'menuBadgeExample',
  meta: {
    title: 'route.menuBadge.root',
    icon: 'i-ri:notification-badge-line',
    badge: 'PRO',
  },
  children: [{
    path: 'dot',
    name: 'menuBadgeExampleDot',
    component: () => import('@/views/menu_badge_example/dot.vue'),
    meta: {
      title: 'route.menuBadge.dot',
      badge: () => useMenuBadgeStore().dot,
    },
  }, {
    path: 'number',
    name: 'menuBadgeExampleNumber',
    component: () => import('@/views/menu_badge_example/number.vue'),
    meta: {
      title: 'route.menuBadge.number',
      badge: () => useMenuBadgeStore().number,
    },
  }, {
    path: 'text',
    name: 'menuBadgeExampleText',
    component: () => import('@/views/menu_badge_example/text.vue'),
    meta: {
      title: 'route.menuBadge.text',
      badge: () => useMenuBadgeStore().text,
    },
  }],
}
export default routes
