<script setup lang="ts">
import Tools from './tools.vue'

defineOptions({
  name: 'ToolbarLeftSide',
})
</script>

<template>
  <div class="flex items-center">
    <Tools mode="left-side" />
  </div>
</template>
