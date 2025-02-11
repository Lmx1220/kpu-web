import type { AsyncResult, DelayResult } from '@/api/helper/timeDelayReq.ts'
import type { CodeQueryVO, OptionsGetResultModel, OptionsItem, SystemApiVO } from '@/api/modules/common/model/optionsModel.ts'
import { requestClient } from '@/api'
import { TimeDelayReq } from '@/api/helper/timeDelayReq.ts'
import { RequestEnum } from '@/enums/httpEnum'
import { isString } from '@/utils/is.ts'

const ServicePrefix = ''
export const Api = {

  SystemApiScan: (_serviceProfix: string) => {
    return {
      url: `/anyone/systemApiScan`,
      method: RequestEnum.GET,
    }
  },
  FindEnumListByType: {
    url: `${ServicePrefix}/anyTenant/enums/findEnumListByType`,
    method: RequestEnum.POST,
  },
  FindCodeListByType: {
    url: `${ServicePrefix}/anyUser/dict/findDictMapItemListByKey`,
    method: RequestEnum.POST,
  },
  Params: {
    url: `${ServicePrefix}/anyUser/parameter/value`,
    method: RequestEnum.GET,
  },
}

export function findSystemApi(serviceProfix: string) {
  return requestClient.get<Map<string, SystemApiVO[]>>(Api.SystemApiScan(serviceProfix).url)
}

/**
 * @description: Get 蜜桔
 */
export function findEnumListByType(params: CodeQueryVO[] = []) {
  return requestClient.post<OptionsGetResultModel>(Api.FindEnumListByType.url, params)
}

/**
 * @description: Get 字典
 */
export function findCodeListByType(params: CodeQueryVO[] = []) {
  return requestClient.post<Recordable<OptionsItem[]>>(Api.FindCodeListByType.url, params)
}
export function findParams(params: string[] | string = []) {
  if (isString(params)) {
    params = [params]
  }
  return requestClient.get<string>(Api.Params.url, {
    params,
  })
}

const codeTimeDelayReq = new TimeDelayReq({
  cacheKey: param => `${param?.type}`,
  getErrorData(_param, error, _reject) {
    return {
      code: 400,
      msg: error.message || '请求错误',
      data: [],
    }
  },
  // 实现批量请求
  async api(paramList: any[], cacheKey) {
    const data = await findCodeListByType(paramList)
    const resultMap: Map<string, DelayResult> = new Map<string, DelayResult>()
    paramList.forEach((param) => {
      const key = cacheKey(param)
      const dictList = data[param?.type as keyof OptionsGetResultModel]
      if (dictList) {
        resultMap.set(key, {
          key,
          isOk: true,
          data: {
            code: 0,
            data: dictList,
          },
        })
      }
    })
    return resultMap
  },
})

export async function asyncFindDictList(param: Recordable): Promise<AsyncResult> {
  return codeTimeDelayReq.loadByParam(param)
}

const enumTimeDelayReq = new TimeDelayReq({
  cacheKey: (param: any) => `${param?.type}`,
  getErrorData(_param: any, error, _reject) {
    return {
      code: 400,
      msg: error?.message || '请求错误',
      data: [],
    }
  },
  // 实现批量请求
  async api(paramList: any[], cacheKey) {
    const data = await findEnumListByType(paramList)
    const resultMap: Map<string, DelayResult> = new Map<string, DelayResult>()
    paramList.forEach((param: any) => {
      const key = cacheKey(param)
      const enumList = data[param?.type as keyof OptionsGetResultModel]
      if (enumList) {
        resultMap.set(key, {
          key,
          isOk: true,
          data: {
            code: 0,
            data: enumList,
          },
        })
      }
    })
    return resultMap
  },
})

export async function asyncFindEnumList(code: Recordable): Promise<AsyncResult> {
  return await enumTimeDelayReq.loadByParam(code)
}
