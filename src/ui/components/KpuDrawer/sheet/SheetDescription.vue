<script setup lang="ts">
import type { DialogDescriptionProps } from 'radix-vue'

import { cn } from '@/utils'

import { DialogDescription } from 'radix-vue'

import { computed } from 'vue'

const props = defineProps<DialogDescriptionProps & { class?: any }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogDescription
    :class="cn('text-muted-foreground text-sm', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogDescription>
</template>
