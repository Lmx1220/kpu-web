<script setup lang="ts">
import type { ButtonVariants } from '@/ui/components/KpuButton/button'
import type { Props as KpuButtonProps } from '@/ui/components/KpuButton/button/Button.vue'

import { cn } from '@/utils'
import { computed, useSlots } from 'vue'

interface Props extends KpuButtonProps {
  class?: any
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
  tooltipDelayDuration?: number
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top'
  variant?: ButtonVariants['variant']
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
})

const slots = useSlots()

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip)
</script>

<template>
  <KpuButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot />
  </KpuButton>

  <KpuTooltip
    v-else
    :delay-duration="tooltipDelayDuration"
    :side="tooltipSide"
  >
    <KpuButton
      :class="cn('rounded-full', props.class)"
      :disabled="disabled"
      :variant="variant"
      size="icon"
      @click="onClick"
    >
      <slot />
    </KpuButton>
    <template #content>
      <slot v-if="slots.tooltip" name="tooltip" />
      <template v-else>
        {{ tooltip }}
      </template>
    </template>
  </KpuTooltip>
</template>
