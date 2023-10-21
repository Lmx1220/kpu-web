export interface Extra {
  [key: string]: any
}

export interface PageParams<T extends {
  [key: string]: any
}> {
  current: number
  size: number
  sort?: string
  order?: string
  model: T
  extra: Extra
}

export interface PageResult<T> {
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
