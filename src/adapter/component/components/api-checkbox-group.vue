<script lang="ts" setup>
import type { AnyFunction, LabelValueOptions } from '#/index'
import { requestClient } from '@/api'
import { useVModel } from '@vueuse/core'
import { get, omit } from 'lodash-es'

interface OptionsItem { label: string, value: string | number | boolean, disabled?: boolean }
defineOptions({
  name: 'ApiCheckboxGroup',
})
const props = withDefaults(defineProps<{
  value?: any[]
  numberToString?: boolean
  api: AnyFunction | string
  requestMethod?: 'get' | 'post' | 'put' | 'delete'
  params?: any
  resultField?: string
  labelField?: string
  valueField?: string
  immediate?: boolean
}>(), {
  numberToString: false,
  requestMethod: 'post',
  resultField: '',
  labelField: 'label',
  valueField: 'value',
  immediate: true,
})
const emit = defineEmits<{
  'update:value': [payload: any]
  'optionsChange': [payload: OptionsItem[]]
}>()

// const getProps = computed(() => {
//   return { ...props.componentProps, ...attrs }
// })

const value = useVModel(props, 'value', emit, {
  defaultValue: props.value,
  passive: true,
})

const loading = ref(false)
const isFirstLoad = ref(true)
const options = ref<LabelValueOptions>([])
// Processing options value
const getOptions = computed(() => {
  const { labelField, valueField, numberToString } = props
  const datas: OptionsItem[] = []
  unref(options).forEach((data: Recordable) => {
    const value = data[valueField]
    datas.push({
      ...omit(data, [labelField, valueField]),
      label: data[labelField],
      value: numberToString ? `${value}` : value,
      disabled: data.disabled || false,
    })
  })
  return datas
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
  }
}
function emitChange() {
  emit('optionsChange', unref(getOptions))
}
watchEffect(async () => {
  if (props.immediate) {
    await getDicts()
  }
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
  <ASpin :spinning="loading" class="ml-5">
    <ACheckboxGroup v-bind="$attrs" v-model:value="value" :options="getOptions" class="w-full">
      <slot v-for="(slot) in slots" :key="slot" :name="slot" />
    </ACheckboxGroup>
  </ASpin>
</template>
