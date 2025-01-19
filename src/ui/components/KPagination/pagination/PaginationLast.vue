<script setup lang="ts">
import type { PaginationLastProps } from 'radix-vue'
import { cn } from '@/utils/classNames.ts'

import { ChevronsRight } from 'lucide-vue-next'

import { PaginationLast } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<PaginationLastProps & { class?: any }>(),
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
  <PaginationLast v-bind="delegatedProps">
    <KButton :class="cn('size-8 p-0', props.class)" variant="outline">
      <slot>
        <ChevronsRight class="size-4" />
      </slot>
    </KButton>
  </PaginationLast>
</template>
