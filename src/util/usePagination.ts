import { ref } from 'vue'

interface Pagination {
  page: number
  size: number
  total: number
  sizes: number[]
  layout: string
  sort: string | null
  order: string | null
}
interface BaseParams {
  from: number
  limit: number
  sort?: string
  order?: string
}
function usePagination() {
  const pagination = ref<Pagination>({
    page: 1,
    size: 10,
    total: 0,
    sizes: [10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
    sort: null,
    order: null,
  })

  function getParams(params = {}): any {
    const baseParams: BaseParams = {
      from: (pagination.value.page - 1) * pagination.value.size,
      limit: pagination.value.size,
    }
    if (pagination.value.sort && pagination.value.order) {
      baseParams.sort = pagination.value.sort
      baseParams.order = pagination.value.order
    }
    Object.assign(baseParams, params)
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
