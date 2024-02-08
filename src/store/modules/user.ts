import useRouteStore from './route'
import router from '@/router'
import useMenuStore from '@/store/modules/menu'
import useTabbarStore from '@/store/modules/tabbar'
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
    const tabbarStore = useTabbarStore()
    const menuStore = useMenuStore()

    const account = ref(storage.local.get('account') ?? '')
    const avatar = ref(storage.local.get('avatar') ?? '')
    const token = ref(storage.local.get('token') ?? '')
    const failure_time = ref(storage.local.get('failure_time') ?? '')
    const permissions = ref<string[]>([])
    const roles = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        if (new Date().getTime() < Number.parseInt(failure_time.value) * 1000) {
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
        url: '/noToken/login',
        data: {
          username: data.username,
          password: data.password,
          grantType: 'password',
        },
      })
      storage.local.set('account', res.username)
      storage.local.set('token', res.token)
      storage.local.set('failure_time', res.expire)
      account.value = res.username
      token.value = res.token
      failure_time.value = res.expire
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      storage.local.remove('account')
      storage.local.remove('token')
      storage.local.remove('failureTime')
      account.value = ''
      token.value = ''
      failure_time.value = ''
      tabbarStore.clean()
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
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
        url: '/resource/visible',
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
