<script setup lang="ts">
import Panel from './panel.vue'

defineOptions({
  name: 'Favorites',
})
</script>

<template>
  <KPopover class="p-0">
    <KButton variant="ghost" size="icon" class="animation">
      <KIcon name="i-uiw:star-off" :size="16" />
    </KButton>
    <template #panel>
      <Panel />
    </template>
  </KPopover>
</template>
