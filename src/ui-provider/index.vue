<script setup lang="ts">
import { useLocale } from '@/locales/useLocale.ts'

const locale = useLocale()
</script>

<template>
  <ElConfigProvider :locale="locale.getElementLocale.value" :button="{ autoInsertSpace: true }">
    <slot />
  </ElConfigProvider>
</template>
