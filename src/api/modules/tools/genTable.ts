import qs from 'qs'
import type {
  GenTableListGetResultModel,
  GenTableListItem,
  GenTablePageListGetResultModel,
  GenTableParams,
} from '@/api/modules/tools/model/genTableModel'
import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import { ContentTypeEnum } from '@/enums/httpEnum'

// 前缀 变量
const prefix = '/genTable'

export function getListGenTable(params: BasicPageParams<GenTableParams>) {
  return api.post<GenTablePageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function getQueryListGenTable(params?: GenTableParams) {
  return api.post<GenTablePageListGetResultModel>({
    url: `${prefix}/query`,
    params,
  })
}

export function selectTableList(params: GenTableParams) {
  return api.post<GenTableListGetResultModel>({
    url: `${prefix}/selectTableList`,
    params,
  })
}

export function findTableList(params: string[]) {
  return api.post<GenTablePageListGetResultModel>({
    url: `${prefix}/findTableList`,
    params,
  })
}

export function previewCode(params: {
  id: string
  template: 'WEB_PLUS' | 'BACKEND'
}) {
  return api.post<GenTablePageListGetResultModel>({
    url: `${prefix}/previewCode`,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    params,
  })
}

export function detailGenTable(id: string | number) {
  return api.get<GenTableListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function getDefFileOverrideStrategy() {
  return api.get({
    url: `${prefix}/getDefFileOverrideStrategy`,
  })
}

export function getFieldTemplate() {
  return api.get({
    url: `${prefix}/getFieldTemplate`,
  })
}

export function downloadZip(ids: string | string[], template: 'WEB_PLUS' | 'BACKEND') {
  return api.get({
    responseType: 'blob',
    url: `${prefix}/downloadZip`,
    params: qs.stringify({
      ids,
      template,
    },
    {
      arrayFormat: 'repeat',
    }),
  }, {
    isReturnNativeResponse: true,
  })
}

export function generatorCode(data: {
  ids: string[]
  template: 'WEB_PLUS' | 'BACKEND'
  fileOverrideConfig?: {
    [key: string]: string
  }
}) {
  return api.post<Boolean>({
    url: `${prefix}/generatorCode`,
    params: data,
  })
}

export function createGenTable(data: any) {
  return api.post<GenTableListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editGenTable(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteGenTable(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export function importCheck(tableNames: string[]) {
  return api.post<Boolean>({
    url: `${prefix}/importCheck`,
    params: tableNames,
  }, {
    errorMessageMode: 'none',
  })
}

export function importTable(params: {
  dsId: string
  tableNames: string[]
}) {
  return api.post<Boolean>({
    url: `${prefix}/importTable`,
    params,
  })
}

export function syncFieldGenTable(id: string) {
  return api.request<void>({
    url: `${prefix}/syncField`,
    params: { id },
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  },
  )
}

export default {
  list: getListGenTable,
  query: getQueryListGenTable,
  detail: detailGenTable,
  create: createGenTable,
  edit: editGenTable,
  delete: deleteGenTable,
  syncField: syncFieldGenTable,
}
