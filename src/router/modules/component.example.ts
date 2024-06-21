import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/component_example',
  component: Layout,
  redirect: '/component_example/basic',
  name: 'componentExample',
  meta: {
    title: 'route.component.root',
    icon: 'i-bx:bxs-component',
  },
  children: [{
    path: 'basic',
    name: 'componentExampleBasic',
    component: () => import('@/views/component_basic_example/index.vue'),
    meta: {
      title: 'route.component.basic',
      icon: 'i-ep:element-plus',
    },
  }, {
    path: 'builtIn',
    name: 'componentExampleBuiltIn',
    component: () => import('@/views/component_built_in_example/index.vue'),
    meta: {
      title: 'route.component.builtIn',
    },
  }, {
    path: 'extend',
    redirect: 'pageheader',
    name: 'componentExampleExtend',
    meta: {
      title: 'route.component.extend.root',
      badge: true,
    },
    children: [{
      path: 'pageheader',
      name: 'componentExampleExtendPageheader',
      component: () => import('@/views/component_extend_example/pageheader.demo.vue'),
      meta: {
        title: 'route.component.extend.pageheader',
      },
    }, {
      path: 'pagemain',
      name: 'componentExampleExtendPagemain',
      component: () => import('@/views/component_extend_example/pagemain.demo.vue'),
      meta: {
        title: 'route.component.extend.pagemain',
      },
    }, {
      path: 'actionbar',
      name: 'componentExampleExtendActionbar',
      component: () => import('@/views/component_extend_example/actionbar.demo.vue'),
      meta: {
        title: 'route.component.extend.actionbar',
        copyright: false,
        paddingBottom: '80px',
      },
    }, {
      path: 'searchbar',
      name: 'componentExampleExtendSearchbar',
      component: () => import('@/views/component_extend_example/searchbar.demo.vue'),
      meta: {
        title: 'route.component.extend.searchbar',
      },
    }, {
      path: 'upload',
      name: 'componentExampleExtendUpload',
      component: () => import('@/views/component_extend_example/upload.demo.vue'),
      meta: {
        title: 'route.component.extend.upload',
      },
    }, {
      path: 'imagepreview',
      name: 'componentExampleExtendImagePreview',
      component: () => import('@/views/component_extend_example/image.preview.demo.vue'),
      meta: {
        title: 'route.component.extend.imagepreview',
      },
    }, {
      path: 'trend',
      name: 'componentExampleExtendTrend',
      component: () => import('@/views/component_extend_example/trend.demo.vue'),
      meta: {
        title: 'route.component.extend.trend',
      },
    }, {
      path: 'pcas',
      name: 'componentExampleExtendPcas',
      component: () => import('@/views/component_extend_example/pcas.demo.vue'),
      meta: {
        title: 'route.component.extend.pcas',
      },
    }, {
      path: 'colorfulcard',
      name: 'componentExampleExtendColorfulCard',
      component: () => import('@/views/component_extend_example/colorful.card.demo.vue'),
      meta: {
        title: 'route.component.extend.colorfulcard',
        badge: 'PRO',
      },
    }, {
      path: 'chip',
      name: 'componentExampleExtendChip',
      component: () => import('@/views/component_extend_example/chip.demo.vue'),
      meta: {
        title: 'route.component.extend.chip',
        badge: 'PRO',
      },
    }, {
      path: 'iconpicker',
      name: 'componentExampleExtendIconPicker',
      component: () => import('@/views/component_extend_example/iconpicker.demo.vue'),
      meta: {
        title: 'route.component.extend.iconpicker',
        badge: 'PRO',
      },
    }, {
      path: 'loading',
      name: 'componentExampleExtendLoading',
      component: () => import('@/views/component_extend_example/loading.demo.vue'),
      meta: {
        title: 'route.component.extend.loading',
        badge: 'PRO',
      },
    }, {
      path: 'sparkline',
      name: 'componentExampleExtendSpartline',
      component: () => import('@/views/component_extend_example/sparkline.demo.vue'),
      meta: {
        title: 'route.component.extend.sparkline',
        badge: 'PRO',
      },
    }, {
      path: 'storagebox',
      name: 'componentExampleExtendStoragebox',
      component: () => import('@/views/component_extend_example/storagebox.vue'),
      meta: {
        title: 'route.component.extend.storagebox',
        badge: 'PRO',
      },
    }],
  }],
}
export default routes
