<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'

import {
  DialogDescription,
  type DialogDescriptionProps,
  useForwardProps,
} from 'radix-vue'
import { computed } from 'vue'

const props = defineProps<{ class?: any } & DialogDescriptionProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
