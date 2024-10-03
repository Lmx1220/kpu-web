<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'

import { DialogTitle, type DialogTitleProps, useForwardProps } from 'radix-vue'

import { computed } from 'vue'

const props = defineProps<{ class?: any } & DialogTitleProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    v-bind="forwardedProps"
    :class="
      cn('text-lg font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </DialogTitle>
</template>
