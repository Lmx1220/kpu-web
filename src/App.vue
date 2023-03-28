<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getElementLocales } from './locales'
import Home from './views/index.vue'
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
      <div class="item">
        <el-icon>
          <svg-icon name="i-ri:translate" />
        </el-icon>
      </div>
    </I18nSelector>
    <h1 class="text-3xl font-bold underline ">
      {{ t('route.login') }}
    </h1>
    <Home />
  </el-config-provider>
</template>

<!-- <style scoped>
</style> -->
