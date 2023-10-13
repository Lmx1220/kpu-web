import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type { OptLogListItem, OptLogPageListGetResultModel, OptLogParams } from '@/api/modules/system/model/optLogModel'
import { ContentTypeEnum } from '@/enums/httpEnum'

// 前缀 变量
const prefix = '/optLog'

export function getListOptLog(params: BasicPageParams<OptLogParams>) {
  return api.post<OptLogPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailOptLog(id: string | number) {
  return api.get<OptLogListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createOptLog(data: any) {
  return api.post<OptLogListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editOptLog(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteOptLog(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export function clear(type: number) {
  return api.delete<void>({
    url: `${prefix}/clear`,
    params: { type },
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  })
}

export default {
  list: getListOptLog,
  detail: detailOptLog,
  create: createOptLog,
  edit: editOptLog,
  delete: deleteOptLog,
  clear,
}
