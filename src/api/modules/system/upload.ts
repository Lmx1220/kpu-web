import type { UploadFileParams } from '#/axios'
import type { AxiosProgressEvent, AxiosResponse } from 'axios'
import type { FileResultVO } from './model/fileModel'
import { requestClient } from '@/api'
import { TimeDelayReq } from '@/api/helper/timeDelayReq'
import qs from 'qs'

const MODULAR = 'file'
const ServicePrefix = ''

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return requestClient.upload<FileResultVO>(
    `/proxy${ServicePrefix}/${MODULAR}/anyone/upload`,
    params,
    {
      onUploadProgress,
      timeout: 60 * 1000,
    },
  )
}
export function downloadIds(ids: string[]) {
  return requestClient.download<AxiosResponse<Blob>>(`${ServicePrefix}/${MODULAR}/download`, {
    params: qs.stringify({
      ids,
    }, {
      arrayFormat: 'repeat',
    }),
  })
}

export function findUrlById(data: string[]) {
  return requestClient.post<Record<string, string>>(`${ServicePrefix}/${MODULAR}/anyone/findUrlById`, data)
}
function formatData(params: string[], cacheKey: (param: any) => string, data: { [key: string]: string }) {
  const map = new Map<string, { key: string, isOk: boolean, data: any }>()
  params.forEach((param) => {
    const key = cacheKey(param)
    const value = data[param]
    map.set(key, {
      key,
      isOk: !!value,
      data: {
        code: 0,
        data: value != null ? value : null,
      },
    })
  })
  return map
}
const timeDelayReq = new TimeDelayReq({
  cacheKey: (param: any) => param,
  api: async (params: any[], cacheKey: (param: any) => string) => {
    const data = await findUrlById(params)
    return formatData(params, cacheKey, data)
  },
})
export function timeDelayReqFindUrlById(param: string) {
  return timeDelayReq.loadByParam(param)
}
