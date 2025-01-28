import type { Component } from 'vue'

import type {
  BaseFormComponentType,
  FormCommonConfig,
  KpuFormAdapterOptions,
} from './types'

import KpuButton from '@/ui/components/KpuButton/index.vue'

import KpuCheckbox from '@/ui/components/KpuCheckbox/index.vue'
import KpuInput from '@/ui/components/KpuInput/index.vue'
import KpuPinInput from '@/ui/components/KpuPinInput/index.vue'
import KpuSelect from '@/ui/components/KpuSelect/index.vue'

import { globalShareState } from '@/utils/global-state'

import { defineRule } from 'vee-validate'

import { h } from 'vue'

const DEFAULT_MODEL_PROP_NAME = 'modelValue'

export const DEFAULT_FORM_COMMON_CONFIG: FormCommonConfig = {}

export const COMPONENT_MAP: Record<BaseFormComponentType, Component> = {
  DefaultButton: h(KpuButton, { size: 'sm', variant: 'outline' }),
  PrimaryButton: h(KpuButton, { size: 'sm', variant: 'default' }),
  KpuCheckbox,
  KpuInput,
  // KpuInputPassword,
  KpuPinInput,
  KpuSelect,
}

export const COMPONENT_BIND_EVENT_MAP: Partial<
  Record<BaseFormComponentType, string>
> = {
  KCheckbox: 'checked',
}

export function setupKpuForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: KpuFormAdapterOptions<T>) {
  const { config, defineRules } = options

  const {
    disabledOnChangeListener = true,
    disabledOnInputListener = true,
    emptyStateValue = undefined,
  } = (config || {}) as FormCommonConfig

  Object.assign(DEFAULT_FORM_COMMON_CONFIG, {
    disabledOnChangeListener,
    disabledOnInputListener,
    emptyStateValue,
  })

  if (defineRules) {
    for (const key of Object.keys(defineRules)) {
      defineRule(key, defineRules[key as never])
    }
  }

  const baseModelPropName
    = config?.baseModelPropName ?? DEFAULT_MODEL_PROP_NAME
  const modelPropNameMap = config?.modelPropNameMap as
    | Record<BaseFormComponentType, string>
    | undefined

  const components = globalShareState.getComponents()

  for (const component of Object.keys(components)) {
    const key = component as BaseFormComponentType
    COMPONENT_MAP[key] = components[component as never]

    if (baseModelPropName !== DEFAULT_MODEL_PROP_NAME) {
      COMPONENT_BIND_EVENT_MAP[key] = baseModelPropName
    }

    // 覆盖特殊组件的modelPropName
    if (modelPropNameMap && modelPropNameMap[key]) {
      COMPONENT_BIND_EVENT_MAP[key] = modelPropNameMap[key]
    }
  }
}
