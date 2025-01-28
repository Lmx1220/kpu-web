<script setup lang="ts">
import Panel from './panel.vue'

defineOptions({
  name: 'Favorites',
})
</script>

<template>
  <KpuPopover class="p-0">
    <KpuButton variant="ghost" size="icon" class="animation">
      <KpuIcon name="i-uiw:star-off" :size="16" />
    </KpuButton>
    <template #panel>
      <Panel />
    </template>
  </KpuPopover>
</template>
