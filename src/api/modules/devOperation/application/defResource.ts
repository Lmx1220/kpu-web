import type { AxiosRequestConfig } from 'axios'
import type { DefResourcePageQuery, DefResourceResultVO, DefResourceSaveVO, DefResourceUpdateVO } from './model/defResourceModel.ts'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel.ts'

const MODULAR = 'defResource'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Tree: {
    url: `${ServicePrefix}/${MODULAR}/tree`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  TreeResourceAndView: { url: `${ServicePrefix}/${MODULAR}/treeResourceAndView`, method: RequestEnum.POST } as AxiosRequestConfig,
  ResourceAuthTree: { url: `${ServicePrefix}/${MODULAR}/resourceResourceTree`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST },
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: (id: string) => {
    return {
      url: `${ServicePrefix}/${MODULAR}/${id}`,
      method: RequestEnum.GET,
    } as AxiosRequestConfig
  },
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  Move: { url: `${ServicePrefix}/${MODULAR}/move`, method: RequestEnum.POST } as AxiosRequestConfig,
  MoveUp: { url: `${ServicePrefix}/${MODULAR}/moveUp`, method: RequestEnum.POST } as AxiosRequestConfig,
  MoveDown: { url: `${ServicePrefix}/${MODULAR}/moveDown`, method: RequestEnum.POST } as AxiosRequestConfig,
  tree: { url: `${ServicePrefix}/${MODULAR}/moveDown`, method: RequestEnum.POST } as AxiosRequestConfig,
}

export function tree(params?: DefResourcePageQuery) {
  return defHttp.request<DefResourceResultVO[]>({ ...Api.Tree, params })
}

export function page(params: PageParams<DefResourcePageQuery>) {
  return defHttp.request<PageResult<DefResourceResultVO>>({ ...Api.Page, params })
}
export function treeDefResourceAndView(params?: PageParams<DefResourcePageQuery>) {
  return defHttp.request<DefResourceResultVO[]>({ ...Api.TreeResourceAndView, params }, {
    errorMessageMode: 'message',
  })
}
export function save(params: DefResourceSaveVO) {
  return defHttp.request<DefResourceResultVO>({ ...Api.Save, params })
}
export function update(params: DefResourceUpdateVO) {
  return defHttp.request<DefResourceResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: DefResourcePageQuery) {
  return defHttp.request<DefResourceResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<DefResourceResultVO>({ ...Api.Detail(id) })
}
export function copy(id: string) {
  return defHttp.request<DefResourceResultVO>({ ...Api.Copy, params: { id } })
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
