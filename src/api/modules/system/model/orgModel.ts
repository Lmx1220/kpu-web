import type { BasicFetchResult } from '@/api/model/baseModel'

export interface OrgParams {
  title?: string
}

export interface OrgListItem {
  id: string
  title: string
}

/**
 * @description: Get menu return value
 */
export type OrgPageListGetResultModel = BasicFetchResult<OrgListItem>
export type OrgListGetResultModel = OrgListItem[]
