import api from '@/api'
import type { CodeQueryVO, DictOption } from '@/api/model/baseModel'

export function findDictMapItemListByKey(data: CodeQueryVO[]) {
  return api.post<DictOption>({
    url: '/dict/findDictMapItemListByKey',
    data,
  })
}

export function findEnumListByType(data: CodeQueryVO[]) {
  return api.post<DictOption>({
    url: '/enums/findEnumListByType',
    params: { ...data },
  })
}
