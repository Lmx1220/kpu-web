<script setup lang="ts">
import { computed, provide } from 'vue'
import { useI18n } from 'vue-i18n'
import { getElementLocales } from './locales'
import I18nSelector from '@/components/I18nSelector/index.vue'
import useSettingsStore from '@/store/modules/mettings'
import type { App } from '#/global'
const locales = computed(() => getElementLocales())
const settingsStore = useSettingsStore()

const { t, te } = useI18n()
const generateI18nTitle: App.GenerateI18nTitle = (key, defaultTitle) => {
  // eslint-disable-next-line no-mixed-operators
  return !!key && te(key) ? t(key) : (typeof defaultTitle === 'function' ? defaultTitle() : defaultTitle)
}
provide('generateI18nTitle', generateI18nTitle)
</script>

<template>
  <el-config-provider :locale="locales[settingsStore.settings.app.defaultLang]">
    <I18nSelector>
      切换语言
    </I18nSelector>
    <el-button>      {{ t('route.login') }}</el-button>
    <h1 class="text-3xl font-bold underline ">
      Hello world!
    </h1>
  </el-config-provider>
</template>

<!-- <style scoped>
</style> -->
