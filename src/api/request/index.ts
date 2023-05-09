import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { RequestConfig, RequestInterceptors } from './type'

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
        return config
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 请求拦截失败')

        return err
      },
    )

    this.instance.interceptors.response.use(
      (res) => {
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 响应拦截成功')

        return res.data
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.log('所有的实例都有的拦截器: 响应拦截失败')
        // 例子:判断不同httpErrorCode显示不同错误信息
        if (err.response.status === 404) {
          // eslint-disable-next-line no-console
          console.log('404错误~')
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
