/**
 * 该文件可自行根据业务逻辑进行调整
 */

import type { RequestClientOptions } from '@/utils/request-client'
import { refreshTokenApi } from '@/api/modules/user.ts'
import router from '@/router'
import useSettingsStore from '@/store/modules/settings.ts'
import useUserStore from '@/store/modules/user.ts'
import { authenticateResponseInterceptor, defaultResponseInterceptor, errorMessageResponseInterceptor, RequestClient } from '@/utils/request-client'
import { ElMessage } from 'element-plus'
import { Base64 } from 'js-base64'

const apiURL = (import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY) ? '/proxy/' : import.meta.env.VITE_APP_API_BASEURL

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
  })

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ')
    const userStore = useUserStore()
    userStore.token = ''
    if (
      // preferences.app.loginExpiredMode === 'modal' &&
      userStore.isLogin
    ) {
      // accessStore.setLoginExpired(true)
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
    return token ? `${token}` : null
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const userStore = useUserStore()
      const settingsStore = useSettingsStore()
      const token = userStore.token
      if (userStore.isLogin && token && (config as Recordable)?.requestOptions?.withToken !== false) {
        // jwt token
        (config as Recordable).headers.Token = formatToken(token)
      }
      // 添加客户端信息
      const clientId = 'kpu_web'
      const clientSecret = 'kpu_web_secret';

      (config as Recordable).headers.Authorization = `${Base64.encode(
        `${clientId}:${clientSecret}`,
      )}`
      config.headers.Path = router?.currentRoute?.value?.fullPath
      config.headers['Accept-Language'] = settingsStore.settings.app.defaultLang

      return config
    },
  })

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: 'code',
      dataField: 'data',
      successCode: 0,
    }),
  )

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
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {}
      const errorMessage = responseData?.error ?? responseData?.message ?? ''
      // 如果没有错误信息，则会根据状态码进行提示
      ElMessage.error(errorMessage || msg)
    }),
  )

  return client
}

export const requestClient = createRequestClient(apiURL, {
  responseReturn: 'data',
})

export const baseRequestClient = new RequestClient({ baseURL: apiURL })
