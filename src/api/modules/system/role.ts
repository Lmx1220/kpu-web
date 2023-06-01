import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type { RoleListItem, RolePageListGetResultModel, RoleParams } from '@/api/modules/system/model/roleModel'

// 前缀 变量
const prefix = '/system/role'
export function getListRole(params: BasicPageParams & RoleParams) {
  return api.get<RolePageListGetResultModel>({
    url: `${prefix}/list`,
    params,
  })
}
export function detailRole(id: string | number) {
  return api.get<RoleListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createRole(data: any) {
  return api.post<RoleListItem>({
    url: `${prefix}/create`,
    data,
  })
}

export function editRole(data: any) {
  return api.post<void>({
    url: `${prefix}/edit`,
    data,
  })
}

export function deleteRole(id: string) {
  return api.post<void>({
    url: `${prefix}/delete`,
    data: {
      id,
    },
  })
}

export default {
  list: getListRole,
  detail: detailRole,
  create: createRole,
  edit: editRole,
  delete: deleteRole,
}
