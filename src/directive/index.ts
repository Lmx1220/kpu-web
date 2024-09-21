import type { App } from 'vue'
import auth from './auth'
import authAll from './authAll'
import timeago from './timeago'
import zoomable from './zoomable'

export default {
  install(Vue: App) {
    Vue.directive('auth', auth)
    Vue.directive('auth-all', authAll)
    Vue.directive('zoomable', zoomable)
    Vue.directive('timeago', timeago)
  },
}
