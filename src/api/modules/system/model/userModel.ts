import type { BasicFetchResult } from '@/api/model/baseModel'

export interface UserParams {
  username?: string
  mobile?: string
  nickName?: string
  scope?: string
  roleId?: string | number
}

export interface UserListItem {
  username: string
  avatar: string
  createTime: string
  createdBy: number
  createdOrgId: number
  echoMap: string
  education: string
  email: string
  id: string
  lastLoginTime: string
  mobile: string
  nickName: string
  nation: string
  orgId: number
  passwordErrorLastTime: string
  passwordErrorNum: number
  passwordExpireTime: string
  positionStatus: string
  readonly: boolean
  salt: string
  sex: string
  state: boolean
  stationId: number
  updateTime: string
  updatedBy: number
  workDescribe: string
}

export interface UserRoleSaveVO {
  flag: boolean
  roleIdList: string[]
  userId: string | number
}

/**
 * @description: Get menu return value
 */
export type UserPageListGetResultModel = BasicFetchResult<UserListItem>
export type UserListGetResultModel = UserListItem[]
