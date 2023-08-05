export interface Extra {
  [key: string]: any
}

export interface BasicPageParams<T extends {}> {
  current: number
  size: number
  sort?: string
  order?: string
  model: T
  extra: Extra
}

export interface BasicFetchResult<T> {
  records: T[]
  total: number
}

export interface CodeQueryVO {
  excludes?: string[]
  extend?: Partial<Option>
  extendFirst: boolean
  type: string
}

export interface DictOption {
  [key: string]: Option[]
}

export interface Option {

  label: string
  text: string
  value: string

}
