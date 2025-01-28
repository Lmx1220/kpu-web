<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'
import { Input } from './input'

defineOptions({
  name: 'KpuInput',
})

const props = defineProps<{
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()

const value = defineModel<any>()
</script>

<template>
  <Input v-model="value" :disabled autocomplete="off" :class="cn('w-[200px]', props.class)" />
</template>

<style scoped>
input[type="password"]::-ms-reveal {
  display: none;
}
</style>
