import './util/baidu'

import ElemnetPlus from 'element-plus'
import App from './App.vue'

// 加载 iconify 图标
import errorLog from './util/error.log'
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'uno.css'

// 全局样式
import '@/assets/styles/globals.scss'
import pinia from '@/store'
import router from '@/router'

import './permission'
import { useI18n } from '@/locales/index'

// 自定义指令
import directive from '@/util/directive'

// 加载svg图标
import 'virtual:svg-icons-register'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

const app = createApp(App)

if (icons.useType === 'offline') {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}

app.use(pinia)
app.use(router)
useI18n(app)
directive(app)
errorLog(app)

app.use(ElemnetPlus)
app.mount('#app')
