<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { useLocale } from '@/locales/useLocale.ts'

import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
const locale = useLocale()
</script>

<template>
  <AConfigProvider :locale="locale.getElementLocale.value" :theme="settingsStore.currentColorScheme === 'dark' ? { algorithm: [theme.darkAlgorithm] } : {}">
    <slot />
  </AConfigProvider>
</template>
