import type { PageParams, PageResult } from '@/api/model/baseModel'
import type { OptionsItem } from '@/api/modules/common/model/optionsModel'
import type {
  StandardModuleExamplePageQuery,
  StandardModuleExampleResultVO,
  StandardModuleExampleSaveVO,
  StandardModuleExampleUpdateVO,
} from './model/standardModuleExampleModel.ts'
import { requestClient } from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const MODULAR = 'standardModuleExample'
const ServicePrefix = 'mock'

export const Api: Record<string, Record<string, string>> = {
  Page: { url: `${ServicePrefix}/${MODULAR}/page`, method: RequestEnum.POST },
  Save: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.POST },
  Update: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.PUT },
  Delete: { url: `${ServicePrefix}/${MODULAR}`, method: RequestEnum.DELETE },
  Query: { url: `${ServicePrefix}/${MODULAR}/query`, method: RequestEnum.POST },
  Detail: { url: `${ServicePrefix}/${MODULAR}/detail`, method: RequestEnum.GET },
  Option: { url: `${ServicePrefix}/${MODULAR}/option`, method: RequestEnum.GET },
}

export function page(params: PageParams<StandardModuleExamplePageQuery>) {
  return requestClient.post<PageResult<StandardModuleExampleResultVO>>(Api.Page.url, params)
}
export function save(params: StandardModuleExampleSaveVO) {
  return requestClient.post<StandardModuleExampleResultVO>(Api.Save.url, params)
}
export function update(params: StandardModuleExampleUpdateVO) {
  return requestClient.post<StandardModuleExampleResultVO>(Api.Update.url, params)
}
export function remove(params: string[]) {
  return requestClient.delete<boolean>(Api.Delete.url, { data: params })
}
export function query(params: StandardModuleExamplePageQuery) {
  return requestClient.post<StandardModuleExampleResultVO[]>(Api.Query.url, params)
}
export function detail(id: string) {
  return requestClient.get<StandardModuleExampleResultVO>(Api.Delete.url, { params: { id } })
}
export function getOption() {
  return requestClient.get<OptionsItem>(Api.Option.url)
}

export default {
  page,
  save,
  update,
  remove,
  query,
  detail,
  getOption,
}
