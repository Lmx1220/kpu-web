import { ElMessage, ElMessageBox } from 'element-plus'
import useUserStore from '@/store/modules/user'
import type { ErrorMessageMode } from '#/axios'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @param {String} msg
 * @param {String} errorMessageMode
 * @return void
 */
export function checkStatus(status: number, msg: string,
  errorMessageMode: ErrorMessageMode = 'message') {
  let errMessage = ''
  const userStore = useUserStore()
  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      ElMessage.error('登录失效！请您重新登录')
      userStore.logout()
      break
    case 403:
      ElMessage.error('当前账号无权限访问！')
      break
    case 404:
      ElMessage.error('你所访问的资源不存在！')
      break
    case 405:
      ElMessage.error('请求方式错误！请您稍后重试')
      break
    case 408:
      ElMessage.error('请求超时！请您稍后重试')
      break
    case 500:
      ElMessage.error('服务异常！')
      break
    case 502:
      ElMessage.error('网关错误！')
      break
    case 503:
      ElMessage.error('服务不可用！')
      break
    case 504:
      ElMessage.error('网关超时！')
      break
    default:
      ElMessage.error('请求失败！')
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      ElMessageBox({
        title: t('sys.api.errorTip'),
        message: errMessage,
        type: 'error',
      })
    }
    else if (errorMessageMode === 'message') {
      ElMessage.error({
        message: errMessage,
        key: `global_error_message_status_${status}`,
        grouping: true,
      })
    }
  }
}
