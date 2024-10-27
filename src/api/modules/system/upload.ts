import type { UploadFileParams } from '#/axios'
import type { AxiosProgressEvent } from 'axios'
import type { FileResultVO } from './model/fileModel'
import defHttp from '@/api'
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
  return defHttp.uploadFile<FileResultVO>(
    {
      url: `/proxy${ServicePrefix}/${MODULAR}/anyone/upload`,
      onUploadProgress,
      timeout: 60 * 1000,
    },
    params,
  )
}
export function downloadIds(ids: string[]) {
  return defHttp.get({
    url: `${ServicePrefix}/${MODULAR}/download`,
    responseType: 'blob',
    params: qs.stringify({
      ids,
    }, {
      arrayFormat: 'repeat',
    }),
  }, {
    isReturnNativeResponse: true,
  })
}

export function findUrlById(data: string[]) {
  return defHttp.post<Record<string, string>>({
    url: `${ServicePrefix}/${MODULAR}/anyone/findUrlById`,
    data,
  })
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
