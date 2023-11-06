import type { AxiosRequestConfig } from 'axios'
import type { StationPageQuery, StationResultVO, StationSaveVO, StationUpdateVO } from './model/stationModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'station'
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

export function page(params: PageParams<StationPageQuery>) {
  return defHttp.request<PageResult<StationResultVO>>({ ...Api.Page, params })
}
export function save(params: StationSaveVO) {
  return defHttp.request<StationResultVO>({ ...Api.Save, params })
}
export function update(params: StationUpdateVO) {
  return defHttp.request<StationResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: StationPageQuery) {
  return defHttp.request<StationResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<StationResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<StationResultVO>({ ...Api.Copy, params: { id } })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
