import type { BasicFetchResult } from '@/api/model/baseModel'

export interface DictParams {
  classify: string
  key: string
  name: string
  remark: string
  state?: boolean
}

export interface DictListItem {
  id: string
  classify?: string
  key: string
  name: string
  remark: string
  state: boolean
  echoMap?: { [key: string]: string }
}

/**
 * @description: Get menu return value
 */
export type DictPageListGetResultModel = BasicFetchResult<DictListItem>
export type DictListGetResultModel = DictListItem[]
