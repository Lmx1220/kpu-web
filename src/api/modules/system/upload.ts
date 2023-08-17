import type { AxiosProgressEvent } from 'axios'
import qs from 'qs'
import type { UploadApiResult } from './model/uploadModel'
import TimeDelayReq from '@/api/helper/timeDelayReq'
import type { UploadFileParams } from '#/axios'
import api from '@/api'

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return api.uploadFile<UploadApiResult>(
    {
      url: '/proxy/file/anyone/upload',
      onUploadProgress,
    },
    params,
  )
}
export function downloadIds(ids: string[]) {
  return api.get({
    url: '/file/download',
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
  return api.post({
    url: '/file/anyone/findUrlById',
    data,
  })
}
function formatData(params: string[], cacheKey: (param: any) => string, data: { [key: string]: string }) {
  const map = new Map<string, { key: string;isOk: boolean; data: any }>()
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
