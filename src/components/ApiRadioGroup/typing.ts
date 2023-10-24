export interface ApiRadioGroupProps {
  modelValue: string | number | boolean | undefined
  api: PromiseFn
  params?: any
  resultField?: string
  labelField?: string
  valueField?: string
}
