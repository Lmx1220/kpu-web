import type { BasicFetchResult } from '@/api/model/baseModel'

export interface DictItemParams {
  parentId: string
  classify: string
  key: string
  name: string
  remark: string
  state?: boolean
}

export interface DictItemListItem {
  id: string
  parentId: string
  classify: string
  key: string
  name: string
  remark: string
  icon?: string
  cssStyle?: string
  cssClass?: string
  sortValue?: number
  state?: true
  echoMap?: { [key: string]: string }
}

/**
 * @description: Get menu return value
 */
export type DictItemPageListGetResultModel = BasicFetchResult<DictItemListItem>
export type DictItemListGetResultModel = DictItemListItem[]
