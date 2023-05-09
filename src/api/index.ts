import HttpRequest from './request'

const request = new HttpRequest({
  baseURL: 'http://',
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      // eslint-disable-next-line no-console
      console.log('单个实例的拦截器: 请求拦截成功')
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
      return err
    },
  },
})
export default request
