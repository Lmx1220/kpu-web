import type { AxiosRequestConfig } from 'axios'
import type { FilePageQuery, FileResultVO, FileSaveVO, FileUpdateVO } from './model/fileModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'file'
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

export function page(params: PageParams<FilePageQuery>) {
  return defHttp.request<PageResult<FileResultVO>>({ ...Api.Page, params })
}
export function save(params: FileSaveVO) {
  return defHttp.request<FileResultVO>({ ...Api.Save, params })
}
export function update(params: FileUpdateVO) {
  return defHttp.request<FileResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: FilePageQuery) {
  return defHttp.request<FileResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<FileResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<FileResultVO>({ ...Api.Copy, params: { id } })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
