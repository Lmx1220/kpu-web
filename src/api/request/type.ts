import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestInterceptors<T = AxiosResponse> {

  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig

  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (res: T) => T

  responseInterceptorCatch?: (error: any) => any

}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {

  interceptors?: RequestInterceptors<T>
  showLoading?: boolean

}
