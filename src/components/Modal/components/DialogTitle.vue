<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'
import { DialogTitle } from '@headlessui/vue'

const props = defineProps<{ class?: any }>()

// const delegatedProps = computed(() => {
//   const { class: _, ...delegated } = props
//
//   return delegated
// })
</script>

<template>
  <DialogTitle
    :class="
      cn('text-lg font-semibold leading-none tracking-tight m-0', props.class)
    "
  >
    <slot />
  </DialogTitle>
</template>
