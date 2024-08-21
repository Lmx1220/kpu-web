/**
 * Multi-language related operations
 */
import { computed, unref } from 'vue'
import type { TranslatePair } from 'element-plus/es/locale'
import { i18n } from './index.ts'
import { loadLocalePool, setHtmlPageLang } from './helper'
import type { LocaleType } from '#/config'

import useSettingsStore from '@/store/modules/settings'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

function setI18nLanguage(locale: LocaleType) {
  const settingsStore = useSettingsStore()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  }
  else {
    (i18n.global.locale as any).value = locale
  }
  // setLocale.value = locale
  settingsStore.setDefaultLang(locale)
  setHtmlPageLang(locale)
}

export function useLocale() {
  const settingsStore = useSettingsStore()
  const getLocale = computed(() => settingsStore.settings.app.defaultLang)
  // const getShowLocalePicker = computed(() => localeStore.getShowPicker)
  const getElementLocale = computed((): any => {
    const localeMessage = i18n.global.getLocaleMessage<{ uiLocale: any }>(unref(getLocale))
    return localeMessage?.uiLocale ?? {}
  })

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType, newMessage?: Recordable) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale && !newMessage) {
      return locale
    }

    if (loadLocalePool.includes(locale) && !newMessage) {
      setI18nLanguage(locale)
      return locale
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
    if (!langModule) {
      return
    }

    const { message } = langModule

    if (newMessage) {
      Object.assign(message, newMessage)
    }
    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    // getShowLocalePicker,
    changeLocale,
    getElementLocale,
  }
}
export function getElementLocales() {
  const locales: Record<string, any> = {
    'zh-cn': {
      labelName: '中文(简体)',
    },
    'en': {
      labelName: 'English',
    },
  }
  return locales
}
