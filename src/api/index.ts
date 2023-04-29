import HttpRequest from './request'

const request = new HttpRequest({
  baseURL: 'http://',
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单个实例的拦截器: 请求拦截成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('单个实例的拦截器: 请求拦截失败')
      return err
    },
    responseInterceptor: (res) => {
      console.log('单个实例的拦截器: 响应拦截成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('单个实例的拦截器: 响应拦截失败')
      return err
    },
  },
})
export default request
