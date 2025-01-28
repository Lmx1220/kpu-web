<script setup lang="ts">
import type { PaginationNextProps } from 'radix-vue'
import { cn } from '@/utils'

import { ChevronRight } from 'lucide-vue-next'

import { PaginationNext } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<PaginationNextProps & { class?: any }>(),
  {
    asChild: true,
  },
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <KpuButton :class="cn('size-8 p-0', props.class)" variant="outline">
      <slot>
        <ChevronRight class="size-4" />
      </slot>
    </KpuButton>
  </PaginationNext>
</template>
