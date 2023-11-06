import type { AxiosRequestConfig } from 'axios'
import type { ResourcePageQuery, ResourceResultVO, ResourceSaveVO, ResourceUpdateVO } from './model/ResourceModel.ts'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel.ts'

const MODULAR = 'resource'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  TreeResourceAndView: { url: `${ServicePrefix}/${MODULAR}/treeResourceAndView`, method: RequestEnum.POST } as AxiosRequestConfig,
  ResourceAuthTree: { url: `${ServicePrefix}/${MODULAR}/resourceResourceTree`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST },
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  Move: { url: `${ServicePrefix}/${MODULAR}/move`, method: RequestEnum.POST } as AxiosRequestConfig,
  MoveUp: { url: `${ServicePrefix}/${MODULAR}/moveUp`, method: RequestEnum.POST } as AxiosRequestConfig,
  MoveDown: { url: `${ServicePrefix}/${MODULAR}/moveDown`, method: RequestEnum.POST } as AxiosRequestConfig,
}

export function page(params: PageParams<ResourcePageQuery>) {
  return defHttp.request<PageResult<ResourceResultVO>>({ ...Api.Page, params })
}
export function treeResourceAndView(params?: PageParams<ResourcePageQuery>) {
  return defHttp.request<ResourceResultVO[]>({ ...Api.TreeResourceAndView, params }, {
    errorMessageMode: 'message',
  })
}
export function save(params: ResourceSaveVO) {
  return defHttp.request<ResourceResultVO>({ ...Api.Save, params })
}
export function update(params: ResourceUpdateVO) {
  return defHttp.request<ResourceResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: ResourcePageQuery) {
  return defHttp.request<ResourceResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<ResourceResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<ResourceResultVO>({ ...Api.Copy, params: { id } })
}
export function resourceAuthTree<T>(resourceOnly = true) {
  return defHttp.request<T>({
    ...Api.ResourceAuthTree,
    // 无效传参
    data: { resourceOnly },
    params: { resourceOnly },
  })
}

export function move(currentId: string, targetId: string) {
  return defHttp.request({
    ...Api.Move,
    params: `/${currentId}/${targetId || 0}`,
  })
}
export function moveUp(id: string) {
  return defHttp.request({
    ...Api.MoveUp,
    params: `/${id}`,
  })
}
export function moveDown(id: string) {
  return defHttp.request({
    ...Api.MoveDown,
    params: `/${id}`,
  })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
