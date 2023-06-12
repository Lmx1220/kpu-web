export interface BasicPageParams {
  page: number
  size: number
  sort?: string
  order?: string
}

export interface BasicFetchResult<T> {
  rows: T[]
  total: number
}
