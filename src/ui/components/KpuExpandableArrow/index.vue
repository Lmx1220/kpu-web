<script lang="ts" setup>
import { cn } from '@/utils'

const props = defineProps<{
  class?: string
}>()

// 控制箭头展开/收起状态
const collapsed = defineModel({ default: false })
</script>

<template>
  <div
    :class="cn('cursor-pointer color-primary inline-flex items-center', props.class)"
    @click="collapsed = !collapsed"
  >
    <slot :is-expanded="collapsed">
      {{ collapsed }}
      <!-- <span>{{ isExpanded ? '收起' : '展开' }}</span> -->
    </slot>
    <div
      :class="{ 'rotate-180': !collapsed }"
      class="transition-transform duration-300"
    >
      <slot name="icon">
        <kpu-icon name="i-lucide:chevron-down" class="size-4" />
      </slot>
    </div>
  </div>
</template>
