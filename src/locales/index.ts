import type { LocaleType } from '#/config'
import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user.ts'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, setLoadLocalePool } from './helper.ts'

// eslint-disable-next-line import/no-mutable-exports
export let i18n: ReturnType<typeof createI18n>

async function createI18nOptions(): Promise<I18nOptions> {
  const settingsStore = useSettingsStore()
  const userStore = useUserStore()

  let locale = settingsStore.settings.app.defaultLang
  if (settingsStore.settings.userPreferences.enable && userStore.isLogin) {
    await userStore.getPreferences()
    locale = userStore.preferences.app.defaultLang
  }

  if (!locale) {
    // navigator.language || navigator.browserLanguage
    const lang = (navigator.language).toLowerCase() as LocaleType
    locale = lang
    setTimeout(() => {
      settingsStore.setDefaultLang(lang)
    }, 100)
  }
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  return {
    legacy: false,
    locale,
    fallbackLocale: 'zh-ch',
    messages: {
      [locale]: message,
    },
    availableLocales: ['zh-ch', 'en'],
    sync: true, // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export async function useI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
  // 在控制台打印警告
  // i18n.global.setMissingHandler((locale, key) => {
  //   if (key.includes('.')) {
  //     console.warn(
  //       `[intlify] Not found '${key}' key in '${locale}' locale messages.`,
  //     )
  //   }
  // })
}
