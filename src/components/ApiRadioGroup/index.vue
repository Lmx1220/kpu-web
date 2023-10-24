<script lang="ts" setup>
import { radioGroupEmits } from 'element-plus'
import { get, omit } from 'lodash-es'
import type { ApiRadioGroupProps } from './typing'

const props = withDefaults(defineProps<ApiRadioGroupProps>(), {
  resultField: 'data',
  labelField: 'label',
  valueField: 'value',
})
const emit = defineEmits(radioGroupEmits)
const attrs = useAttrs()
defineOptions({
  name: 'ApiRadioGroup',
})
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
const dicts = ref<LabelValueOptions>([])
async function getDicts() {
  const res = await props.api(props.params)
  dicts.value = get(res, props.resultField, [])
}
onMounted(() => {
  getDicts()
})
const slots = useSlots()
</script>

<template>
  <el-radio-group v-model="modelValue" v-bind="getProps" @change="(val) => emit('change', val)">
    <template v-if="slots.default">
      <slot :dicts="dicts" />
    </template>
    <el-radio v-for="(item, index) in dicts" v-else :key="index" :label="item[valueField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>
</template>

<style scoped lang="scss">

</style>
