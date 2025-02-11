<script lang="ts" setup>
import type { AnyFunction, LabelValueOptions } from '#/index'
import type { ApiRadioGroupProps } from './typing'
import { requestClient } from '@/api'
import { useVModel } from '@vueuse/core'
import { get, omit } from 'lodash-es'

interface OptionsItem { label: string, value: string | number | boolean, disabled?: boolean }
defineOptions({
  name: 'ApiRadioGroup',
})
const props = withDefaults(defineProps<ApiRadioGroupProps>(), {
  numberToString: false,
  requestMethod: 'post',
  resultField: '',
  labelField: 'label',
  valueField: 'value',
  immediate: true,
  isBtn: false,
})
const emit = defineEmits<{
  'update:modelValue': [payload: any]
  'change': [payload: any]
  'optionsChange': [payload: OptionsItem[]]
}>()

const attrs = useAttrs()
const getProps = computed(() => {
  return { ...props.componentProps, ...attrs }
})
const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.modelValue,
  passive: true,
})

const loading = ref(false)
const isFirstLoad = ref(true)
const options = ref<LabelValueOptions>([])
// Processing options value
const getOptions = computed(() => {
  const { labelField, valueField, numberToString } = props

  return unref(options).reduce((prev, next: Recordable) => {
    if (next) {
      const value = next[valueField]
      prev.push({
        label: next[labelField],
        value: numberToString ? `${value}` : value,
        ...omit(next, [labelField, valueField]),
      })
    }
    return prev
  }, [] as OptionsItem[])
})
async function getDicts() {
  let api: AnyFunction
  if (typeof props.api == 'string' && props.api) {
    api = (option: any) => requestClient[props.requestMethod](props.api as string, option)
  }
  else {
    api = props.api as AnyFunction
  }
  try {
    loading.value = true
    let params: any
    if (props.requestMethod === 'get') {
      params = { params: props.params }
    }
    else {
      params = props.params
    }
    const res = await api(params)
    if (Array.isArray(res)) {
      options.value = res
      emitChange()
      return
    }
    if (props.resultField) {
      options.value = get(res, props.resultField) || []
    }
    emitChange()
  }
  catch (error) {
    console.warn(error)
  }
  finally {
    loading.value = false
    isFirstLoad.value = false
  }
}
function emitChange() {
  emit('optionsChange', unref(getOptions))
}
onMounted(() => {
  if (props.defaultValue && !props.modelValue) {
    modelValue.value = props.defaultValue
  }
  if (props.immediate) {
    getDicts()
  }
})
watchEffect(async () => {
  props.immediate && await getDicts()
})

watch(
  () => props.params,
  async () => {
    unref(isFirstLoad) && await getDicts()
  },
  { deep: true },
)

const slots: Record<string, Function> = useSlots()
</script>

<template>
  <ElRadioGroup v-model="modelValue" v-loading="loading" v-bind="getProps" @change="(val: any) => emit('change', val)">
    <template v-if="slots.default">
      <slot :dicts="getOptions" />
    </template>
    <template v-else>
      <template v-if="isBtn">
        <ElRadioButton v-for="(item, index) in getOptions" :key="index" :value="item.value" :disabled="item.disabled">
          {{ item.label }}
        </ElRadioButton>
      </template>
      <template v-else>
        <ElRadio v-for="(item, index) in getOptions" :key="index" :value="item.value" :disabled="item.disabled">
          {{ item.label }}
        </ElRadio>
      </template>
    </template>
  </ElRadioGroup>
</template>
