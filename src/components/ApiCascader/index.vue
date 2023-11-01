<!-- #Todo 待完成 -->
<script lang="ts" setup>
import { get, omit } from 'lodash-es'
import type { ApiCascader } from './typing'

defineOptions({
  name: 'ApiCascader',
})
const props = withDefaults(defineProps<ApiCascader>(), {
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
const getProps = computed(() => {
  const newProps = { ...props, ...attrs }
  return omit(newProps, 'modelValue', 'api', 'params', 'resultField', 'labelField', 'valueField')
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
  <!--  <el-calendar v-model="modelValue" :options="dicts" v-bind="getProps" @change="(val) => emit('change', val)" /> -->
</template>

<style scoped lang="scss">

</style>
