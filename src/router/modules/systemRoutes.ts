import type { RouteRecordRaw } from 'vue-router'
import Laout from '@/layouts/index.vue'
import useSettingsStore from '@/store/modules/settings'

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => Laout,
    redirect: '/',
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().settings.home.title,
          i18n: 'route.home',
          icon: 'ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]
export default systemRoutes
