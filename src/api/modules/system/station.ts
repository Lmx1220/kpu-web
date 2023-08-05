import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  StationListItem,
  StationPageListGetResultModel,
  StationParams,
} from '@/api/modules/system/model/stationModel'

// 前缀 变量
const prefix = '/station'

export function getListStation(params: BasicPageParams<StationParams>) {
  return api.post<StationPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailStation(id: string | number) {
  return api.get<StationListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createStation(data: any) {
  return api.post<StationListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editStation(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteStation(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export default {
  list: getListStation,
  detail: detailStation,
  create: createStation,
  edit: editStation,
  delete: deleteStation,
}
