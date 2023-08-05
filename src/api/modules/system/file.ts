import api from '@/api'
import type { BasicPageParams } from '@/api/model/baseModel'
import type { FileListItem, FilePageListGetResultModel, FileParams } from '@/api/modules/system/model/fileModel'

// 前缀 变量
const prefix = '/file'

export function getListFile(params: BasicPageParams<FileParams>) {
  return api.post<FilePageListGetResultModel>({
    url: `${prefix}/page`,
    params,
  })
}

export function detailFile(id: string | number) {
  return api.get<FileListItem>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  })
}

export function createFile(data: any) {
  return api.post<FileListItem>({
    url: `${prefix}`,
    data,
  })
}

export function editFile(data: any) {
  return api.put<void>({
    url: `${prefix}`,
    data,
  })
}

export function deleteFile(ids: string[]) {
  return api.delete<void>({
    url: `${prefix}`,
    data: ids,
  })
}

export default {
  list: getListFile,
  detail: detailFile,
  create: createFile,
  edit: editFile,
  delete: deleteFile,
}
