import type { PageParams, PageResult } from '@/api/model/baseModel'
import type { AxiosRequestConfig } from 'axios'
import type {
  StandardModuleExamplePageQuery,
  StandardModuleExampleResultVO,
  StandardModuleExampleSaveVO,
  StandardModuleExampleUpdateVO,
} from './model/standardModuleExampleModel.ts'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const MODULAR = 'standardModuleExample'
const ServicePrefix = 'mock'

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
}

export function page(params: PageParams<StandardModuleExamplePageQuery>) {
  return defHttp.request<PageResult<StandardModuleExampleResultVO>>({ ...Api.Page, params })
}
export function save(params: StandardModuleExampleSaveVO) {
  return defHttp.request<StandardModuleExampleResultVO>({ ...Api.Save, params })
}
export function update(params: StandardModuleExampleUpdateVO) {
  return defHttp.request<StandardModuleExampleResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: StandardModuleExamplePageQuery) {
  return defHttp.request<StandardModuleExampleResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<StandardModuleExampleResultVO>({ ...Api.Detail, params: { id } })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
