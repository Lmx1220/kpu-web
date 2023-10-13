import type { BasicFetchResult } from '@/api/model/baseModel'

export interface RoleParams {
  name?: string
  category?: string
  state?: boolean
  userId?: string
  orgId?: string
  scope?: string
  scopeType?: string
}

export interface RoleListItem {
  id: string
  name: string
  code: string
  category: string | null
  state: boolean | string | null
  remark: string | null
  createdTime: string
  updatedTime: string | null
}

export interface RoleResourceSaveVO {
  menuIdList: string[]
  roleId: string
}

export interface RoleUserSaveVO {
  flag: boolean
  userIdList: string[]
  roleId: string | number
}

/**
 * @description: Get menu return value
 */
export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>
export type RoleListGetResultModel = RoleListItem[]
