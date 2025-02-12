import type { PageParams, PageResult } from '@/api/model/baseModel.ts'

import type { AddReq, DelReq, EditReq, InfoReq, UserPageRes } from '@fast-crud/fast-crud'
import type {
  DefDictItemPageQuery,
  DefDictItemResultVO,
  DefDictItemSaveVO,
  DefDictItemUpdateVO,
} from './model/defDictItemModel'
import { requestClient } from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const MODULAR = 'defDictItem'
const ServicePrefix = ''
export const Api = {
  Save: {
    url: `${ServicePrefix}/${MODULAR}`,
    method: RequestEnum.POST,
  },
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
}

export function page(params: PageParams<DefDictItemPageQuery>) {
  return requestClient.post<PageResult<DefDictItemResultVO>>(`${ServicePrefix}/${MODULAR}/page`, params)
}

export function save(params: DefDictItemSaveVO) {
  return requestClient.post<DefDictItemResultVO>(Api.Save.url, params)
}

export function update(params: DefDictItemUpdateVO) {
  return requestClient.post<DefDictItemResultVO>(Api.Update.url, params)
}

export function remove(ids: string[]) {
  return requestClient.delete<boolean>(`${ServicePrefix}/${MODULAR}`, {
    data: ids,
  })
}

export function get(id: string) {
  return requestClient.get<DefDictItemResultVO>(`${ServicePrefix}/${MODULAR}/${id}`)
}
export function check(key: string, dictId: string, id?: string) {
  return requestClient.get<boolean>(`${ServicePrefix}/${MODULAR}/check`, { params: { key, dictId, id } })
}

export function query(params?: DefDictItemPageQuery) {
  return requestClient.post<DefDictItemResultVO[]>(`${ServicePrefix}/${MODULAR}/query`, params)
}

export async function pageRequest(pageQuery: PageParams<DefDictItemPageQuery>): Promise<UserPageRes> {
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
