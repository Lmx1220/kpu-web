import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type { OrgListItem, OrgPageListGetResultModel, OrgParams } from '@/api/modules/system/model/orgModel'

// 前缀 变量
const prefix = '/org'

export function getListOrg(params: BasicPageParams<OrgParams>) {
  return api.post<OrgPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function treeOrg(params?: OrgParams) {
  return api.get<OrgListItem[]>({
    url: `${prefix}/tree`,
    params,
  })
}

export function detailOrg(id: string | number) {
  return api.get<OrgListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createOrg(data: any) {
  return api.post<OrgListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editOrg(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteOrg(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export function roleList(id: string) {
  return api.get<string[]>({
    url: `${prefix}/findOrgRoleByOrgId`,
    params: { orgId: id },
  })
}

export function saveOrgRole(data: {
  orgId: string
  roleIdList: string[]
  flag?: boolean
}) {
  return api.post<string[]>({
    url: `${prefix}/saveOrgRole`,
    data,
  })
}

export default {
  list: getListOrg,
  detail: detailOrg,
  create: createOrg,
  edit: editOrg,
  delete: deleteOrg,
  tree: treeOrg,
  roleList,
  saveOrgRole,
}
