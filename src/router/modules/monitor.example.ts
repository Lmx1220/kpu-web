// import type { RouteRecordRaw } from 'vue-router'
//
// const routes: RouteRecordRaw = {
//   path: '/monitor',
//   name: 'monitor',
//   component: () => import('@/layouts/index.vue'),
//   redirect: '/monitor/online',
//   meta: {
//     title: '系统监控',
//     icon: 'monitor',
//     roles: ['admin'],
//   },
//   children: [
//     {
//       path: 'online',
//       name: 'monitorOnline',
//       component: () => import('@/views/monitor/online/index.vue'),
//       meta: {
//         title: '在线用户',
//         icon: 'online',
//         roles: ['admin'],
//       },
//     },
//     {
//       path: 'login',
//       name: 'monitorLogin',
//       component: () => import('@/views/monitor/login/index.vue'),
//       meta: {
//         title: '登录日志',
//         icon: 'login',
//         roles: ['admin'],
//       },
//     },
//     {
//       path: 'oper',
//       name: 'monitorOper',
//       component: () => import('@/views/monitor/oper/index.vue'),
//       meta: {
//         title: '操作日志',
//         icon: 'oper',
//         roles: ['admin'],
//       },
//     },
//     {
//       path: 'error',
//       name: 'monitorError',
//       component: () => import('@/views/monitor/error/index.vue'),
//       meta: {
//         title: '错误日志',
//         icon: 'error',
//         roles: ['admin'],
//       },
//     },
//     {
//       path: 'druid',
//       name: 'monitorDruid',
//       component: () => import('@/views/monitor/druid/index.vue'),
//       meta: {
//         title: '数据源监控',
//         icon: 'druid',
//         roles: ['admin'],
//       },
//     },
//   ],
// }
// export default routes
