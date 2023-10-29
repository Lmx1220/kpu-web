<script lang="ts" setup>
import { get } from 'lodash-es'
import type { ApiSelectProps } from './typing'

const props = withDefaults(defineProps<ApiSelectProps>(), {
  resultField: 'data',
  labelField: 'label',
  valueField: 'value',
  showSearch: true,
  filterOption: (query: string, item: any) => {
    return item.label.toLowerCase().includes(query.toLowerCase())
  },
})
const emit = defineEmits(['change', 'update:modelValue'])
const attrs = useAttrs()
defineOptions({
  name: 'ApiSelect',
})
const getProps = computed(() => {
  return { ...props.componentProps, ...attrs }
})
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    if (val) {
      emit('update:modelValue', val)
    }
  },
})
const dicts = ref<any>([])
let data: any = []
const loading = ref(false)
async function getDicts() {
  loading.value = true
  try {
    const res = await props.api(props.params)
    dicts.value = get(res, props.resultField, [])
    data = get(res, props.resultField, [])
  }
  finally {
    loading.value = false
  }
}
onMounted(() => {
  if (props.defaultValue && !props.modelValue) {
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
  <el-select v-model="modelValue" :filterable="showSearch" :filter-method="filterMethod" v-bind="getProps" @change="(val) => emit('change', val)">
    <template v-if="slots.default">
      <slot :dicts="dicts" />
    </template>
    <el-option
      v-for="(item, index) in dicts"
      v-else
      :key="index"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>
</template>

<style scoped lang="scss">

</style>
