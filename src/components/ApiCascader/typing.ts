export interface ApiCascader {
  modelValue: string | number | boolean | undefined
  api: PromiseFn
  params?: any
  resultField?: string
  labelField?: string
  valueField?: string
  showSearch?: boolean
  filterOption?: (query: string, option: any) => boolean
}
