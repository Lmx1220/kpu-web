<script setup lang="ts">
import Panel from './panel.vue'

defineOptions({
  name: 'Favorites',
})
</script>

<template>
  <HDropdown class="flex-center cursor-pointer px-2 py-1">
    <SvgIcon name="i-uiw:star-off" />
    <template #dropdown>
      <Panel />
    </template>
  </HDropdown>
</template>
