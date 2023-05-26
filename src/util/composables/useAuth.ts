import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

export default function useAuth() {
  function hasPermission(permission: string) {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    if (settingsStore.settings.app.enablePermission) {
      return userStore.permissions.includes(permission)
    }
    else {
      return true
    }
  }

  function auth(value: string | string[]) {
    let auth
    if (typeof value === 'string') {
      auth = value !== '' ? hasPermission(value) : true
    }
    else if (Array.isArray(value)) {
      auth = value.length > 0 ? value.some(item => hasPermission(item)) : true
    }
    else {
      throw new TypeError('need roles! Like v-auth="\'admin\'" or v-auth="[\'admin\',\'user\']"')
    }
    return auth
  }

  function authAll(value: string[]) {
    if (!Array.isArray(value)) {
      throw new TypeError('need roles! Like v-auth-all="[\'admin\',\'user\']"')
    }
    return value.length > 0 ? value.every(item => hasPermission(item)) : true
  }

  return {
    auth,
    authAll,
  }
}
