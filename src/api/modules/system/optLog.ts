import type { AxiosRequestConfig } from 'axios'
import type { OptLogPageQuery, OptLogResultVO, OptLogSaveVO, OptLogUpdateVO } from './model/optLogModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'optLog'
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

export function page(params: PageParams<OptLogPageQuery>) {
  return defHttp.request<PageResult<OptLogResultVO>>({ ...Api.Page, params })
}
export function save(params: OptLogSaveVO) {
  return defHttp.request<OptLogResultVO>({ ...Api.Save, params })
}
export function update(params: OptLogUpdateVO) {
  return defHttp.request<OptLogResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: OptLogPageQuery) {
  return defHttp.request<OptLogResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<OptLogResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<OptLogResultVO>({ ...Api.Copy, params: { id } })
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
  list: page,
  detail,
  create: save,
  edit: update,
  delete: remove,
  clear,
}
