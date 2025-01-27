import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore(pinia)
const storage = {
  local: {
    has: (key: string) => {
      // eslint-disable-next-line no-prototype-builtins
      return localStorage.hasOwnProperty(`${settingsStore.settings.app.storagePrefix}${key}`)
    },
    get: (key: string) => {
      return localStorage.getItem(`${settingsStore.settings.app.storagePrefix}${key}`)
    },
    set: (key: string, value: string) => {
      localStorage.setItem(`${settingsStore.settings.app.storagePrefix}${key}`, value)
    },
    remove: (key: string) => {
      localStorage.removeItem(`${settingsStore.settings.app.storagePrefix}${key}`)
    },
    clear: () => {
      localStorage.clear()
    },
  },
  session: {
    has: (key: string) => {
      return !!sessionStorage.getItem(`${settingsStore.settings.app.storagePrefix}${key}`)
    },
    get: (key: string) => {
      return sessionStorage.getItem(`${settingsStore.settings.app.storagePrefix}${key}`)
    },
    set: (key: string, value: string) => {
      sessionStorage.setItem(`${settingsStore.settings.app.storagePrefix}${key}`, value)
    },
    remove: (key: string) => {
      sessionStorage.removeItem(`${settingsStore.settings.app.storagePrefix}${key}`)
    },
    clear: () => {
      sessionStorage.clear()
    },
  },
}

export default storage
