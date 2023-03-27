import { createApp } from 'vue'
import ElemnetPlus from 'element-plus'
import App from './App.vue'

// 全局样式
import '@/assets/style/globals.scss'
import pinia from './store'
import { useI18n } from './locales/index'
const app = createApp(App)
app.use(pinia)
useI18n(app)
app.use(ElemnetPlus)
app.mount('#app')
