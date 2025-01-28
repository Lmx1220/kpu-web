import type { FormRenderProps } from '../types'

import { createContext } from 'radix-vue'

import { computed } from 'vue'

export const [injectRenderFormProps, provideFormRenderProps]
  = createContext<FormRenderProps>('FormRenderProps')

export function useFormContext() {
  const formRenderProps = injectRenderFormProps()

  const isVertical = computed(() => formRenderProps.layout === 'vertical')

  const componentMap = computed(() => formRenderProps.componentMap)
  const componentBindEventMap = computed(
    () => formRenderProps.componentBindEventMap,
  )
  return {
    componentBindEventMap,
    componentMap,
    isVertical,
  }
}
