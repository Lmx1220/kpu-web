import type { UploadFileParams } from '#/axios'
import type { AsyncResult, CacheKeyFunc, DelayResult } from '@/api/helper/timeDelayReq'
import type { RequestClientConfig } from '@/utils/request-client'
import type { AxiosResponse } from 'axios'
import type { AppendixQuery, AppendixResultVO, FileResultVO } from './model/fileModel'
import { requestClient } from '@/api'
import { TimeDelayReq } from '@/api/helper/timeDelayReq'
import { ContentTypeEnum } from '@/enums/httpEnum.ts'
import { defaultBase64Img } from '@/utils/file/base64Conver.ts'
import qs from 'qs'

const MODULAR = ''
const ServicePrefix = ''

/**
 * @description: Upload interface
 */
export function uploadFile(
  params: UploadFileParams,
  config: RequestClientConfig,
) {
  return requestClient.upload<FileResultVO>(
    `${ServicePrefix}/anyone/file/upload`,
    params,
    config,
  )
}
export function downloadIds(ids: string[] | number[]) {
  return requestClient.download<AxiosResponse<Blob>>(`${ServicePrefix}/${MODULAR}/download`, {
    params: qs.stringify({
      ids,
    }, {
      arrayFormat: 'repeat',
    }),
  })
}

/**
 * 根据文件id获取文件url
 *
 * @param params 文件id
 * @returns 文件url
 */
export function findUrlById(params: string[] | number[]) {
  return requestClient.post<string[]>(`${ServicePrefix}/anyone/file/findUrlById`, params)
}
/**
 * 根据业务id和业务类型，查询附件
 *
 * @param params 附件参数
 * @returns 附件列表
 */
export function listByBizId(params: AppendixQuery) {
  return requestClient.post<AppendixResultVO[]>(`${ServicePrefix}/anyone/appendix/listByBizId`, params, {
    headers: {
      'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    },
  })
}

function buildResult(paramList: Array<any>, cacheKey: CacheKeyFunc, result: string[]) {
  const resultMap: Map<string, DelayResult> = new Map<string, DelayResult>()

  paramList.forEach((param) => {
    const key = cacheKey(param)
    const url = result[param]
    resultMap.set(key, {
      key,
      isOk: !!url,
      data: {
        code: 0,
        data: url ?? defaultBase64Img,
      },
    })
  })
  return resultMap
}

const findUrlByIdReq = new TimeDelayReq({
  cacheKey: (param: Recordable) => `${param}`,
  // 实现批量请求
  async api(paramList, cacheKey) {
    const result = await findUrlById(paramList)
    return buildResult(paramList, cacheKey, result)
  },
})

/**
 * 异步批量查询文件
 *
 * @param id 文件id
 * @returns 访问路径
 */
export async function asyncFindUrlById(id: string): Promise<AsyncResult> {
  return findUrlByIdReq.loadByParam(id)
}
