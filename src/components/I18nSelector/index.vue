<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useI18nTitle from '@/util/composables/useI18nTitle'
import { getElementLocales } from '@/locales'
import useSettingsStore from '@/store/modules/settings.js'

defineOptions({
  name: 'I18nSelector',
})

// 切换语言工具
const { locale } = useI18n()
const settingsStore = useSettingsStore()

const locales = computed(() => getElementLocales())

const localesOptions = computed(() => Object.keys(locales.value).map(item => ({ label: locales.value[item].labelName, disabled: settingsStore.settings.app.defaultLang === item, handle: () => languageCommand(item) })))
// 生成国际化标题
const { generateI18nTitle } = useI18nTitle()

function languageCommand(command: string) {
  // 切换语言
  locale.value = command
  settingsStore.setDefaultLang(command)
  // 生成国际化标题
  generateI18nTitle('route.login', 'Login')
}
</script>

<template>
  <HDropdownMenu
    :items="[localesOptions]"
  >
    <slot />
  </HDropdownMenu>
</template>
