<script setup lang="ts">
import { inject } from 'vue'

useScrollLock()
const id = inject('DISMISSABLE_MODAL_ID')
</script>

<template>
  <div :data-dismissable-modal="id" class="bg-overlay z-popup inset-0 bg-black/50" />
</template>
