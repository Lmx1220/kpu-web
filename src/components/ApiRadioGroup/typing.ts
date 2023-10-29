import type { ExtractPropTypes } from 'vue'
import type { radioGroupProps } from 'element-plus'

export interface ApiRadioGroupProps {
  modelValue: string | number | boolean | undefined
  defaultValue?: string | number | boolean | undefined
  api: PromiseFn
  params?: any
  resultField?: string
  labelField?: string
  valueField?: string
  componentProps?: Partial<Omit<ExtractPropTypes<typeof radioGroupProps>, 'modelValue'>>
}
