import type { AnyFunction } from '#/index'
import type { radioGroupProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'

export interface ApiRadioGroupProps {
  modelValue?: string | number | boolean
  defaultValue?: string | number | boolean
  numberToString?: boolean
  api: AnyFunction | string
  requestMethod?: 'get' | 'post' | 'put' | 'delete'
  params?: any
  resultField?: string
  labelField?: string
  valueField?: string
  immediate?: boolean
  isBtn?: boolean
  componentProps?: Partial<Omit<ExtractPropTypes<typeof radioGroupProps>, 'modelValue'>>
}
