const settings = {
  app: {
    storagePrefix: 'app_',
  },
}
const storage = {
  local: {
    has: (key: string) => {
      return !!localStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    get: (key: string) => {
      return localStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    set: (key: string, value: string) => {
      localStorage.setItem(`${settings.app.storagePrefix}${key}`, value)
    },
    remove: (key: string) => {
      localStorage.removeItem(`${settings.app.storagePrefix}${key}`)
    },
    clear: () => {
      localStorage.clear()
    },
  },
  session: {
    has: (key: string) => {
      return !!sessionStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    get: (key: string) => {
      return sessionStorage.getItem(`${settings.app.storagePrefix}${key}`)
    },
    set: (key: string, value: string) => {
      sessionStorage.setItem(`${settings.app.storagePrefix}${key}`, value)
    },
    remove: (key: string) => {
      sessionStorage.removeItem(`${settings.app.storagePrefix}${key}`)
    },
    clear: () => {
      sessionStorage.clear()
    },
  },
}

export default storage
