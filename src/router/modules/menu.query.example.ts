import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/menu_query_example',
  component: () => import('@/views/menu_query_example/index.vue'),
  name: 'menuQueryExample',
  meta: {
    title: 'route.menuQuery',
    icon: 'i-si:json-fill',
    badge: 'PRO',
    query: {
      id: 95,
      account: 'hooray',
    },
    singleMenu: true,
  },
}
export default routes
