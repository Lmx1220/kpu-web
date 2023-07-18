import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type { DictListItem, DictPageListGetResultModel, DictParams } from '@/api/modules/system/model/dictModel'

// 前缀 变量
const prefix = '/dict'

export function getListRole(params: BasicPageParams<DictParams>) {
  return api.post<DictPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailRole(id: string | number) {
  return api.get<DictListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createRole(data: any) {
  return api.post<DictListItem>({
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

export default {
  list: getListRole,
  detail: detailRole,
  create: createRole,
  edit: editRole,
  delete: deleteRole,
}
