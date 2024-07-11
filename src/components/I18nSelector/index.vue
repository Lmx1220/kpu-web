<script setup lang="ts">
import { getElementLocales, useLocale } from '@/locales/useLocale.ts'
import type { LocaleType } from '@/types/config'

defineOptions({
  name: 'I18nSelector',
})

// 切换语言工具
// const { locale } = useI18n()
const { changeLocale, getLocale } = useLocale()
const locales = computed(() => getElementLocales())

const localesOptions = computed(() => Object.keys(locales.value).map(item => ({ label: locales.value[item].labelName, disabled: getLocale.value === item, handle: () => languageCommand(item) })))
// 生成国际化标题
// const i18nTitle = inject('i18nTitle')!

async function languageCommand(lang: LocaleType | string) {
  // 切换语言
  await changeLocale(lang as LocaleType)
  // 生成国际化标题
  // i18nTitle('route.login', 'Login')
}
</script>

<template>
  <HDropdownMenu
    :items="[localesOptions]"
  >
    <slot />
  </HDropdownMenu>
</template>
