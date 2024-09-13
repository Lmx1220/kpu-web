import useRouteStore from './route'
import router from '@/router'
import useMenuStore from '@/store/modules/menu'
import useTabbarStore from '@/store/modules/tabbar'
import useSettingsStore from '@/store/modules/settings'

import dateUtil from '@/util/dayjs'

// import useMenuStore from './menu'
import api from '@/api'
import storage from '@/util/storage'
import { getUserInfoById } from '@/api/modules/user'
import type { DefUserInfoResultVO } from '@/types/store'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const routeStore = useRouteStore()
    const settingsStore = useSettingsStore()
    const tabbarStore = useTabbarStore()
    const menuStore = useMenuStore()

    const account = ref(storage.local.get('account') ?? '')
    const lastUpdateTime = ref(0)
    const userInfo = ref(storage.local.get('userInfo') ?? {})
    const avatar = ref(storage.local.get('avatar') ?? '')
    const token = ref(storage.local.get('token') ?? '')
    const failure_time = ref(storage.local.get('failure_time') ?? '')
    const permissions = ref<string[]>([])
    // const roles = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        if (new Date().getTime() < new Date(Number(failure_time.value)).getTime()) {
          retn = true
        }
      }
      return retn
    })

    // 登录
    async function login(data: {
      username: string
      password: string
      grantType?: string
    }): Promise<DefUserInfoResultVO | null> {
      try {
      // 通过 mock 进行登录
        const res = await api.post<any>({
          url: '/anyTenant/login',
          // baseURL: '/mock/',
          data: {
            username: data.username,
            password: data.password,
            grantType: 'PASSWORD',
          },
        })

        // storage.local.set('account', res.username)
        storage.local.set('token', res.token)
        storage.local.set('failure_time', `${dateUtil(res.expiration, 'YYYY-MM-DD HH:mm:ss').valueOf()}`)
        // account.value = res.username
        token.value = res.token
        failure_time.value = `${dateUtil(res.expiration, 'YYYY-MM-DD HH:mm:ss').valueOf()}`
        return afterLoginAction()
      }
      catch (error) {
        return Promise.reject(error)
      }
    }
    async function afterLoginAction(): Promise<DefUserInfoResultVO | null> {
      if (!token.value) {
        return null
      }
      const info = await getUserInfoAction()
      return info
    }

    // 刷新时加载用户信息
    async function getUserInfoAction(): Promise<DefUserInfoResultVO> {
      const info = await getUserInfoById()
      account.value = info.username
      userInfo.value = info
      lastUpdateTime.value = new Date().getTime()
      return info
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
          ...(redirect !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取我的权限
    async function getPermissions() {
      // 通过 mock 获取权限
      const data = await api.get<string[]>({
        url: '/anyone/findVisibleResource',
        params: {
          // account: account.value,
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
      lastUpdateTime,
      userInfo,
      avatar,
      token,
      permissions,
      isLogin,
      login,
      getUserInfoAction,
      logout,
      getPermissions,
      editPassword,
      getPreferences,
    }
  },
)

export default useUserStore
