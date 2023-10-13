import { ref } from 'vue'
import type { BasicPageParams } from '@/api/model/baseModel'

interface Pagination {
  page: number
  size: number
  total: number
  sizes: number[]
  layout: string
  sort?: string
  order?: string
}

function usePagination() {
  const pagination = ref<Pagination>({
    page: 1,
    size: 10,
    total: 0,
    sizes: [2, 10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
  })
  const search = ref({})
  function copyObject<T extends Record<string, any>>(source: T): T {
    const target = {} as T

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const value = source[key]

        if (
          typeof value === 'string'
                    && value.trim() === ''
        ) {
          target[key as keyof T] = undefined! as T[keyof T]
        }
        // 判断是数组
        else if (Array.isArray(value)) {
          target[key as keyof T] = value.map((item: null | object) => {
            if (typeof item === 'object' && item !== null) {
              return copyObject(item)
            }
            return item
          })
        }
        else if (typeof value === 'object' && value !== null) {
          target[key as keyof T] = copyObject(value)
        }
        else {
          target[key as keyof T] = value
        }
      }
    }

    return target
  }

  interface ModelConfig {
    type: 'daterange' | 'date' | 'select' | 'input'
    name: string
    prop?: string
  }

  function getParams<T extends {
    [key: string]: any
  }>(params: T, modelConfig?: ModelConfig | ModelConfig[]): BasicPageParams<T> {
    const baseParams: BasicPageParams<T> = {
      current: toValue(pagination).page,
      size: toValue(pagination).size,
      model: { ...copyObject(toValue(params)) },
      extra: {},
    }

    if (modelConfig) {
      if (Array.isArray(modelConfig)) {
        modelConfig.forEach((item) => {
          item.prop = item.prop || item.name
          if (item.type === 'daterange') {
            if (params[item.name]) {
              if (params[item.name][0]) {
                baseParams.extra[`${item.prop}_st`] = params[item.name][0]
              }
              if (params[item.name][1]) {
                baseParams.extra[`${item.prop}_ed`] = params[item.name][1]
              }
            }
          }
          else {
            baseParams.extra[item.prop] = params[item.name]
          }

          delete baseParams.model[item.name]
        })
      }
      else {
        modelConfig.prop = modelConfig.prop || modelConfig.name

        if (modelConfig.type === 'daterange') {
          if (params[modelConfig.name]) {
            if (params[modelConfig.name][0]) {
              baseParams.extra[`${modelConfig.prop}_st`] = params[modelConfig.name][0]
            }
            if (params[modelConfig.name][1]) {
              baseParams.extra[`${modelConfig.prop}_ed`] = params[modelConfig.name][1]
            }
          }
        }
        else {
          baseParams.extra[modelConfig.prop] = params[modelConfig.name]
        }

        delete baseParams.model[modelConfig.name]
      }
    }
    if (toValue(pagination).sort && toValue(pagination).order) {
      baseParams.sort = toValue(pagination).sort
      baseParams.order = toValue(pagination).order
    }
    // 假设返回 BasicPageParams<T> 类型的结果
    return baseParams
  }

  function onSizeChange(size: number) {
    return new Promise<void>((resolve) => {
      pagination.value.size = size
      resolve()
    })
  }

  function onCurrentChange(page: number) {
    return new Promise<void>((resolve) => {
      pagination.value.page = page
      resolve()
    })
  }

  function onSortChange(prop: any, order: any) {
    return new Promise<void>((resolve) => {
      pagination.value.sort = prop
      pagination.value.order = order === 'ascending' ? 'asc' : 'desc'
      resolve()
    })
  }

  /**
     * 重置查询参数
     * @param {any} defaultSearch 默认查询参数
     */
  function resetQuery(defaultSearch: Record<string, any> = {}) {
    const queryParams: { [key: string]: any } = search.value
    Object.keys(queryParams).forEach((key) => {
      queryParams[key] = defaultSearch[key]
    })
    // this?.getDataList && this.getDataList(1)
    // this?.table.clearSort()
    // this?.table.clearFilter()
  }

  return {
    pagination,
    search,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange,
    resetQuery,
  }
}

export default usePagination
