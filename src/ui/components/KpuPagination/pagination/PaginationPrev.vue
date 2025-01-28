<script setup lang="ts">
import type { PaginationPrevProps } from 'radix-vue'

import { cn } from '@/utils'

import { ChevronLeft } from 'lucide-vue-next'
import { PaginationPrev } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<PaginationPrevProps & { class?: any }>(),
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
  <PaginationPrev v-bind="delegatedProps">
    <KpuButton :class="cn('size-8 p-0', props.class)" variant="outline">
      <slot>
        <ChevronLeft class="size-4" />
      </slot>
    </KpuButton>
  </PaginationPrev>
</template>
