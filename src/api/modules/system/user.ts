import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  UserListItem,
  UserPageListGetResultModel,
  UserParams,
  UserRoleSaveVO,
} from '@/api/modules/system/model/userModel'

// 前缀 变量
const prefix = '/user'

export function getListUser(params: BasicPageParams<UserParams>) {
  return api.post<UserPageListGetResultModel>({
    url: `${prefix}/page`,
    data: { ...params },
  })
}

export function detailUser(id: string | number) {
  return api.get<UserListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createUser(data: any) {
  return api.post({
    url: `${prefix}`,
    data,
  })
}

export function editUser(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteUser(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export function roleList(id: string) {
  return api.get<string[]>({
    url: `${prefix}/roleList`,
    params: { userId: id },
  })
}

export function saveUserRole(data: UserRoleSaveVO) {
  return api.post<string[]>({
    url: `${prefix}/saveUserRole`,
    data,
  })
}

export default {
  list: getListUser,
  detail: detailUser,
  create: createUser,
  edit: editUser,
  delete: deleteUser,
  roleList,
  saveUserRole,
}
