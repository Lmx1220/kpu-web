import type { AxiosRequestConfig } from 'axios'
import type {
  DefGenTableColumnPageQuery,
  DefGenTableColumnResultVO,
  DefGenTableColumnUpdateVO,
} from './model/defGenTableColumnModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

// const MODULAR = 'genTableColumn'
const ServicePrefix = ''
const MODULAR = 'defGenTableColumn'

export const Api = {
  Page: {
    url: `${ServicePrefix}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  SyncField: {
    url: `${ServicePrefix}/${MODULAR}/syncField`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,
  Update: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.PUT,
  },
  Delete: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.DELETE,
  } as AxiosRequestConfig,
  Query: {
    url: `${ServicePrefix}/${MODULAR}/query`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
}

export function page(params: PageParams<DefGenTableColumnPageQuery>) {
  return defHttp.request<PageResult<DefGenTableColumnResultVO>>({ ...Api.Page, params })
}

export function query(params: DefGenTableColumnPageQuery) {
  return defHttp.request<DefGenTableColumnResultVO[]>({
    ...Api.Query,
    params,
  })
}

export function update(params: DefGenTableColumnUpdateVO) {
  return defHttp.request<DefGenTableColumnResultVO>({ ...Api.Update, params })
}

export function syncField(tableId: string, id: string) {
  return defHttp.request<DefGenTableColumnResultVO>({ ...Api.SyncField, params: { tableId, id } })
}

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params })

export default {
  page,
  // save,
  update,
  remove,
  query,
  // detail,
}
