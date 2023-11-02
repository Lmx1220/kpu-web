import type { AxiosRequestConfig } from 'axios'
import type { LoginLogPageQuery, LoginLogResultVO, LoginLogSaveVO, LoginLogUpdateVO } from './model/loginLogModel'
import defHttp from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'resource'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  Clear: { url: `${ServicePrefix}/${MODULAR}/clear`, method: RequestEnum.DELETE } as AxiosRequestConfig,
}
// 前缀 变量
const prefix = '/resource'

export function resourceAuthTree<T>(resourceOnly = true) {
  return defHttp.post<T>({
    url: `${prefix}/resourceResourceTree?resourceOnly=${resourceOnly}`,
  })
}

export function move<T>(currentId: string, targetId: string) {
  return defHttp.post<T>({
    url: `${prefix}/move/${currentId}/${targetId || 0}`,
  })
}

export default {
  // 后端获取路由数据
  list: <T>() => defHttp.post<T>({
    url: `${prefix}/treeResourceAndView`,

  }, {
    errorMessageMode: 'message',
  }),
  // // 基于文件系统路由模式下，后端获取导航菜单数据
  detail: <T>(id: string) => defHttp.get<T>({
    url: `${prefix}/${id}`,
  }),
  create: <T>(data: any) => defHttp.post<T>({
    url: `${prefix}`,
    data,
  }),
  edit: <T>(data: any) => defHttp.put<T>({
    url: `${prefix}`,
    data,
  }),
  delete: <T>(params: string[]) => defHttp.request<T>({
    method: RequestEnum.DELETE,
    url: `${prefix}`,
    params,
  }),
  resourceAuthTree,
  moveUp: <T>(id: string) => defHttp.post<T>({
    url: `${prefix}/moveUp/${id}`,
  }),
  moveDown: <T>(id: string) => defHttp.post<T>({
    url: `${prefix}/moveDown/${id}`,
  }),
  move: <T>(currentId: number, targetId: number) => defHttp.post<T>({
    url: `${prefix}/move/${currentId}/${targetId}`,
  }),

}
