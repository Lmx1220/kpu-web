import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type { DictListItem, DictPageListGetResultModel, DictParams } from '@/api/modules/system/model/dictModel'

// 前缀 变量
const prefix = '/dict'

export function getListDict(params: BasicPageParams<DictParams>) {
  return api.post<DictPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailDict(id: string | number) {
  return api.get<DictListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createDict(data: any) {
  return api.post<DictListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editDict(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteDict(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export default {
  list: getListDict,
  detail: detailDict,
  create: createDict,
  edit: editDict,
  delete: deleteDict,
}
