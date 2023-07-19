import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  ParameterListItem,
  ParameterPageListGetResultModel,
  ParameterParams,
} from '@/api/modules/system/model/parameterModel'

// 前缀 变量
const prefix = '/parameter'

export function getListRole(params: BasicPageParams<ParameterParams>) {
  return api.post<ParameterPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailRole(id: string | number) {
  return api.get<ParameterListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createRole(data: any) {
  return api.post<ParameterListItem>({
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
