import type { BasicFetchResult } from '@/api/model/baseModel'

export interface OptLogParams {
  status?: string
  description?: string
  nickName?: string
  classPath?: string
  requestUri?: string
  requestIp?: string
  daterange?: [] | null
}

export interface OptLogListItem {
  id: string
  actionMethod: string
  classPath: string
  consumingTime: number
  createTime: string
  createdBy: number
  description: string
  finishTime: string
  httpMethod: string
  nickName: string
  requestIp: string
  requestUri: string
  startTime: string
  type: string
  ua: string
}

/**
 * @description: Get menu return value
 */
export type OptLogPageListGetResultModel = BasicFetchResult<OptLogListItem>
export type OptLogListGetResultModel = OptLogListItem[]
