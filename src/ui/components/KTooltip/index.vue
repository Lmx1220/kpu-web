<script setup lang="ts">
import type { TooltipContentProps, TooltipProviderProps } from 'radix-vue'
import type { StyleValue } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

defineOptions({
  name: 'KTooltip',
})

withDefaults(
  defineProps<{
    text?: string
    delay?: TooltipProviderProps['delayDuration']
    side?: TooltipContentProps['side']
    align?: TooltipContentProps['align']
    contentClass?: Array<object | string> | object | string
    contentStyle?: StyleValue
    disabled?: boolean
  }>(),
  {
    text: '',
    delay: 300,
  },
)
</script>

<template>
  <TooltipProvider :delay-duration="delay" :disabled>
    <Tooltip>
      <TooltipTrigger as-child tabindex="-1">
        <slot />
      </TooltipTrigger>
      <TooltipContent :side :align :class="contentClass" :style="contentStyle" class="z-10000 text-xs">
        <slot name="content">
          <p>{{ text }}</p>
        </slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
