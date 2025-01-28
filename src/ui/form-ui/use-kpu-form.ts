import type {
  BaseFormComponentType,
  ExtendedFormApi,
  KpuFormProps,
} from './types'

import { useStore } from '@/utils/shared/store'

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue'

import { FormApi } from './form-api'
import KpuUseForm from './kpu-use-form.vue'

export function useKpuForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: KpuFormProps<T>) {
  const IS_REACTIVE = isReactive(options)
  const api = new FormApi(options)
  const extendedApi: ExtendedFormApi = api as never
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector)
  }

  const Form = defineComponent(
    (props: KpuFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount()
      })
      api.setState({ ...props, ...attrs })
      return () =>
        h(KpuUseForm, { ...props, ...attrs, formApi: extendedApi }, slots)
    },
    {
      inheritAttrs: false,
      name: 'KpuUseForm',
    },
  )
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema })
      },
      { immediate: true },
    )
  }

  return [Form, extendedApi] as const
}
