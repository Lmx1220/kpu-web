import type { AxiosRequestConfig } from 'axios'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const ServicePrefix = ''
const MODULAR = 'defServer'

export const Api = {
  Get: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.GET,
    timeout: 2 * 60 * 1000,
  } as AxiosRequestConfig,
}

export const get = () => defHttp.request<any>({ ...Api.Get })
