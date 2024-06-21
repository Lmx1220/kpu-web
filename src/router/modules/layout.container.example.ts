import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/layout_container',
  component: () => import('@/views/layout_container_example/index.vue'),
  name: 'layoutContainerExample',
  meta: {
    title: 'route.layout.container',
    icon: 'i-bi:layout-three-columns',
    singleMenu: true,
    badge: 'PRO',
    copyright: false,
  },
}
export default routes
