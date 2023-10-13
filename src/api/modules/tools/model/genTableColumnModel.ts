import type { BasicFetchResult } from '@/api/model/baseModel'

export interface GenTableColumnParams {
  title?: string
  dsId?: string
}

export interface GenTableColumnListItem {
  id: string
  title: string
}

/**
 * @description: Get menu return value
 */
export type GenTableColumnPageListGetResultModel = BasicFetchResult<GenTableColumnListItem>
export type GenTableColumnListGetResultModel = GenTableColumnListItem[]
