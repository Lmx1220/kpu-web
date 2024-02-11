import type { App } from 'vue'
import ElementPlus from 'element-plus'
import '@/assets/styles/element-plus.scss'

function install(app: App) {
  app.use(ElementPlus)
}

export default { install }
