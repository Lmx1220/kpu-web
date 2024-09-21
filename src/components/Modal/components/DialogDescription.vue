<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'
import {
  DialogDescription,
} from '@headlessui/vue'

const props = defineProps<{ class?: any }>()

// const delegatedProps = computed(() => {
//   const { class: _, ...delegated } = props
//
//   return delegated
// })
</script>

<template>
  <DialogDescription
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
