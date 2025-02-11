import type { OptionsItem } from '@/api/modules/common/model/optionsModel.ts'
import { findCodeListByType } from '@/api/modules/common/general.ts'

const useAppDictStore = defineStore(
  // 唯一ID
  'appDict',
  () => {
    const cache = ref<Recordable<OptionsItem[]>>({})
    const selectDataCache = ref<Recordable<OptionsItem[]>>({})
    async function requestData(type?: string) {
      if (type) {
        // 如果缓存中有数据，直接返回
        let cacheData = cache.value[type]
        if (cacheData) {
          let attempts = 1000

          // 尝试获取缓存数据，最多尝试 1000 次
          while (attempts > 0) {
            cacheData = cache.value[type]
            if (cacheData.length > 0) {
              return cacheData // 如果缓存数据有效，直接返回
            }
            attempts--
            if (attempts <= 0) {
              return cacheData // 超过最大尝试次数，返回缓存数据（即使为空）
            }
            await new Promise(resolve => setTimeout(resolve, 100)) // 延时 100ms 再次检查
          }
        }

        // 如果缓存中没有数据，初始化为空数组并发起请求
        cache.value[type] = []
        try {
          const response = await findCodeListByType([{
            type,
            extendFirst: true,
          }])

          const data = response[type]
          if (data.length > 0) {
            cache.value[type] = data // 如果请求返回数据，缓存它
          }
          else {
            delete cache.value[type] // 如果没有数据，删除缓存
          }

          return data // 返回数据
        }
        catch (error) {
          delete cache.value[type] // 请求失败时，删除缓存
          throw error // 抛出异常
        }
      }

      // 如果没有传入 e 参数，直接返回空数组
      return []
    }

    async function select(e: any, t: string, n: string) {
      const cacheKey = n + JSON.stringify(t).toString()
      const cachedData = selectDataCache.value[cacheKey]

      // 如果缓存中已有数据，直接返回
      if (cachedData) {
        return cachedData
      }

      // 如果没有缓存数据，初始化为空数组
      selectDataCache.value[cacheKey] = []

      try {
        const data = await e(t)
        if (data.length > 0) {
          selectDataCache.value[cacheKey] = data // 如果请求返回数据，缓存它
        }
        else {
          delete selectDataCache.value[cacheKey] // 如果没有数据，删除缓存
        }

        return data // 返回数据
      }
      catch (error) {
        delete selectDataCache.value[cacheKey] // 请求失败时，删除缓存
        throw error // 抛出异常
      }
    }
    function getDictData(type?: string) {
      return cache.value[type!] || []
    }
    function getSelectData(t: string, n: string) {
      const r = t + JSON.stringify(n).toString()
      return selectDataCache.value[r] || []
    }
    return {
      requestData,
      select,
      getDictData,
      getSelectData,
    }
  },
)
export default useAppDictStore
