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
    meta: {
      title: 'route.component.builtIn.root',
      badge: true,
    },
    children: [
      {
        path: 'avatar',
        name: 'componentExampleBuiltInAvatar',
        component: () => import('@/views/component_built_in_example/avatar.vue'),
        meta: {
          title: 'route.component.builtIn.avatar',
        },
      },
      {
        path: 'badge',
        name: 'componentExampleBuiltInBadge',
        component: () => import('@/views/component_built_in_example/badge.vue'),
        meta: {
          title: 'route.component.builtIn.badge',
          badge: 'PRO',
        },
      },
      {
        path: 'button',
        name: 'componentExampleBuiltInButton',
        component: () => import('@/views/component_built_in_example/button.vue'),
        meta: {
          title: 'route.component.builtIn.button',
        },
      },
      {
        path: 'card',
        name: 'componentExampleBuiltInCard',
        component: () => import('@/views/component_built_in_example/card.vue'),
        meta: {
          title: 'route.component.builtIn.card',
        },
      },
      {
        path: 'checkbox',
        name: 'componentExampleBuiltInCheckbox',
        component: () => import('@/views/component_built_in_example/checkbox.vue'),
        meta: {
          title: 'route.component.builtIn.checkbox',
        },
      },
      {
        path: 'chip',
        name: 'componentExampleBuiltInChip',
        component: () => import('@/views/component_built_in_example/chip.vue'),
        meta: {
          title: 'route.component.builtIn.chip',
          badge: 'PRO',
        },
      },
      {
        path: 'contextmenu',
        name: 'componentExampleBuiltInContextMenu',
        component: () => import('@/views/component_built_in_example/contextmenu.vue'),
        meta: {
          title: 'route.component.builtIn.contextmenu',
        },
      },
      {
        path: 'countto',
        name: 'componentExampleBuiltInCountTo',
        component: () => import('@/views/component_built_in_example/countto.vue'),
        meta: {
          title: 'route.component.builtIn.countto',
          badge: 'PRO',
        },
      },
      {
        path: 'digitalcard',
        name: 'componentExampleBuiltInDigitalCard',
        component: () => import('@/views/component_built_in_example/avatar.vue'),
        meta: {
          title: 'route.component.builtIn.digitalcard',
          badge: 'PRO',
        },
      },
      {
        path: 'divider',
        name: 'componentExampleBuiltInDivider',
        component: () => import('@/views/component_built_in_example/divider.vue'),
        meta: {
          title: 'route.component.builtIn.divider',
        },
      },
      {
        path: 'drawer',
        name: 'componentExampleBuiltInDrawer',
        component: () => import('@/views/component_built_in_example/drawer.vue'),
        meta: {
          title: 'route.component.builtIn.drawer',
        },
      },
      {
        path: 'dropdown',
        name: 'componentExampleBuiltInDropdown',
        component: () => import('@/views/component_built_in_example/dropdown.vue'),
        meta: {
          title: 'route.component.builtIn.dropdown',
        },
      },
      {
        path: 'fixedactionbar',
        name: 'componentExampleBuiltInFixedactionbar',
        component: () => import('@/views/component_built_in_example/fixedactionbar.vue'),
        meta: {
          title: 'route.component.builtIn.fixedactionbar',
          copyright: !1,
        },
      },
      {
        path: 'iconpicker',
        name: 'componentExampleBuiltInIconPicker',
        component: () => import('@/views/component_built_in_example/iconpicker.vue'),
        meta: {
          title: 'route.component.builtIn.iconpicker',
          badge: 'PRO',
        },
      },
      {
        path: 'input',
        name: 'componentExampleBuiltInInput',
        component: () => import('@/views/component_built_in_example/input.vue'),
        meta: {
          title: 'route.component.builtIn.input',
        },
      },
      {
        path: 'kbd',
        name: 'componentExampleBuiltInKbd',
        component: () => import('@/views/component_built_in_example/kbd.vue'),
        meta: {
          title: 'route.component.builtIn.kbd',
        },
      },
      {
        path: 'loading',
        name: 'componentExampleBuiltInLoading',
        component: () => import('@/views/component_built_in_example/loading.vue'),
        meta: {
          title: 'route.component.builtIn.loading',
          badge: 'PRO',
        },
      },
      {
        path: 'modal',
        name: 'componentExampleBuiltInModal',
        component: () => import('@/views/component_built_in_example/modal.vue'),
        meta: {
          title: 'route.component.builtIn.modal',
        },
      },
      {
        path: 'notification',
        name: 'componentExampleBuiltInNotification',
        component: () => import('@/views/component_built_in_example/notification.vue'),
        meta: {
          title: 'route.component.builtIn.notification',
        },
      },
      {
        path: 'pageheader',
        name: 'componentExampleBuiltInPageheader',
        component: () => import('@/views/component_built_in_example/pageheader.vue'),
        meta: {
          title: 'route.component.builtIn.pageheader',
        },
      },
      {
        path: 'pagemain',
        name: 'componentExampleBuiltInPagemain',
        component: () => import('@/views/component_built_in_example/pagemain.vue'),
        meta: {
          title: 'route.component.builtIn.pagemain',
        },
      },
      {
        path: 'pagination',
        name: 'componentExampleBuiltInPagination',
        component: () => import('@/views/component_built_in_example/pagination.vue'),
        meta: {
          title: 'route.component.builtIn.pagination',
          badge: 'PRO',
        },
      },
      {
        path: 'passwordstrength',
        name: 'componentExampleBuiltInPasswordStrength',
        component: () => import('@/views/component_built_in_example/passwordstrength.vue'),
        meta: {
          title: 'route.component.builtIn.passwordstrength',
        },
      },
      {
        path: 'pininput',
        name: 'componentExampleBuiltInPinInput',
        component: () => import('@/views/component_built_in_example/pininput.vue'),
        meta: {
          title: 'route.component.builtIn.pininput',
        },
      },
      {
        path: 'popover',
        name: 'componentExampleBuiltInPopover',
        component: () => import('@/views/component_built_in_example/popover.vue'),
        meta: {
          title: 'route.component.builtIn.popover',
        },
      },
      {
        path: 'scrollarea',
        name: 'componentExampleBuiltInScrollArea',
        component: () => import('@/views/component_built_in_example/scrollarea.vue'),
        meta: {
          title: 'route.component.builtIn.scrollarea',
        },
      },
      {
        path: 'searchbar',
        name: 'componentExampleBuiltInSearchbar',
        component: () => import('@/views/component_built_in_example/searchbar.vue'),
        meta: {
          title: 'route.component.builtIn.searchbar',
        },
      },
      {
        path: 'select',
        name: 'componentExampleBuiltInSelect',
        component: () => import('@/views/component_built_in_example/select.vue'),
        meta: {
          title: 'route.component.builtIn.select',
        },
      },
      {
        path: 'sparkline',
        name: 'componentExampleBuiltInSparkline',
        component: () => import('@/views/component_built_in_example/sparkline.vue'),
        meta: {
          title: 'route.component.builtIn.sparkline',
          badge: 'PRO',
        },
      },
      {
        path: 'storagebox',
        name: 'componentExampleBuiltInStoragebox',
        component: () => import('@/views/component_built_in_example/storagebox.vue'),
        meta: {
          title: 'route.component.builtIn.storagebox',
          badge: 'PRO',
        },
      },
      {
        path: 'switch',
        name: 'componentExampleBuiltInSwitch',
        component: () => import('@/views/component_built_in_example/switch.vue'),
        meta: {
          title: 'route.component.builtIn.switch',
        },
      },
      {
        path: 'tabs',
        name: 'componentExampleBuiltInTabs',
        component: () => import('@/views/component_built_in_example/tabs.vue'),
        meta: {
          title: 'route.component.builtIn.tabs',
        },
      },
      {
        path: 'timeago',
        name: 'componentExampleBuiltInTimeAgo',
        component: () => import('@/views/component_built_in_example/timeago.vue'),
        meta: {
          title: 'route.component.builtIn.timeago',
          badge: 'PRO',
        },
      },
      {
        path: 'toast',
        name: 'componentExampleBuiltInToast',
        component: () => import('@/views/component_built_in_example/toast.vue'),
        meta: {
          title: 'route.component.builtIn.toast',
        },
      },
      {
        path: 'tooltip',
        name: 'componentExampleBuiltInTooltip',
        component: () => import('@/views/component_built_in_example/tooltip.vue'),
        meta: {
          title: 'route.component.builtIn.tooltip',
        },
      },
      {
        path: 'trend',
        name: 'componentExampleBuiltInTrend',
        component: () => import('@/views/component_built_in_example/trend.vue'),
        meta: {
          title: 'route.component.builtIn.trend',
        },
      },
    ],
  }, {
    path: 'extend',
    redirect: 'pageheader',
    name: 'componentExampleExtend',
    meta: {
      title: 'route.component.extend.root',
      badge: true,
    },
    children: [
      {
        path: 'upload',
        name: 'componentExampleExtendUpload',
        component: () => import('@/views/component_extend_example/upload.demo.vue'),
        meta: {
          title: 'route.component.extend.upload',
        },
      },
      {
        path: 'imagepreview',
        name: 'componentExampleExtendImagePreview',
        component: () => import('@/views/component_extend_example/image.preview.demo.vue'),
        meta: {
          title: 'route.component.extend.imagepreview',
        },
      },
      {
        path: 'pcas',
        name: 'componentExampleExtendPcas',
        component: () => import('@/views/component_extend_example/pcas.demo.vue'),
        meta: {
          title: 'route.component.extend.pcas',
        },
      },
    ],
  }],
}
export default routes
