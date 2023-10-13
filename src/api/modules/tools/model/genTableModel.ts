import type { BasicFetchResult } from '@/api/model/baseModel'

export interface GenTableParams {
  title?: string
  dsId?: string
  tableId?: string | string[]
}

export interface GenTableListItem {
  id: string
  title: string
}

/**
 * @description: Get menu return value
 */
export type GenTablePageListGetResultModel = BasicFetchResult<GenTableListItem>
export type GenTableListGetResultModel = GenTableListItem[]
