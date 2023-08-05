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
        path: '/reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
      {
        path: 'personal/setting',
        name: 'personalSetting',
        component: () => import('@/views/personal/setting.vue'),
        meta: {
          title: '个人设置',
          i18n: 'route.personal.setting',
          cache: 'personalEditPassword',
        },
      },
      {
        path: 'personal/edit/password',
        name: 'personalEditPassword',
        component: () => import('@/views/personal/edit.password.vue'),
        meta: {
          title: '修改密码',
          i18n: 'route.personal.editpassword',
        },
      }, {
        path: 'personal/notification',
        name: 'personalNotification',
        component: () => import('@/views/personal/notification.vue'),
        meta: {
          title: '通知中心',
          i18n: 'route.personal.notification',
        },
      },
    ],
  },
]
export default systemRoutes
