import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  LoginLogListItem,
  LoginLogPageListGetResultModel,
  LoginLogParams,
} from '@/api/modules/system/model/loginLogModel'
import { ContentTypeEnum } from '@/enums/httpEnum'

// 前缀 变量
const prefix = '/loginLog'

export function getListLoginLog(params: BasicPageParams<LoginLogParams>) {
  return api.post<LoginLogPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailLoginLog(id: string | number) {
  return api.get<LoginLogListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createLoginLog(data: any) {
  return api.post<LoginLogListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editLoginLog(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteLoginLog(ids: string[]) {
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
  list: getListLoginLog,
  detail: detailLoginLog,
  create: createLoginLog,
  edit: editLoginLog,
  delete: deleteLoginLog,
  clear,
}
