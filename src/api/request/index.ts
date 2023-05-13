import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { checkStatus } from '../helper/checkStatus'
import type { RequestConfig, RequestInterceptors } from './type'
import { showFullScreenLoading, tryHideFullScreenLoading } from './serviceLoading'

class HttpRequest {
  instance: AxiosInstance

  interceptors?: RequestInterceptors

  constructor(config: RequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    // 保存拦截器
    this.interceptors = config.interceptors
    // 使用拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    )
    // 所有的实例都有的拦截器

    this.instance.interceptors.request.use(
      (config) => {
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 请求拦截成功')
        config.noLoading || showFullScreenLoading()
        return config
      },
      (err) => {
        err.config.noLoading || endLoading()
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 请求拦截失败')
        return err
      },
    )

    this.instance.interceptors.response.use(
      (res) => {
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 响应拦截成功')
        res.config.noLoading || tryHideFullScreenLoading()
        const { data } = res
        // 登陆失效
        // if (data.code == ResultEnum.OVERDUE) {
        //   userStore.setToken('')
        //   router.replace(LOGIN_URL)
        //   ElMessage.error(data.msg)
        //   return Promise.reject(data)
        // }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.code && data.code !== 200) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        return res.data
      },
      (err: AxiosError) => {
        const { response } = err
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 响应拦截失败')
        tryHideFullScreenLoading()
        if (err.message.includes('timeout')) {
          ElMessage.error('请求超时！请您稍后重试')
        }
        if (err.message.includes('Network Error')) {
          ElMessage.error('网络错误！请您稍后重试')
        }
        // 例子:判断不同httpErrorCode显示不同错误信息
        if (response) {
          checkStatus(response.status)
        }
        if (!window.navigator.onLine) {
          const router = useRouter()
          router.replace('/500')
        }
        return err
      },

    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理

      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as InternalAxiosRequestConfig)
      }

      this.instance

        .request<any, T>(config)

        .then((res) => {
          // 单个请求对数据的处理

          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // eslint-disable-next-line no-console
          console.log(res)

          // 将结果返回出去

          resolve(res)
        })

        .catch((err) => {
          reject(err)

          return err
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HttpRequest
function endLoading() {
  throw new Error('Function not implemented.')
}
