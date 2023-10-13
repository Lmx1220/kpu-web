import type { BasicFetchResult } from '@/api/model/baseModel'

export interface ParameterParams {
  key?: string
  name?: string
  value?: string
  state?: boolean
}

export interface ParameterListItem {
  id: string
  createdTime: string
  createdBy: number
  key: string
  name: string
  readonly: boolean
  remarks: string
  state: boolean
  updatedTime: string
  updatedBy: number
  value: string
}

/**
 * @description: Get menu return value
 */
export type ParameterPageListGetResultModel = BasicFetchResult<ParameterListItem>
export type ParameterListGetResultModel = ParameterListItem[]
