import type { ElSelect } from 'element-plus'

export interface ApiSelectProps {
  api: PromiseFn
  params?: any
  defaultValue?: string | number | boolean | undefined
  resultField?: string
  labelField?: string
  valueField?: string
  showSearch?: boolean
  numberToString?: boolean
  afterFetch?: Fn | null
  allData?: boolean
  filterOption?: (query: string, option: any) => boolean
  componentProps?: Omit<InstanceType<typeof ElSelect>['$props'], 'modelValue'>
}
