import type { AxiosProgressEvent } from 'axios'
import type { UploadApiResult } from './model/uploadModel'
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
      url: '/file/upload',
      onUploadProgress,
    },
    params,
  )
}
