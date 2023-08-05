import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  ParameterListItem,
  ParameterPageListGetResultModel,
  ParameterParams,
} from '@/api/modules/system/model/parameterModel'

// 前缀 变量
const prefix = '/parameter'

export function getListParameter(params: BasicPageParams<ParameterParams>) {
  return api.post<ParameterPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailParameter(id: string | number) {
  return api.get<ParameterListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createParameter(data: any) {
  return api.post<ParameterListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editParameter(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteParameter(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export default {
  list: getListParameter,
  detail: detailParameter,
  create: createParameter,
  edit: editParameter,
  delete: deleteParameter,
}
