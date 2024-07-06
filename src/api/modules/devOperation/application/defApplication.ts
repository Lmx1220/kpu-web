import type { AxiosRequestConfig } from 'axios'
import type {
  ApplicationResourceResultVO,
  DefApplicationPageQuery,
  DefApplicationResultVO,
  DefApplicationSaveVO,
  DefApplicationUpdateVO,
} from './model/defApplicationModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'defApplication'
const ServicePrefix = ''

export const Api = {
  Page: {
    url: `${ServicePrefix}/${MODULAR}/page`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Save: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.POST,
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
  FindApplicationResourceList: {
    url: `${ServicePrefix}/${MODULAR}/findApplicationResourceList`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  // 首页、我的应用 等查询我的可用应用
  FindMyApplication: {
    url: `${ServicePrefix}/anyone/findMyApplication`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  // 角色授权时，查询当前企业拥有的应用和资源
  FindAvailableApplicationResourceList: {
    url: `${ServicePrefix}/${MODULAR}/findAvailableApplicationResourceList`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
  // 角色授权时，查询当前企业拥有的应用和数据权限
  FindAvailableApplicationDataScopeList: {
    url: `${ServicePrefix}/${MODULAR}/findAvailableApplicationDataScopeList`,
    method: RequestEnum.GET,
  } as AxiosRequestConfig,
}

export function pageFindMyApplication(params: PageParams<DefApplicationPageQuery>) {
  return defHttp.request<DefApplicationResultVO[]>({
    ...Api.FindMyApplication,
    params: { name: params?.model?.name },
  })
}

export function findApplicationResourceList() {
  return defHttp.request<ApplicationResourceResultVO[]>({ ...Api.FindApplicationResourceList })
}

export function findAvailableApplicationResourceList() {
  return defHttp.request<ApplicationResourceResultVO[]>({ ...Api.FindAvailableApplicationResourceList })
}

export function findAvailableApplicationDataScopeList() {
  return defHttp.request<ApplicationResourceResultVO[]>({ ...Api.FindAvailableApplicationDataScopeList })
}

export function page(params: PageParams<DefApplicationPageQuery>) {
  return defHttp.request<PageResult<DefApplicationResultVO>>({ ...Api.Page, params })
}

export function query(params?: DefApplicationPageQuery) {
  return defHttp.request<DefApplicationResultVO[]>({ ...Api.Query, params })
}

export function save(params: DefApplicationSaveVO) {
  return defHttp.request<DefApplicationResultVO>({ ...Api.Save, params })
}

export function update(params: DefApplicationUpdateVO) {
  return defHttp.request<DefApplicationResultVO>({ ...Api.Update, params })
}

export const remove = (params: string[]) => defHttp.request<boolean>({ ...Api.Delete, params })

export default {
  page,
  save,
  update,
  remove,
  query,
}
