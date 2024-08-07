import './util/baidu'
import './util/system.copyright'

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import VWave from 'v-wave'

import VxeTable from 'vxe-table'
import VxeUI from 'vxe-pc-ui'
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'

import 'vxe-table/lib/style.css'
import 'vxe-pc-ui/lib/style.css'
import '@vxe-ui/plugin-render-element/dist/style.css'
import 'overlayscrollbars/overlayscrollbars.css'

import App from './App.vue'

import errorLog from './util/error.log'
import ui from './ui-provider'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'uno.css'

import pinia from '@/store'
import router from '@/router'

import './permission'
import { i18n, useI18n } from '@/locales'

// 自定义指令
import directive from '@/directive'

// 加载svg图标
import 'virtual:svg-icons-register'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

// 全局样式
import '@/assets/styles/globals.scss'

VxeTable.setConfig({
  // 对组件内置的提示语进行国际化翻译
  size: 'medium',
  table: {
    keepSource: true,
    showOverflow: true,
    showHeaderOverflow: true,
    stripe: true,
    border: true,
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    columnConfig: {
      resizable: true,
      minWidth: 100,
    },
    checkboxConfig: {
      labelField: '序号',
      reserve: true,
      highlight: true,
      range: true,
      trigger: 'cell',
    },
    sortConfig: {
      remote: true,
      trigger: 'cell',
      showIcon: true,
      orders: ['asc', 'desc', null],
      chronological: false,
      defaultSort: {
        field: 'createdTime',
        order: 'desc',
      },
    },
    filterConfig: {
      remote: true,
    },
  },
  grid: {
    editConfig: {
      trigger: 'manual',
      mode: 'row',
      showStatus: true,
      autoClear: false,
    },
    toolbarConfig: {
      refresh: true,
      zoom: true,
      custom: true,
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      titleOverflow: 'tooltip',
    },
    pagerConfig: {
      pageSize: 10,
      pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1e3],
    },
    proxyConfig: {
      autoLoad: false,
      seq: true,
      sort: true,
      filter: true,
      form: true,
      message: false,
      props: {
        result: 'records',
        total: 'total',
        message: 'msg',
      },
    },
  },
  pager: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 500, 1e3, 5e3],
  },
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  translate: (key: any, ...args: any) => i18n.global.t(key, args),
})
async function bootstrap() {
  const app = createApp(App)
  VxeUI.use(VxeUIPluginRenderElement)
  app.use(VxeUI)
  app.use(VxeTable)
  app.use(VWave, {})

  app.use(pinia)
  app.use(router)
  await useI18n(app)
  app.use(directive)
  errorLog(app)

  app.use(FloatingVue, {
    distance: 12,
  })
  app.use(ui)

  if (icons.isOfflineUse) {
    for (const info of icons.collections) {
      downloadAndInstall(info)
    }
  }

  app.mount('#app')
}

bootstrap()
