import Message from 'vue-m-message'
import useUserStore from '@/store/modules/user'
import type { ErrorMessageMode } from '#/axios'

/**
 * @description: 校验网络请求状态码
 * @param {number} status
 * @param {string} msg
 * @param {string} errorMessageMode
 * @return void
 */
export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message') {
  let errMessage = ''
  const userStore = useUserStore()
  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      Message.error('登录失效！请您重新登录')
      userStore.logout()
      break
    case 403:
      Message.error('当前账号无权限访问！')
      break
    case 404:
      Message.error('你所访问的资源不存在！')
      break
    case 405:
      Message.error('请求方式错误！请您稍后重试')
      break
    case 408:
      Message.error('请求超时！请您稍后重试')
      break
    case 500:
      Message.error('服务异常！')
      break
    case 502:
      Message.error('网关错误！')
      break
    case 503:
      Message.error('服务不可用！')
      break
    case 504:
      Message.error('网关超时！')
      break
    default:
      Message.error('请求失败！')
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // ElMessageBox({
      //   title: t('sys.api.errorTip'),
      //   message: errMessage,
      //   type: 'error',
      // })
      // #TODO 单窗口提示 现在不是
      Message({ title: t('sys.api.errorTip'), type: 'error', message: errMessage })
    }
    else if (errorMessageMode === 'message') {
      Message({
        message: errMessage,
        type: 'error',
        // key: `global_error_message_status_${status}`,
        // grouping: true,
      })
    }
  }
}
