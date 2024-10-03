<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'

import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'

import { computed } from 'vue'

const props = defineProps<{ class?: any } & DialogDescriptionProps>()

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
