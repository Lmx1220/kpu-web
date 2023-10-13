import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type {
  DatasourceConfigListItem,
  DatasourceConfigPageListGetResultModel,
  DatasourceConfigParams,
} from '@/api/modules/tools/model/datasourceConfigModel'
import { ContentTypeEnum } from '@/enums/httpEnum'

// 前缀 变量
const prefix = '/datasourceConfig'

export function getListDatasourceConfig(params: BasicPageParams<any> & DatasourceConfigParams) {
  return api.post<DatasourceConfigPageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function getListDatasourceConfigQuery(params: DatasourceConfigParams) {
  return api.post<DatasourceConfigPageListGetResultModel>({
    url: `${prefix}/query`,
    params,
  })
}

export function detailDatasourceConfig(id: string | number) {
  return api.get<DatasourceConfigListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createDatasourceConfig(data: any) {
  return api.post<DatasourceConfigListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editDatasourceConfig(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteDatasourceConfig(ids: string[]) {
  return api.post<void>({
    url: `${prefix}/delete`,
    data: {
      ids,
    },
  })
}

export function testConnect(id: string) {
  return api.post({
    url: `${prefix}/testConnect`,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
    params: { id },
  })
}
export default {
  list: getListDatasourceConfig,
  detail: detailDatasourceConfig,
  create: createDatasourceConfig,
  edit: editDatasourceConfig,
  delete: deleteDatasourceConfig,
}
