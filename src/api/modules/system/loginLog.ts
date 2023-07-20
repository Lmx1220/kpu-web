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

export function getListRole(params: BasicPageParams<LoginLogParams>) {
  return api.post<LoginLogPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailRole(id: string | number) {
  return api.get<LoginLogListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createRole(data: any) {
  return api.post<LoginLogListItem>({
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
  list: getListRole,
  detail: detailRole,
  create: createRole,
  edit: editRole,
  delete: deleteRole,
  clear,
}
