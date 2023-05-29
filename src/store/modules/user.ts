import useRouteStore from './route'
import useSettingsStore from '@/store/modules/settings'

// import useMenuStore from './menu'
import api from '@/api'
import storage from '@/util/storage'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const settingsStore = useSettingsStore()
    // const menuStore = useMenuStore()

    const account = ref(storage.local.get('login_account') ?? '')
    const token = ref(storage.local.get('token') ?? '')
    const failure_time = ref(storage.local.get('failure_time') ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        if (new Date().getTime() < parseInt(failure_time.value) * 1000) {
          retn = true
        }
      }
      return retn
    })

    // 登录
    async function login(data: {
      username: string
      password: string
    }) {
      // 通过 mock 进行登录
      const res = await api.post<any>({
        url: 'auth/login',
        data,
      })
      // storage.local.set('login_account', res.data.account)
      storage.local.set('token', res)
      // storage.local.set('failure_time', res.data.failure_time)
      storage.local.set('failure_time', String(new Date().getTime() + 2592000))
      // account.value = res.data.account
      token.value = res
      // failure_time.value = res.data.failure_time
      failure_time.value = String(new Date().getTime() + 2592000)
    }
    // 登出
    async function logout() {
      storage.local.remove('login_account')
      storage.local.remove('token')
      storage.local.remove('failure_time')
      account.value = ''
      token.value = ''
      failure_time.value = ''
      routeStore.removeRoutes()
      // menuStore.setActived(0)
    }
    // 获取我的权限
    async function getPermissions() {
      // 通过 mock 获取权限
      const data = await api.get<string[]>({
        url: '/auth/permission',
        params: {
          account: account.value,
        },
      })
      permissions.value = data
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await api.post({
        url: '/member/edit/password',
        data: {
          account: account.value,
          password: data.password,
          newpassword: data.newpassword,
        },
      })
    }
    async function getPreferences() {
      settingsStore.updateSettings({})
    }
    return {
      account,
      token,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
      getPreferences,
    }
  },
)

export default useUserStore
