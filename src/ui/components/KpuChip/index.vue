<script setup lang="ts">
defineOptions({
  name: 'Chip',
})

defineProps<{
  closable?: boolean
}>()

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="chip inline-block rounded-full bg-muted px-3 vertical-mid transition-background-color">
    <div class="content h-8 flex items-center gap-2 text-xs">
      <slot />
      <span v-if="closable" class="closable h-6 w-6 flex-center cursor-pointer rounded-lg bg-accent text-sm text-initial transition-background-color -mr-1.5 hover-op-70" @click="emits('close')">
        <KpuIcon name="i-ep:close-bold" />
      </span>
    </div>
  </div>
</template>
