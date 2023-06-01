import type { BasicFetchResult } from '@/api/model/baseModel'

export interface RoleParams {
  name?: string
  permission?: string
}

export interface RoleListItem {
  id: string
  name: string
  permission: string
  dataScope: string | null
  level: string | null
  remark: string | null
  createTime: string
  updateTime: string | null
}

/**
 * @description: Get menu return value
 */
export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>
export type RoleListGetResultModel = RoleListItem[]
