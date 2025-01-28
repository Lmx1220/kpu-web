import type { AnyFunction } from '#/index'

export interface ApiCascader {
  modelValue: string | number | boolean | undefined
  api: AnyFunction
  params?: any
  resultField?: string
  labelField?: string
  valueField?: string
  showSearch?: boolean
  filterOption?: (query: string, option: any) => boolean
}
