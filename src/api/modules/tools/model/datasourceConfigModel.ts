import type { BasicFetchResult } from '@/api/model/baseModel'

export interface DatasourceConfigParams {
  title?: string
  name?: string
  username?: string
  password?: string
  url?: string
  driverClassName?: string
}

export interface DatasourceConfigListItem {
  id: string
  name: string
  username: string
  password: string
  url: string
  driverClassName: string
}

/**
 * @description: Get menu return value
 */
export type DatasourceConfigPageListGetResultModel = BasicFetchResult<DatasourceConfigListItem>
export type DatasourceConfigListGetResultModel = DatasourceConfigListItem[]
