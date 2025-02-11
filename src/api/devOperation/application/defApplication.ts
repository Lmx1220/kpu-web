import type { PageParams, PageResult } from '@/api/model/baseModel'
import type { AxiosRequestConfig } from 'axios'
import type {
  ApplicationResourceResultVO,
  DefApplicationPageQuery,
  DefApplicationResultVO,
  DefApplicationSaveVO,
  DefApplicationUpdateVO,
} from './model/defApplicationModel'
import { requestClient } from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const ServicePrefix = ''

const MODULAR = 'defApplication'

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
  return requestClient.get<DefApplicationResultVO[]>(Api.FindMyApplication.url as string, {
    params: { name: params?.model?.name },
  })
}

export function findApplicationResourceList() {
  return requestClient.get<ApplicationResourceResultVO[]>(Api.FindApplicationResourceList.url as string)
}

export function findAvailableApplicationResourceList() {
  return requestClient.get<ApplicationResourceResultVO[]>(Api.FindAvailableApplicationResourceList as string)
}

export function findAvailableApplicationDataScopeList() {
  return requestClient.get<ApplicationResourceResultVO[]>(Api.FindAvailableApplicationDataScopeList as string)
}

export function page(params: PageParams<DefApplicationPageQuery>) {
  return requestClient.post<PageResult<DefApplicationResultVO>>(`${ServicePrefix}/${MODULAR}/page`, params, {
    withCredentials: true,
  })
}

export function query(params?: DefApplicationPageQuery) {
  return requestClient.post<DefApplicationResultVO[]>(`${ServicePrefix}/${MODULAR}/query`, params, {
    withCredentials: true,
  })
}

export function save(params: DefApplicationSaveVO) {
  return requestClient.post<DefApplicationResultVO>(Api.Save.url as string, params, {
    withCredentials: true,
  })
}
export function update(params: DefApplicationUpdateVO) {
  return requestClient.put<DefApplicationResultVO>(Api.Update.url as string, params, {
    withCredentials: true,
  })
}

export const remove = (params: string[]) => requestClient.delete<boolean>(Api.Delete.url as string, { params })

export default {
  page,
  query,
  save,
  update,
  remove,
}
