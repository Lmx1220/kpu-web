<script lang="ts" setup>
import { radioGroupEmits } from 'element-plus'
import { get } from 'lodash-es'
import type { ApiRadioGroupProps } from './typing'

defineOptions({
  name: 'ApiRadioGroup',
})
const props = withDefaults(defineProps<ApiRadioGroupProps>(), {
  resultField: 'data',
  labelField: 'label',
  valueField: 'value',
})
const emit = defineEmits(radioGroupEmits)
const attrs = useAttrs()
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
const dicts = ref<LabelValueOptions>([])
async function getDicts() {
  const res = await props.api(props.params)
  dicts.value = get(res, props.resultField, [])
}
onMounted(() => {
  if (props.defaultValue && !props.modelValue) {
    modelValue.value = props.defaultValue
  }
  getDicts()
})
const slots = useSlots()
</script>

<template>
  <ElRadioGroup v-model="modelValue" v-bind="getProps" @change="(val:any) => emit('change', val)">
    <template v-if="slots.default">
      <slot :dicts="dicts" />
    </template>
    <ElRadio v-for="(item, index) in dicts" v-else :key="index" :value="item[valueField]">
      {{ item[labelField] }}
    </ElRadio>
  </ElRadioGroup>
</template>

<style scoped lang="scss">
// scss
</style>
