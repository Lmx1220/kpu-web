<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getElementLocales } from './locales'
import useSettingsStore from '@/store/modules/settings'
import type { App } from '#/global'
const locales = computed(() => getElementLocales())
const settingsStore = useSettingsStore()

const { t, te } = useI18n()
const generateI18nTitle: App.GenerateI18nTitle = (key, defaultTitle) => {
  // eslint-disable-next-line no-mixed-operators
  return !!key && te(key) ? t(key) : (typeof defaultTitle === 'function' ? defaultTitle() : defaultTitle)
}
provide('generateI18nTitle', generateI18nTitle)
onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.onresize = () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  }
  return () => {
    window.onresize = null
  }
})
</script>

<template>
  <el-config-provider
    :locale="locales[settingsStore.settings.app.defaultLang]" size="default" :button="{
      autoInsertSpace: true,
    }"
  >
    <RouterView
      v-slot="{ Component, route }"
      :style="{
        '--g-main-sidebar-actual-width': 0,
        '--g-sub-sidebar-actual-width': 0,
      }"
    >
      <component
        :is="Component"
      />
    </RouterView>
  </el-config-provider>
</template>

<!-- <style scoped>
</style> -->
