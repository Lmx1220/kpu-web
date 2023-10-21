import type { AxiosRequestConfig } from 'axios'
import type { GenTableColumnPageQuery, GenTableColumnResultVO, GenTableColumnSaveVO, GenTableColumnUpdateVO } from './model/genTableColumnModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'genTableColumn'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  SyncField: {
    url: `${ServicePrefix}/${MODULAR}/syncField`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  } as AxiosRequestConfig,
}

export function page(params: PageParams<GenTableColumnPageQuery>) {
  return defHttp.request<PageResult<GenTableColumnResultVO>>({ ...Api.Page, params })
}
export function save(params: GenTableColumnSaveVO) {
  return defHttp.request<GenTableColumnResultVO>({ ...Api.Save, params })
}
export function update(params: GenTableColumnUpdateVO) {
  return defHttp.request<GenTableColumnResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: GenTableColumnPageQuery) {
  return defHttp.request<GenTableColumnResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<GenTableColumnResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<GenTableColumnResultVO>({ ...Api.Copy, params: { id } })
}

export function syncFieldGenTableColumn(data: {
  tableId: string
  id: string
}) {
  return defHttp.request<void>({
    ...Api.SyncField,
    params: { data },
  })
}

export default {
  list: page,
  detail,
  create: save,
  edit: update,
  delete: remove,
  syncField: syncFieldGenTableColumn,
}
