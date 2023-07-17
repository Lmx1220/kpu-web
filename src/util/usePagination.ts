import { ref } from 'vue'
import type { BasicPageParams } from '@/api/model/baseModel'

interface Pagination {
  page: number
  size: number
  total: number
  sizes: number[]
  layout: string
  sort: string | null
  order: string | null
}

function usePagination() {
  const pagination = ref<Pagination>({
    page: 1,
    size: 10,
    total: 0,
    sizes: [2, 10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
    sort: null,
    order: null,
  })

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

  function getParams<T extends object>(params: T = {} as T): BasicPageParams<T> {
    const baseParams: BasicPageParams<T> = {
      current: pagination.value.page,
      size: pagination.value.size,
      model: { ...copyObject<T>(params) }, // 使用展开语法将 params 对象合并到 baseParams 中
      extra: {},
    }

    if (pagination.value.sort && pagination.value.order) {
      baseParams.sort = pagination.value.sort
      baseParams.order = pagination.value.order
    }
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
      // eslint-disable-next-line no-console
      console.log(order)
      pagination.value.sort = prop
      pagination.value.order = order === 'ascending' ? 'asc' : 'desc'
      resolve()
    })
  }

  return {
    pagination,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange,
  }
}

export default usePagination
