<script setup lang="ts">
import type { LocaleType } from '@/types/config'
import { SUPPORT_LANGUAGES } from '@/constants'
import { loadLocaleMessages } from '@/locales/utils.ts'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'I18nSelector',
})

// 切换语言工具
const settingsStore = useSettingsStore()

const localesOptions = computed(() => SUPPORT_LANGUAGES.map(item => ({ label: item.label, disabled: settingsStore.settings.app.defaultLang === item.value, handle: () => languageCommand(item.value) })))

async function languageCommand(lang: LocaleType) {
  settingsStore.setDefaultLang(lang)
  loadLocaleMessages(lang)
}
</script>

<template>
  <KpuDropdown
    :items="[localesOptions]"
  >
    <slot />
  </KpuDropdown>
</template>
