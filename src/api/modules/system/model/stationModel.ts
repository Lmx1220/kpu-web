import type { BasicFetchResult } from '@/api/model/baseModel'

export interface StationParams {
  name?: string
  orgIdList?: string[]
}

export interface StationListItem {
  id: string
  title: string
}

/**
 * @description: Get menu return value
 */
export type StationPageListGetResultModel = BasicFetchResult<StationListItem>
export type StationListGetResultModel = StationListItem[]
