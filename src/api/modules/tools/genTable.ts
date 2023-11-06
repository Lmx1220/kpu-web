import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import type { GenTablePageQuery, GenTableResultVO, GenTableSaveVO, GenTableUpdateVO } from './model/genTableModel'
import type { PageParams, PageResult } from '@/api/model/baseModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'

const MODULAR = 'genTable'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  SelectTableList: {
    url: `${ServicePrefix}/${MODULAR}/selectTableList`,
    method: RequestEnum.POST,
    timeout: 6e4,
  } as AxiosRequestConfig,
  FindTableList: { url: `${ServicePrefix}/${MODULAR}/findTableList`, method: RequestEnum.POST } as AxiosRequestConfig,
  PreviewCode: {
    url: `${ServicePrefix}/${MODULAR}/previewCode`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  } as AxiosRequestConfig,
  GetFileOverrideStrategy: { url: `${ServicePrefix}/${MODULAR}/getFileOverrideStrategy`, method: RequestEnum.GET } as AxiosRequestConfig,
  GetFieldTemplate: { url: `${ServicePrefix}/${MODULAR}/getFieldTemplate`, method: RequestEnum.GET } as AxiosRequestConfig,
  DownloadZip: { url: `${ServicePrefix}/${MODULAR}/downloadZip`, method: RequestEnum.GET } as AxiosRequestConfig,
  GeneratorCode: { url: `${ServicePrefix}/${MODULAR}/generatorCode`, method: RequestEnum.POST } as AxiosRequestConfig,
  ImportCheck: { url: `${ServicePrefix}/${MODULAR}/importCheck`, method: RequestEnum.POST } as AxiosRequestConfig,
  ImportTable: { url: `${ServicePrefix}/${MODULAR}/importTable`, method: RequestEnum.POST } as AxiosRequestConfig,
  SyncField: {
    url: `${ServicePrefix}/${MODULAR}/syncField`,
    method: RequestEnum.POST,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  } as AxiosRequestConfig,
}

export function page(params: PageParams<GenTablePageQuery>) {
  return defHttp.request<PageResult<GenTableResultVO>>({ ...Api.Page, params })
}
export function save(params: GenTableSaveVO) {
  return defHttp.request<GenTableResultVO>({ ...Api.Save, params })
}
export function update(params: GenTableUpdateVO) {
  return defHttp.request<GenTableResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: GenTablePageQuery) {
  return defHttp.request<GenTableResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<GenTableResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<GenTableResultVO>({ ...Api.Copy, params: { id } })
}

export function selectTableList(params: PageParams<GenTablePageQuery>) {
  return defHttp.request<GenTableResultVO[]>({ ...Api.SelectTableList, params })
}

export function findTableList(params: string[]) {
  return defHttp.request<GenTableResultVO[]>({ ...Api.FindTableList, params })
}

export function previewCode(params: {
  id: string
  template: 'WEB_PLUS' | 'BACKEND'
}) {
  return defHttp.request<Record<string, string>>({ ...Api.PreviewCode, params })
}

export function getFileOverrideStrategy() {
  return defHttp.request<Record<string, string>>({ ...Api.GetFileOverrideStrategy })
}

export function getFieldTemplate() {
  return defHttp.request<Record<string, string>>({ ...Api.GetFieldTemplate })
}

export function downloadZip(ids: string | string[], template: 'WEB_PLUS' | 'BACKEND') {
  return defHttp.request({
    ...Api.DownloadZip,
    responseType: 'blob',
    params: qs.stringify({
      ids,
      template,
    },
    {
      arrayFormat: 'repeat',
    }),
  }, {
    isReturnNativeResponse: true,
  })
}

export function generatorCode(data: {
  ids: string[]
  template: 'WEB_PLUS' | 'BACKEND'
  fileOverrideConfig?: {
    [key: string]: string
  }
}) {
  return defHttp.request<boolean>({ ...Api.GeneratorCode, params: data })
}

export function importCheck(tableNames: string[]) {
  return defHttp.request<boolean>({ ...Api.ImportCheck, params: tableNames }, {
    errorMessageMode: 'none',
  })
}

export function importTable(params: {
  dsId: string
  tableNames: string[]
}) {
  return defHttp.request<boolean>({ ...Api.ImportTable, params })
}

export function syncFieldGenTable(id: string) {
  return defHttp.request<boolean>({ ...Api.SyncField, params: { id } })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
