import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  DictItemListItem,
  DictItemPageListGetResultModel,
  DictItemParams,
} from '@/api/modules/system/model/dictItemModel'

// 前缀 变量
const prefix = '/dictItem'

export function getListDictItem(params: BasicPageParams<DictItemParams>) {
  return api.post<DictItemPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailDictItem(id: string | number) {
  return api.get<DictItemListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createDictItem(data: any) {
  return api.post<DictItemListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editDictItem(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteDictItem(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export default {
  list: getListDictItem,
  detail: detailDictItem,
  create: createDictItem,
  edit: editDictItem,
  delete: deleteDictItem,
}
