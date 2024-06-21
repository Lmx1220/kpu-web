import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}
const routes: RouteRecordRaw = {
  path: '/standard_module_example',
  component: Layout,
  name: 'standardModuleExample',
  meta: {
    title: 'route.standardModule.root',
    icon: 'i-ic:round-view-module',
    badge: 'PRO',
  },
  children: [{
    path: '',
    name: 'standardModuleExampleList',
    //
    component: () => import('@/views/pages_example/menu/list.vue'),
    meta: {
      title: 'route.standardModule.list',
      menu: false,
      breadcrumb: false,
      cache: ['standardModuleExampleCreate', 'standardModuleExampleEdit'],
    },
  }, {
    path: 'detail',
    name: 'standardModuleExampleCreate',
    component: () => import('@/views/pages_example/menu/detail.vue'),
    meta: {
      title: 'route.standardModule.create',
      menu: false,
      activeMenu: '/standard_module_example',
      cache: true,
      noCache: 'standardModuleExampleList',
    },
  }, {
    path: 'detail/:id/:type',
    name: 'standardModuleExampleEdit',
    component: () => import('@/views/pages_example/menu/detail.vue'),
    meta: {
      title: 'route.standardModule.edit',
      menu: false,
      activeMenu: '/standard_module_example',
      cache: true,
      noCache: 'standardModuleExampleList',
    },
  }],
}
export default routes
