import api from '@/api'
import { TimeDelayReq } from '@/api/helper/timeDelayReq'
import type { CodeQueryVO, DictOption } from '@/api/model/baseModel'

export function findDictMapItemListByKey(data: CodeQueryVO[]) {
  return api.post<DictOption>({
    url: '/dict/findDictMapItemListByKey',
    data,
  })
}

export function findEnumListByType(data: CodeQueryVO[]) {
  return api.post<DictOption>({
    url: '/enums/findEnumListByType',
    data,
  })
}

const timeDelayReq = new TimeDelayReq({
  cacheKey: (param: CodeQueryVO) => param.type,
  getErrorData(param: any, error: any) {
    return {
      code: 400,
      msg: error?.message || '请求错误',
      data: [],
    }
  },
  api: async (params: CodeQueryVO[], cacheKey: (param: CodeQueryVO) => string) => {
    const data = await findEnumListByType(params)
    const map = new Map()
    params.forEach((param) => {
      const key = cacheKey(param)
      const value = data[param.type]
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
  },
})
const timeDelayReqDictMap = new TimeDelayReq({
  cacheKey: (param: CodeQueryVO) => param.type,
  getErrorData(param: any, error: any) {
    return {
      code: 400,
      msg: error?.message || '请求错误',
      data: [],
    }
  },
  api: async (params: CodeQueryVO[], cacheKey: (param: CodeQueryVO) => string) => {
    const data = await findDictMapItemListByKey(params)
    const map = new Map()
    params.forEach((param) => {
      const key = cacheKey(param)
      const value = data[param.type]
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
  },
})
export function timeDelayReqFindEnumListByType(param: CodeQueryVO) {
  return timeDelayReq.loadByParam(param)
}
export function timeDelayReqFindDictMapItemListByKey(param: CodeQueryVO) {
  return timeDelayReqDictMap.loadByParam(param)
}
