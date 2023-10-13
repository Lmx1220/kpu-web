import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  GenTableColumnListItem,
  GenTableColumnPageListGetResultModel,
  GenTableColumnParams,
} from '@/api/modules/tools/model/genTableColumnModel'

// 前缀 变量
const prefix = '/genTableColumn'

export function getListGenTableColumn(params: BasicPageParams<GenTableColumnParams>) {
  return api.post<GenTableColumnPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailGenTableColumn(id: string | number) {
  return api.get<GenTableColumnListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createGenTableColumn(data: any) {
  return api.post<GenTableColumnListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editGenTableColumn(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteGenTableColumn(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export function syncFieldGenTableColumn(data: {
  tableId: string
  id: string
}) {
  return api.request<void>({
    url: `${prefix}/syncField`,
    params: data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  },
  )
}

export default {
  list: getListGenTableColumn,
  detail: detailGenTableColumn,
  create: createGenTableColumn,
  edit: editGenTableColumn,
  delete: deleteGenTableColumn,
  syncField: syncFieldGenTableColumn,
}
