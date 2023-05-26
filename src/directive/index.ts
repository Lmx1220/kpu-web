import type { App } from 'vue'
import auth from './auth'
import authAll from './authAll'

export default {
  install(Vue: App) {
    Vue.directive('auth', auth)
    Vue.directive('auth-all', authAll)
  },
}
