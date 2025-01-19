<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/classNames.ts'
import { type BadgeVariants, badgeVariants } from '.'

interface Props {
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {
})
</script>

<template>
  <div :class="[cn(badgeVariants({ variant }), props.class)]">
    <slot />
  </div>
</template>

<style scoped>

</style>
