<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'

import { DialogTitle, type DialogTitleProps } from 'radix-vue'

import { computed } from 'vue'

const props = defineProps<{ class?: any } & DialogTitleProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <DialogTitle
    :class="cn('text-foreground font-medium text-base', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
