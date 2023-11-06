import type { AxiosRequestConfig } from 'axios'
import type {
  RolePageQuery,
  RoleResourceSaveVO,
  RoleResultVO,
  RoleSaveVO,
  RoleUpdateVO,
  RoleUserSaveVO,
} from './model/roleModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'role'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  GetMyListRole: { url: `${ServicePrefix}/${MODULAR}/myPage`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  MyPage: { url: `${ServicePrefix}/${MODULAR}/myPage`, method: RequestEnum.POST } as AxiosRequestConfig,
  ResourceList: { url: `${ServicePrefix}/${MODULAR}/resourceList`, method: RequestEnum.GET } as AxiosRequestConfig,
  SaveResource: { url: `${ServicePrefix}/${MODULAR}/saveResource`, method: RequestEnum.POST } as AxiosRequestConfig,
  UserList: { url: `${ServicePrefix}/${MODULAR}/userList`, method: RequestEnum.GET } as AxiosRequestConfig,
  SaveRoleUser: { url: `${ServicePrefix}/${MODULAR}/saveRoleUser`, method: RequestEnum.POST } as AxiosRequestConfig,
}

export function page(params: PageParams<RolePageQuery>) {
  return defHttp.request<PageResult<RoleResultVO>>({ ...Api.Page, params })
}
export function save(params: RoleSaveVO) {
  return defHttp.request<RoleResultVO>({ ...Api.Save, params })
}
export function update(params: RoleUpdateVO) {
  return defHttp.request<RoleResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: RolePageQuery) {
  return defHttp.request<RoleResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<RoleResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<RoleResultVO>({ ...Api.Copy, params: { id } })
}

export function getMyListRole(params: PageParams<RolePageQuery>) {
  return defHttp.request<PageResult<RoleResultVO>>({ ...Api.GetMyListRole, params })
}

export function resourceList(roleId: string) {
  return defHttp.request<string[]>({ ...Api.ResourceList, params: { roleId } })
}

export function saveResource(data: RoleResourceSaveVO) {
  return defHttp.request<PageResult<RoleResultVO>>({ ...Api.SaveResource, params: data })
}

export function userList(roleId: string) {
  return defHttp.request<PageResult<RoleResultVO>>({ ...Api.UserList, params: { roleId } })
}

export function saveRoleUser(data: RoleUserSaveVO) {
  return defHttp.request<PageResult<RoleResultVO>>({ ...Api.SaveRoleUser, params: data })
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
}
