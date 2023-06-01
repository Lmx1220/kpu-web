export interface BasicPageParams {
  from: number
  limit: number
  sort?: string
  order?: string
}

export interface BasicFetchResult<T> {
  items: T[]
  total: number
}
