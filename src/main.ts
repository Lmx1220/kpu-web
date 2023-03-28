import { createApp } from 'vue'
import ElemnetPlus from 'element-plus'
import App from './App.vue'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'uno.css'
// 全局样式
import '@/assets/style/globals.scss'
import pinia from '@/store'

import { useI18n } from '@/locales/index'

if (icons.useType === 'offline') {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}
const app = createApp(App)
app.use(pinia)
useI18n(app)
app.use(ElemnetPlus)
app.mount('#app')
