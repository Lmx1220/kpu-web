<script setup lang="ts">
import { useVModel } from '@vueuse/core'

defineOptions({
  inheritAttrs: true,
})
const props
  = defineProps<{
    value?: string
  }>()

const emits = defineEmits<{
  'update:value': [payload: string]
}>()
const url = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
})
</script>

<template>
  <div>
    avatar
    {{ url }}
  </div>
</template>
