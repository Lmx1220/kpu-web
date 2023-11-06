import type { AxiosRequestConfig } from 'axios'
import type { LoginLogPageQuery, LoginLogResultVO, LoginLogSaveVO, LoginLogUpdateVO } from './model/loginLogModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'loginLog'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  Clear: { url: `${ServicePrefix}/${MODULAR}/clear`, method: RequestEnum.DELETE } as AxiosRequestConfig,
}

export function page(params: PageParams<LoginLogPageQuery>) {
  return defHttp.request<PageResult<LoginLogResultVO>>({ ...Api.Page, params })
}
export function save(params: LoginLogSaveVO) {
  return defHttp.request<LoginLogResultVO>({ ...Api.Save, params })
}
export function update(params: LoginLogUpdateVO) {
  return defHttp.request<LoginLogResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: LoginLogPageQuery) {
  return defHttp.request<LoginLogResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<LoginLogResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<LoginLogResultVO>({ ...Api.Copy, params: { id } })
}

export function clear(type: number) {
  return defHttp.request<boolean>({
    ...Api.Clear,
    params: { type },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
