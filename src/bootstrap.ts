import { initComponentAdapter } from '@/adapter/component'
// 自定义指令
import directive from '@/directive'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'
import { setupI18n } from '@/locales'

import errorLog from '@/utils/error.log'

import FloatingVue from 'floating-vue'
import VWave from 'v-wave'

import App from './App.vue'
import router from './router'

import pinia from './store'

import uiProvider from './ui/provider'
import '@/utils/baidu'

import '@/utils/system.copyright'

import 'floating-vue/dist/style.css'

import 'vxe-table/lib/style.css'
import 'vxe-pc-ui/lib/style.css'

// 加载svg图标
import './assets/svg'
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
// 全局样式
import '@/assets/styles/globals.css'

async function bootstrap() {
  // 初始化组件适配器
  await initComponentAdapter()
  const app = createApp(App)
  await setupI18n(app)

  app.use(VWave, {})

  app.use(pinia)

  app.use(uiProvider)

  app.use(directive)
  errorLog(app)

  app.use(FloatingVue, {
    distance: 12,
  })

  if (icons.isOfflineUse) {
    for (const info of icons.collections) {
      downloadAndInstall(info)
    }
  }
  app.use(router)
  app.mount('#app')
}

export { bootstrap }
