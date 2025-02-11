import type { AnyFunction } from '#/index'
import type { ElSelect } from 'element-plus'

export interface ApiSelectProps {
  api: AnyFunction
  params?: any
  modelValue?: string | number | boolean
  defaultValue?: string | number | boolean | undefined
  resultField?: string
  labelField?: string
  valueField?: string
  showSearch?: boolean
  numberToString?: boolean
  afterFetch?: AnyFunction | null
  allData?: boolean
  filterOption?: (query: string, option: any) => boolean
  componentProps?: Omit<InstanceType<typeof ElSelect>['$props'], 'modelValue'>
}
