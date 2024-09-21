/**
 * 该文件可自行根据业务逻辑进行调整
 */

import { refreshTokenApi } from '@/api/modules/user.ts'
import useSettingsStore from '@/store/modules/settings.ts'
import useUserStore from '@/store/modules/user.ts'
import { authenticateResponseInterceptor, errorMessageResponseInterceptor, RequestClient } from '@/utils/request-client'
import { ElMessage } from 'element-plus'

const apiURL = (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true') ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL

function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL,
  })

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ')
    const userStore = useUserStore()
    // const authStore = useAuthStore()
    userStore.token = ''
    // preferences.app.loginExpiredMode === 'modal'&&
    if (userStore.isLogin
    ) {
      // userStore.setLoginExpired(true)
    }
    else {
      await userStore.logout()
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const userStore = useUserStore()
    const resp = await refreshTokenApi()
    const newToken = resp.data
    userStore.token = newToken
    return newToken
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const userStore = useUserStore()
      const settingsStore = useSettingsStore()

      // const token = userStore.token

      config.headers.Authorization = formatToken(userStore.token)
      config.headers['Accept-Language'] = settingsStore.settings.app.defaultLang
      return config
    },
  })

  // response数据解构
  client.addResponseInterceptor({
    fulfilled: (response) => {
      const { data: responseData, status } = response

      const { code, data, message: msg } = responseData
      if (status >= 200 && status < 400 && code === 0) {
        return data
      }
      throw new Error(`Error ${status}: ${msg}`)
    },
  })

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      // enableRefreshToken: preferences.app.enableRefreshToken,
      enableRefreshToken: true,
      formatToken,
    }),
  )

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string) => ElMessage.error(msg)),
  )

  return client
}

export const requestClient = createRequestClient(apiURL)

export const baseRequestClient = new RequestClient({ baseURL: apiURL })
