<script setup lang="ts">
import Favorites from '@/layouts/components/Favorites/index.vue'

defineOptions({
  name: 'Favorites',
})
</script>

<template>
  <HDropdown
    class="flex-center cursor-pointer px-2 py-1"
  >
    <SvgIcon name="i-uiw:star-off" />
    <template #dropdown>
      <Favorites />
    </template>
  </HDropdown>
</template>
