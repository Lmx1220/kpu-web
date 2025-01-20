import type { ErrorMessageMode } from '#/axios'
import useUserStore from '@/store/modules/user'
import { toast } from 'vue-sonner'

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
      toast.error('登录失效！请您重新登录', { position: 'top-center' })
      userStore.logout()
      break
    case 403:
      toast.error('当前账号无权限访问！', { position: 'top-center' })
      break
    case 404:
      toast.error('你所访问的资源不存在！', { position: 'top-center' })
      break
    case 405:
      toast.error('请求方式错误！请您稍后重试', { position: 'top-center' })
      break
    case 408:
      toast.error('请求超时！请您稍后重试', { position: 'top-center' })
      break
    case 500:
      toast.error('服务异常！', { position: 'top-center' })
      break
    case 502:
      toast.error('网关错误！', { position: 'top-center' })
      break
    case 503:
      toast.error('服务不可用！', { position: 'top-center' })
      break
    case 504:
      toast.error('网关超时！', { position: 'top-center' })
      break
    default:
      toast.error('请求失败！', { position: 'top-center' })
  }
  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // ElMessageBox({
      //   title: t('sys.api.errorTip'),
      //   message: errMessage,
      //   type: 'error',
      // })
      // #TODO 单窗口提示 现在不是
      const tips = toast.error(t('sys.api.successTiperrorTip'), {
        description: errMessage,
        position: 'top-center',
        duration: Infinity,
        action: {
          label: '知道了',
          onClick: () => toast.dismiss(tips),
        },
      })
    }
    else if (errorMessageMode === 'message') {
      toast.error(errMessage, {
        position: 'top-center',
      })
    }
  }
}
