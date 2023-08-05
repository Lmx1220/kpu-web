import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  RoleListItem,
  RolePageListGetResultModel,
  RoleParams,
  RoleResourceSaveVO,
  RoleUserSaveVO,
} from '@/api/modules/system/model/roleModel'

// 前缀 变量
const prefix = '/role'

export function getListRole(params: BasicPageParams<RoleParams>) {
  return api.post<RolePageListGetResultModel>({
    url: `${prefix}/page`,
    data: { ...params },
  })
}

export function getMyListRole(params: BasicPageParams<RoleParams>) {
  return api.post<RolePageListGetResultModel>({
    url: `${prefix}/myPage`,
    data: { ...params },
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
  return api.post({
    url: `${prefix}`,
    data,
  })
}

export function editRole(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteRole(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export function resourceList(id: string) {
  return api.get<string[]>({
    url: `${prefix}/resourceList`,
    params: { roleId: id },
  })
}

export function saveResource(data: RoleResourceSaveVO) {
  return api.post({
    url: `${prefix}/saveResource`,
    data,
  })
}

export function userList(id: string) {
  return api.get<string[]>({
    url: `${prefix}/userList`,
    params: { roleId: id },
  })
}

export function saveRoleUser(data: RoleUserSaveVO) {
  return api.post<string[]>({
    url: `${prefix}/saveRoleUser`,
    data,
  })
}

export default {
  list: getListRole,
  detail: detailRole,
  create: createRole,
  edit: editRole,
  delete: deleteRole,
  resourceList,
  saveResource,
  userList,
  saveRoleUser,
}
