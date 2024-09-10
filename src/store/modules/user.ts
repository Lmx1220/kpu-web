import useMenuStore from './menu'
import useSettingsStore from './settings'
import useWindowStore from './window'

import router from '@/router'
import api from '@/api'
import storage from '@/util/storage'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const menuStore = useMenuStore()
    const windowStore = useWindowStore()

    const account = ref(storage.local.get('account') ?? '')
    const avatar = ref(storage.local.get('avatar') ?? '')
    const token = ref(storage.local.get('token') ?? '')
    // const failure_time = ref(storage.local.get('failure_time') ?? '')
    const permissions = ref<string[]>([])
    const roles = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) {
        return true
      }
      return false
    })

    // 登录
    async function login(data: {
      username: string
      password: string
    }) {
      // 通过 mock 进行登录
      const res = await api.post<any>({
        url: '/anyTenant/login',
        baseURL: '/mock/',
        data: {
          username: data.username,
          password: data.password,
          grantType: 'PASSWORD',
        },
      })
      storage.local.set('account', res.username)
      storage.local.set('token', res.token)
      storage.local.set('avatar', res.avatar)
      account.value = res.username
      token.value = res.token
      avatar.value = res.avatar
    }
    // 登出
    async function logout() {
      storage.local.remove('account')
      storage.local.remove('token')
      storage.local.remove('avatar')
      account.value = ''
      token.value = ''
      avatar.value = ''
      menuStore.setActived(0)
      menuStore.removeMenus()
      windowStore.removeAll()
      router.push({
        name: 'login',
      })
    }
    // 获取我的权限
    async function getPermissions() {
      // 通过 mock 获取权限
      const data = await api.get<{
        caseSensitive: boolean
        enabled: boolean
        resourceList: string[]
        roleList: string[]
      }>({
        url: '/anyone/visible/resource',
        baseURL: '/mock/',
        params: {
          account: account.value,
        },
      })
      permissions.value = data.resourceList
      roles.value = data.roleList
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
      avatar,
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
