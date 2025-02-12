import type { PageParams, PageResult } from '@/api/model/baseModel.ts'

import type { AddReq, DelReq, EditReq, InfoReq, UserPageRes } from '@fast-crud/fast-crud'
import type {
  DatasourceConfig,
  DatasourceConfigPageQuery,
  DatasourceConfigResult,
  DatasourceConfigSaveDTO,
  DatasourceConfigUpdateDTO,
} from './model/datasourceConfigModel'
import { requestClient } from '@/api'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'

const MODULAR = 'defDatasourceConfig'
const ServicePrefix = ''
export const Api = {
  Save: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.POST,
  },
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
}

export function page(params: PageParams<DatasourceConfigPageQuery>) {
  return requestClient.post<PageResult<DatasourceConfigResult>>(`${ServicePrefix}/${MODULAR}/page`, params)
}

export function save(params: DatasourceConfigSaveDTO) {
  return requestClient.post<DatasourceConfig>(Api.Save.url, params)
}

export function update(params: DatasourceConfigUpdateDTO) {
  return requestClient.post<DatasourceConfig>(Api.Update.url, params)
}

export function remove(ids: string[]) {
  return requestClient.delete<boolean>(`${ServicePrefix}/${MODULAR}`, {
    data: ids,
  })
}

export function testConnect(id: string) {
  return requestClient.post<boolean>(`${ServicePrefix}/${MODULAR}/testConnect`, { id }, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  })
}

export function query(params?: DatasourceConfig) {
  return requestClient.post<DatasourceConfig[]>(`${ServicePrefix}/${MODULAR}/query`, params)
}

export async function pageRequest(pageQuery: PageParams<DatasourceConfigPageQuery>): Promise<UserPageRes> {
  return await page(pageQuery)
}

export async function infoRequest(ctx: InfoReq): Promise<UserPageRes> {
  const { row } = ctx

  // 请求后台查询数据
  return row
}

export async function addRequest(req: AddReq) {
  const { form } = req
  return await save(form)
}

export async function editRequest(ctx: EditReq) {
  const { form } = ctx
  return await update(form)
}

export async function delRequest(ctx: DelReq) {
  const { row } = ctx
  return await remove([row.id])
}

export async function removeFn(ids: string[]) {
  return await remove(ids)
}
