import { createApp } from 'vue'
import ElemnetPlus from 'element-plus'
import ContextMenu from '@imengyu/vue3-context-menu'
import App from './App.vue'
// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'uno.css'
// 全局样式
import '@/assets/styles/globals.scss'
import pinia from '@/store'
import router from '@/router'

import './permission'
import { useI18n } from '@/locales/index'
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

app.use(ContextMenu)
app.use(ElemnetPlus)
app.mount('#app')
