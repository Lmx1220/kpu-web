import type { AxiosRequestConfig } from 'axios'
import type { OrgPageQuery, OrgResultVO, OrgSaveVO, OrgUpdateVO } from './model/orgModel'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'
import type { PageParams, PageResult } from '@/api/model/baseModel'

const MODULAR = 'org'
const ServicePrefix = ''

export const Api = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST } as AxiosRequestConfig,
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST } as AxiosRequestConfig,
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE } as AxiosRequestConfig,
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST } as AxiosRequestConfig,
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET } as AxiosRequestConfig,
  Copy: { url: `${ServicePrefix}/${MODULAR}/copy`, method: RequestEnum.POST } as AxiosRequestConfig,
  FindOrgRoleByOrgId: { url: `${ServicePrefix}/${MODULAR}/findOrgRoleByOrgId`, method: RequestEnum.GET } as AxiosRequestConfig,
  SaveOrgRole: { url: `${ServicePrefix}/${MODULAR}/saveOrgRole`, method: RequestEnum.POST } as AxiosRequestConfig,
  TreeOrg: { url: `${ServicePrefix}/${MODULAR}/tree`, method: RequestEnum.GET } as AxiosRequestConfig,
}

export function page(params: PageParams<OrgPageQuery>) {
  return defHttp.request<PageResult<OrgResultVO>>({ ...Api.Page, params })
}
export function save(params: OrgSaveVO) {
  return defHttp.request<OrgResultVO>({ ...Api.Save, params })
}
export function update(params: OrgUpdateVO) {
  return defHttp.request<OrgResultVO>({ ...Api.Update, params })
}
export function remove(params: string[]) {
  return defHttp.request<boolean>({ ...Api.Delete, params })
}
export function query(params: OrgPageQuery) {
  return defHttp.request<OrgResultVO[]>({ ...Api.Query, params })
}
export function detail(id: string) {
  return defHttp.request<OrgResultVO>({ ...Api.Detail, params: { id } })
}
export function copy(id: string) {
  return defHttp.request<OrgResultVO>({ ...Api.Copy, params: { id } })
}

export function roleList(orgId: string) {
  return defHttp.request<string[]>({ ...Api.FindOrgRoleByOrgId, params: { orgId } })
}

export function saveOrgRole(data: {
  orgId: string
  roleIdList: string[]
  flag?: boolean
}) {
  return defHttp.request<string[]>({ ...Api.SaveOrgRole, params: data })
}
export function treeOrg(params?: OrgPageQuery) {
  return defHttp.request<OrgResultVO[]>({ ...Api.TreeOrg, params })
}
export default {
  list: page,
  detail,
  create: save,
  edit: update,
  delete: remove,
  tree: treeOrg,
  roleList,
  saveOrgRole,
}
