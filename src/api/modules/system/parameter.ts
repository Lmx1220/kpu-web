import type { AxiosRequestConfig } from 'axios'
import type { ParameterPageQuery, ParameterResultVO, ParameterSaveVO, ParameterUpdateVO } from './model/parameterModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'parameter'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
}

export function page(params: PageParams<ParameterPageQuery>) {
  return defHttp.request<PageResult<ParameterResultVO>>({ ...Api.Page, params })
}
export function save(params: ParameterSaveVO) {
  return defHttp.request<ParameterResultVO>({ ...Api.Save, params })
}
export function update(params: ParameterUpdateVO) {
  return defHttp.request<ParameterResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: ParameterPageQuery) {
  return defHttp.request<ParameterResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<ParameterResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<ParameterResultVO>({ ...Api.Copy, params: { id } })
}

export default {
  list: page,
  detail,
  create: save,
  edit: update,
  delete: remove,
}
