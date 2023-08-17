type APIMap = Map<string, { isOk: boolean; data: any; endTime?: number }>
interface TempParam {
  param: any
  resolve: (data: any) => void
  reject: (error: any) => void
}

class TimeDelayReq {
  /**
   * 定时器id
   */
  private timeoutId: NodeJS.Timeout | null
  /**
   * 临时参数
   */
  private tempParam: TempParam[]
  /**
   * 结果集
   */
  private resMap: Map<string, { isOk: boolean; data: any; endTime?: number }>
  /**
   * 缓存时间
   */
  private cacheTime: number
  /**
   * 延迟时间
   */
  private delay: number
  /**
   * 是否使用缓存
   */
  private isUseCache: boolean
  /**
   * 缓存key 方法
   */
  private cacheKey: (param: any) => string
  /**
   * api 方法
   */
  private api: (params: any[], cacheKey: (param: any) => string) => Promise<APIMap>
  /**
   * 获取错误数据
   */
  private getErrorData?: (param: any, error: any, reject: (error: any) => void) => any

  constructor({
    cacheKey,
    api,
    getErrorData,
    cacheTime,
    delay,
    isUseCache,
  }: {
    cacheKey?: (param: any) => string
    api: (params: any[], cacheKey: (param: any) => string) => Promise<APIMap>
    getErrorData?: (param: any, error: any, reject: (error: any) => void) => any
    cacheTime?: number
    delay?: number
    isUseCache?: boolean
  }) {
    this.timeoutId = null
    this.tempParam = []
    this.resMap = new Map()
    this.cacheTime = cacheTime || 60 * 1000 * 30
    this.delay = delay || 100
    this.isUseCache = isUseCache || false
    this.cacheKey = cacheKey || JSON.stringify
    this.api = api
    this.getErrorData = getErrorData
  }

  /**
   * 清除缓存
   */
  clear() {
    this.resMap.clear()
  }

  /**
   * 清除超时缓存
   */
  clearTimeoutCache() {
    const currentTime = new Date().getTime()
    for (const [key, value] of this.resMap.entries()) {
      if (value.endTime && value.endTime < currentTime) {
        this.resMap.delete(key)
      }
    }
  }

  /**
   * 从缓存中加载数据
   * @param param 参数
   * @private
   */
  private loadFromCache(param: any) {
    const key = this.cacheKey(param)
    this.clearTimeoutCache()
    const cacheData = this.resMap.get(key)
    return cacheData ? cacheData.data : null
  }

  /**
   * 加载数据
   * @param param 参数
   */
  async loadByParam(param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isUseCache) {
        try {
          const cachedData = this.loadFromCache(param)
          if (cachedData) {
            resolve(cachedData)
            return
          }
        }
        catch (e) {
        }
      }
      this.loadFromApi(param, resolve, reject)
    })
  }

  /**
   * 从api加载数据
   * @param param 参数
   * @param resolve
   * @param reject
   */
  private loadFromApi(param: any, resolve: (data: any) => void, reject: (error: any) => void) {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
    }
    this.tempParam.push({
      param,
      resolve,
      reject,
    })
    this.timeoutId = setTimeout(() => {
      const params = this.tempParam
      this.tempParam = []
      this.loadByParams(params)
    }, this.delay)
  }

  /**
   * 从api加载数据
   * @param params 参数
   */
  private async loadByParams(params: TempParam[]) {
    const paramMap = new Map<string, TempParam>()
    const apiParams = params.map(({ param }) => param)
    try {
      const apiResult = await this.api(apiParams, this.cacheKey)
      const cacheEndTime = new Date().getTime() + this.cacheTime
      const cachedMap: APIMap = new Map()
      params.forEach(({ param, resolve, reject }) => {
        const key = this.cacheKey(param)
        const apiData = apiResult.get(key)
        if (apiData) {
          if (apiData.isOk) {
            apiData.endTime = cacheEndTime
            cachedMap.set(key, apiData)
            resolve(apiData.data)
          }
          else {
            resolve(apiData.data)
            apiResult.delete(key)
          }
        }
        else {
          paramMap.set(key, {
            param,
            resolve,
            reject,
          })
        }
      })

      for (const key of cachedMap.keys()) {
        const cachedData = apiResult.get(key)
        if (cachedData) {
          this.resMap.set(key, cachedData)
        }
      }

      this.doError(paramMap, Error('请求无结果'))
    }
    catch (error) {
      this.doError(paramMap, error)
    }
  }

  /**
   * 处理错误
   * @param params 参数 Map
   * @param error 错误
   * @private
   */
  private doError(params: Map<string, TempParam>, error: any) {
    if (this.getErrorData) {
      for (const key of params.keys()) {
        const {
          param,
          reject,
        } = params.get(key)
        const data = this.getErrorData(param, error, reject)
        if (data) {
          data.resolve(data)
        }
      }
    }
    else {
      for (const key of params.keys()) {
        params.get(key).reject(error)
      }
    }
  }
}

export default TimeDelayReq
