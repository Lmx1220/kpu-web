import type { AxiosRequestConfig } from 'axios'
import type { UserPageQuery, UserResultVO, UserRoleSaveVO, UserSaveVO, UserUpdateVO } from './model/userModel'
import type { PageParams, PageResult } from '@/api/model/baseModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const MODULAR = 'user'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  RoleList: { url: `${ServicePrefix}/${MODULAR}/roleList`, method: RequestEnum.GET } as AxiosRequestConfig,
  SaveUserRole: { url: `${ServicePrefix}/${MODULAR}/saveUserRole`, method: RequestEnum.POST } as AxiosRequestConfig,
}

export function page(params: PageParams<UserPageQuery>) {
  return defHttp.request<PageResult<UserResultVO>>({ ...Api.Page, params })
}

export function save(params: UserSaveVO) {
  return defHttp.request<UserResultVO>({ ...Api.Save, params })
}

export function update(params: UserUpdateVO) {
  return defHttp.request<UserResultVO>({ ...Api.Update, params })
}

export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}

export function query(params: UserPageQuery) {
  return defHttp.request<UserResultVO[]>({ ...Api.Query, params })
}

export function detail(id: string) {
  return defHttp.request<UserResultVO>({ ...Api.Detail, params: { id } })
}

export function copy(id: string) {
  return defHttp.request<UserResultVO>({ ...Api.Copy, params: { id } })
}

export function roleList(userId: string) {
  return defHttp.request<string[]>({ ...Api.RoleList, params: { userId } })
}

export function saveUserRole(data: UserRoleSaveVO) {
  return defHttp.request<string[]>({ ...Api.SaveUserRole, data: { ...data } })
}

export default {
  page,
  query,
  detail,
  save,
  update,
  remove,
}
