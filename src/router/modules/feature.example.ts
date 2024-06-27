import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/feature_example',
  component: Layout,
  redirect: '/feature_example/i18n',
  name: 'featureExample',
  meta: {
    title: 'route.feature.root',
    icon: 'i-ic:twotone-auto-awesome',
  },
  children: [{
    path: 'i18n',
    name: 'featureExampleI18n',
    component: () => import('@/views/feature_example/i18n.vue'),
    meta: {
      title: 'route.feature.i18n',
      icon: 'i-ri:earth-line',
      badge: 'PRO',
    },
  }, {
    path: 'font',
    name: 'featureExampleFont',
    component: () => import('@/views/feature_example/font.vue'),
    meta: {
      title: 'route.feature.font',
      icon: 'i-ri:font-size',
      badge: 'PRO',
    },
  }, {
    path: 'waves',
    name: 'featureExampleWaves',
    component: () => import('@/views/feature_example/waves.vue'),
    meta: {
      title: 'route.feature.waves',
      icon: 'i-ph:waves-bold',
      badge: 'PRO',
    },
  }, {
    path: 'zoomable',
    name: 'featureExampleZoomable',
    component: () => import('@/views/feature_example/zoomable.vue'),
    meta: {
      title: 'route.feature.zoomable',
      icon: 'i-mingcute:zoom-in-line',
      badge: 'PRO',
    },
  }, {
    path: 'timeago',
    name: 'featureExampleTimeago',
    component: () => import('@/views/feature_example/timeago.vue'),
    meta: {
      title: 'route.feature.timeago',
      icon: 'i-ic:outline-access-time',
      badge: 'PRO',
    },
  }, {
    path: 'watermark',
    name: 'featureExampleWatermark',
    component: () => import('@/views/feature_example/watermark.vue'),
    meta: {
      title: 'route.feature.watermark',
      icon: 'i-icon-park-outline:mosaic',
      badge: 'PRO',
    },
  }, {
    path: 'bug',
    name: 'featureExampleBug',
    component: () => import('@/views/feature_example/bug.vue'),
    meta: {
      title: 'route.feature.bug',
      icon: 'i-ri:bug-line',
      badge: 'PRO',
    },
  }, {
    path: 'title',
    name: 'featureExampleTitle',
    component: () => import('@/views/feature_example/title.vue'),
    meta: {
      title: 'route.feature.title',
      icon: 'i-mdi:format-title',
      badge: 'PRO',
    },
  }, {
    path: 'maximize',
    name: 'featureExampleMaximize',
    component: () => import('@/views/feature_example/maximize.vue'),
    meta: {
      title: 'route.feature.maximize',
      icon: 'i-ri:picture-in-picture-exit-line',
      badge: 'PRO',
    },
  }, {
    path: 'newWindow',
    name: 'featureExampleNewWindow',
    component: () => import('@/views/feature_example/newWindow.vue'),
    meta: {
      title: 'route.feature.newwindow',
      icon: 'i-ooui:new-window-ltr',
      badge: 'PRO',
      newWindow: true,
    },
  }, {
    path: 'vueuse',
    name: 'featureExampleVueuse',
    component: () => import('@/views/feature_example/vueuse.vue'),
    meta: {
      title: 'VueUse',
      icon: 'i-logos:vueuse',
    },
  }, {
    path: 'rules',
    name: 'featureExampleRules',
    component: () => import('@/views/feature_example/rules.vue'),
    meta: {
      title: 'route.feature.rules',
      icon: 'i-mdi:regex',
    },
  }, {
    path: 'tableautoheight',
    name: 'featureExampleTableautoheight',
    component: () => import('@/views/feature_example/table.autoheight.vue'),
    meta: {
      title: 'route.feature.tableautoheight',
      icon: 'i-tabler:arrow-autofit-height',
    },
  }, {
    path: 'reload',
    name: 'featureExampleReload',
    component: () => import('@/views/feature_example/reload.vue'),
    meta: {
      title: 'route.feature.reload',
      icon: 'i-iconoir:refresh-double',
      cache: true,
    },
  }, {
    path: 'menuswitch',
    name: 'featureExampleMenuswitch',
    component: () => import('@/views/feature_example/menuswitch.vue'),
    meta: {
      title: 'route.feature.menuswitch',
      icon: 'i-charm:menu-hamburger',
    },
  }, {
    path: 'leavetips',
    name: 'featureExampleLeavetips',
    component: () => import('@/views/feature_example/leavetips.vue'),
    meta: {
      title: 'route.feature.leavetips',
      icon: 'i-pepicons:leave',
    },
  }, {
    path: 'scroll',
    name: 'featureExampleScroll',
    component: () => import('@/views/feature_example/scroll.vue'),
    meta: {
      title: 'route.feature.scroll',
      icon: 'i-carbon:auto-scroll',
      cache: true,
    },
  }],
}

export default routes
