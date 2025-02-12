<script setup lang="ts">
import { antdLocale } from '@/locales'
import useSettingsStore from '@/store/modules/settings'
import { App, ConfigProvider, theme } from 'ant-design-vue'

const settingsStore = useSettingsStore()

const tokenTheme = computed(() => ({
  algorithm: settingsStore.currentColorScheme === 'dark' ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
}))
</script>

<template>
  <ConfigProvider :locale="antdLocale" :theme="tokenTheme">
    <App class="h-full w-full">
      <slot />
    </App>
  </ConfigProvider>
</template>
