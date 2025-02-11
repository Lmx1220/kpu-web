<script setup lang="ts">
import { asyncFindDictList } from '@/api/modules/common/general'
import ApiRadioGroup from '@/components/ApiRadioGroup/index.vue'
import ApiSelect from '@/components/ApiSelect/index.vue'

const props = withDefaults(defineProps<{
  renderType?: 'RadioGroup' | 'Select' | 'CheckboxGroup'
  params?: any
  type?: string
  extend?: string
  extendFirst?: boolean
  excludes?: []
}>(), {
  renderType: 'Select',
  params: () => ({}),
  extendFirst: true,
  excludes: () => ([]),

})
const render = computed(() => {
  if (props.renderType === 'RadioGroup') {
    return ApiRadioGroup
  }
  else if (props.renderType === 'CheckboxGroup') {
    return ApiSelect
  }
  else {
    return ApiSelect
  }
})
function api() {
  return asyncFindDictList({
    type: props.type,
    extend: props.extend,
    extendFirst: props.extendFirst,
    excludes: props.excludes,
    ...props.params,
  })
}
</script>

<template>
  <Component
    :is="render" :api="api"
    result-field="data"
  />
</template>
