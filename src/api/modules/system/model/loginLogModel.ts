import type { BasicFetchResult } from '@/api/model/baseModel'

export interface LoginLogParams {
  title?: string
  status?: string
  requestIp?: string
  username?: string
  nickName?: string
  description?: string
}

export interface LoginLogListItem {
  id: string
  browser: string
  browserVersion: string
  createdTime: string
  createdBy: number
  description: string
  location: string
  loginDate: string
  nickName: string
  operatingSystem: string
  requestIp: string
  ua: string
  userId: string
  username: string
}

/**
 * @description: Get menu return value
 */
export type LoginLogPageListGetResultModel = BasicFetchResult<LoginLogListItem>
export type LoginLogListGetResultModel = LoginLogListItem[]
