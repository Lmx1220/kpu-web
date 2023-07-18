import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  DictItemListItem,
  DictItemPageListGetResultModel,
  DictItemParams,
} from '@/api/modules/system/model/dictItemModel'

// 前缀 变量
const prefix = '/dictItem'

export function getListRole(params: BasicPageParams<DictItemParams>) {
  return api.post<DictItemPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailRole(id: string | number) {
  return api.get<DictItemListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createRole(data: any) {
  return api.post<DictItemListItem>({
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
