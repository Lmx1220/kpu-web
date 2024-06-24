<script lang="ts" setup>
import { get, omit } from 'lodash-es'
import type { ApiSelectProps } from './typing'
import { isFunction } from '@/util/is.ts'
import type { OptionsItem } from '@/api/modules/common/model/optionsModel.ts'

defineOptions({
  name: 'ApiSelect',
})
const props = withDefaults(defineProps<ApiSelectProps>(), {
  resultField: 'data',
  labelField: 'label',
  valueField: 'value',
  allData: true,
  afterFetch: null,
  showSearch: true,
  filterOption: (query: string, item: any) => {
    return item.label.toLowerCase().includes(query.toLowerCase())
  },
})
const emit = defineEmits(['change', 'options-change'])
const attrs = useAttrs()
const getProps = computed(() => {
  return { ...props.componentProps, ...attrs }
})
const modelValue = defineModel<string | number | boolean | undefined>({
  required: true,
})
const dicts = ref<any>([])
let data: any = []
const loading = ref(false)
const getOptions = computed(() => {
  const { labelField, valueField, numberToString, allData } = props
  const reduce = unref(dicts).reduce((prev: any, next: Recordable) => {
    if (next) {
      const value = next[valueField]
      prev.push({
        ...(allData && omit(next, [labelField, valueField])),
        label: next[labelField],
        value: numberToString ? `${value}` : value,
      })
    }
    return prev
  }, [] as OptionsItem[])
  return reduce
})
async function getDicts() {
  const api = props.api
  const afterFetch = props.afterFetch
  if (!api || !isFunction(api)) {
    return
  }
  dicts.value = []
  data = []
  try {
    loading.value = true
    const res = await api(props.params)
    if (Array.isArray(res)) {
      dicts.value = res
      data = res
      if (afterFetch && isFunction(afterFetch)) {
        await afterFetch(dicts.value)
        await afterFetch(data)
      }

      emitChange()
      return
    }
    if (props.resultField) {
      dicts.value = get(res, props.resultField) || []
      data = get(res, props.resultField) || []
    }

    if (afterFetch && isFunction(afterFetch)) {
      await afterFetch(dicts.value)
      data = await afterFetch(data)
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
  // eslint-disable-next-line vue/custom-event-name-casing
  emit('options-change', unref(getOptions))
}
onMounted(() => {
  if (props.defaultValue && !modelValue.value) {
    modelValue.value = props.defaultValue
  }
  getDicts()
})
const slots = useSlots()
function filterMethod(query: string) {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      dicts.value = dicts.value.filter((item: any) => {
        return props.filterOption(query, item)
      })
    }, 200)
  }
  else {
    dicts.value = data
  }
}
</script>

<template>
  <ElSelect v-model="modelValue" :filterable="showSearch" :filter-method="filterMethod" v-bind="getProps" @change="(val:any) => emit('change', val)">
    <template v-if="slots.default">
      <slot :dicts="dicts" />
    </template>
    <ElOption
      v-for="(item, index) in dicts"
      v-else
      :key="index"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </ElSelect>
</template>

<style scoped lang="scss">
// scss
</style>
