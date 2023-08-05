import type { BasicFetchResult } from '@/api/model/baseModel'

export interface FileParams {
  title?: string
}

export interface FileListItem {
  id: string
  title: string
}

/**
 * @description: Get menu return value
 */
export type FilePageListGetResultModel = BasicFetchResult<FileListItem>
export type FileListGetResultModel = FileListItem[]
