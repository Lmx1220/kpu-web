import type { AxiosRequestConfig } from 'axios'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum.ts'

const ServicePrefix = '/gateway'
export const Api = {
  FindOnlineServicePrefix: {
    url: `${ServicePrefix}/findOnlineServicePrefix`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  FindOnlineService: {
    url: `${ServicePrefix}/findOnlineService`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
}

export function findOnlineServicePrefix() {
  return defHttp.request<Recordable>({ ...Api.FindOnlineServicePrefix })
}
export const findOnlineService = () => defHttp.request<Recordable>({ ...Api.FindOnlineService })
