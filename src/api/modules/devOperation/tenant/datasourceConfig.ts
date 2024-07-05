import type { AxiosRequestConfig } from 'axios'
import type {
  DatasourceConfig,
  DatasourceConfigPageQuery,
  DatasourceConfigResult,
  DatasourceConfigSaveDTO,
  DatasourceConfigUpdateDTO,
} from './model/datasourceConfigModel.ts'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'defDatasourceConfig'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST },
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Save: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.POST,
  },
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE },
  TestConnect: {
    url: `${ServicePrefix}/${MODULAR}/testConnect`,
    method: RequestEnum.POST,
  },
  Query: {
    url: `${ServicePrefix}/${MODULAR}/query`,
    method: RequestEnum.POST,
  },
}

export function page(params: PageParams<DatasourceConfigPageQuery>) {
  return defHttp.request<PageResult<DatasourceConfigResult>>({ ...Api.Page, params })
}
export function detail(id: string) {
  return defHttp.request<DatasourceConfig>({ ...Api.Detail, params: { id } })
}
export function save(params: DatasourceConfigSaveDTO) {
  return defHttp.request<DatasourceConfig>({ ...Api.Save, params })
}

export function update(params: DatasourceConfigUpdateDTO) {
  return defHttp.request<DatasourceConfig>({ ...Api.Update, params })
}

export function remove(ids: string[]) {
  return defHttp.request<boolean>({
    ...Api.Delete,
    params: ids,
  })
}

export function testConnect(id: string) {
  return defHttp.request<boolean>({
    ...Api.TestConnect,
    params: { id },
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  })
}

export function query(params?: DatasourceConfig) {
  return defHttp.request<DatasourceConfig[]>({ ...Api.Query, params })
}
export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
