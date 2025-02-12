<script setup lang="ts">
import KpuHelpTooltip from '@/ui/components/KpuTooltip/help-tooltip.vue'
import { cn } from '@/utils'
import { FormLabel } from './form'

interface Props {
  class?: string
  help?: string
  required?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="mr-[2px] text-destructive">*</span>
    <slot />
    <KpuHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      {{ help }}
    </KpuHelpTooltip>
  </FormLabel>
</template>
