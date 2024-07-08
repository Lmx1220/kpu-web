import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import type {
  DefGenTableImportVO,
  DefGenTablePageQuery,
  DefGenTableResultVO,
  DefGenTableUpdateVO,
  DefGenVO,
} from './model/defGenTableModel.ts'
import type { PageParams, PageResult } from '@/api/model/baseModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'

// const MODULAR = 'genTable'
const ServicePrefix = ''

const MODULAR = 'defGenTable'

export const Api = {
  Page: {
    url: `${ServicePrefix}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  SelectTableList: {
    url: `${ServicePrefix}/${MODULAR}/selectTableList`,
    method: RequestEnum.POST,
    timeout: 60000,
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
  PreviewCode: {
    url: `${ServicePrefix}/${MODULAR}/previewCode`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,
  ImportTable: {
    url: `${ServicePrefix}/${MODULAR}/importTable`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  ImportCheck: {
    url: `${ServicePrefix}/${MODULAR}/importCheck`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  GeneratorCode: {
    url: `${ServicePrefix}/${MODULAR}/generatorCode`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  DownloadZip: {
    url: `${ServicePrefix}/${MODULAR}/downloadZip`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  syncField: {
    url: `${ServicePrefix}/${MODULAR}/syncField`,
    method: RequestEnum.POST,
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  } as AxiosRequestConfig,
  Detail: {
    url: `${ServicePrefix}/${MODULAR}/detail`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  GetFieldTemplate: {
    url: `${ServicePrefix}/${MODULAR}/getFieldTemplate`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  GetDefFileOverrideStrategy: {
    url: `${ServicePrefix}/${MODULAR}/getDefFileOverrideStrategy`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  FindTableList: {
    url: `${ServicePrefix}/${MODULAR}/findTableList`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
}

export function page(params: PageParams<DefGenTablePageQuery>) {
  return defHttp.request<PageResult<DefGenTableResultVO>>({ ...Api.Page, params })
}

export function selectTableList(params: PageParams<DefGenTablePageQuery>) {
  return defHttp.request<DefGenTableResultVO[]>({ ...Api.SelectTableList, params })
}

export function query(params: DefGenTablePageQuery) {
  return defHttp.request<DefGenTableResultVO[]>({
    ...Api.Query,
    params,
  })
}

export function update(params: DefGenTableUpdateVO) {
  return defHttp.request<DefGenTableResultVO>({ ...Api.Update, params })
}

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params })

export function previewCode(id: string, template: string) {
  return defHttp.request<any>({
    ...Api.PreviewCode,
    params: { id, template },
  })
}

export function findTableList(params: string[]) {
  return defHttp.request<DefGenTableResultVO[]>({
    ...Api.FindTableList,
    params,
  })
}

export function importCheck(tableNames: string[]) {
  return defHttp.request<boolean>(
    {
      ...Api.ImportCheck,
      params: tableNames,
    },
    { errorMessageMode: 'none' },
  )
}

export function importTable(params: DefGenTableImportVO) {
  return defHttp.request<boolean>({
    ...Api.ImportTable,
    params,
  })
}

export function downloadZip(ids: string[], template: string) {
  return defHttp.request<any>(
    {
      ...Api.DownloadZip,
      responseType: 'blob',
      params: qs.stringify({ ids, template }, { arrayFormat: 'repeat' }),
    },
    { isReturnNativeResponse: true },
  )
}

export function generatorCode(defGenVo: DefGenVO) {
  return defHttp.request<boolean>({
    ...Api.GeneratorCode,
    params: defGenVo,
  })
}

export function syncField(id: string) {
  return defHttp.request<boolean>({
    ...Api.syncField,
    params: { id },
  })
}

export function detail(id: string) {
  return defHttp.request<DefGenTableResultVO>({
    ...Api.Detail,
    params: { id },
  })
}

export function getDefFileOverrideStrategy() {
  return defHttp.request<Recordable>({ ...Api.GetDefFileOverrideStrategy })
}

export const getFieldTemplate = () => defHttp.request<Recordable>({ ...Api.GetFieldTemplate })

export default {
  page,
  // save,
  update,
  remove,
  query,
  detail,
}
