import HttpRequest from './request'
import useUserStore from '@/store/modules/user'

const request = new HttpRequest({
  baseURL: '/proxy/',
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      // eslint-disable-next-line no-console
      console.log('单个实例的拦截器: 请求拦截成功')
      const userStore = useUserStore()
      /**
       * 全局拦截请求发送前提交的参数
       * 以下代码为示例，在请求头里带上 token 信息
       */
      if (userStore.isLogin && config.headers) {
        config.headers.Token = userStore.token
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // eslint-disable-next-line no-console
      console.log('单个实例的拦截器: 请求拦截失败')
      return err
    },
    responseInterceptor: (res) => {
      // eslint-disable-next-line no-console
      console.log('单个实例的拦截器: 响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      // eslint-disable-next-line no-console
      console.log('单个实例的拦截器: 响应拦截失败')
      return Promise.reject(err)
    },
  },
})
export default request
