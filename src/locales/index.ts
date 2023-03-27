// import useSettingsStore from '@/store/modules/settings'

import { createI18n } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'

import elementLocaleZhCN from 'element-plus/lib/locale/lang/zh-cn'
import elementLocaleZhTW from 'element-plus/lib/locale/lang/zh-tw'
import elementLocaleEn from 'element-plus/lib/locale/lang/en'
import type { App } from 'vue'
import useSettingsStore from '@/store/modules/mettings'

function useI18n(app: App) {
  const settingsStore = useSettingsStore()
  // 如果没设置默认语言，则根据当前浏览器语言设置默认语言
  if (!settingsStore.settings.app.defaultLang) {
    // navigator.language || navigator.browserLanguage
    const lang = (navigator.language).toLowerCase()
    for (const key in messages) {
      lang.includes(key) && settingsStore.setDefaultLang(key)
    }
  }
  const i18n = createI18n({
    legacy: false,
    locale: settingsStore.settings.app.defaultLang,
    flatJson: true,
    fallbackLocale: 'zh-cn',
    messages,
  })
  app.use(i18n)
}
// export type LocaleKey = keyof typeof elementLocaleZhCN;
interface Locale {
  [key: string]: any
}
function getElementLocales() {
  const locales: Locale = {}
  for (const key in messages) {
    locales[key] = {}
    switch (key) {
      case 'zh-cn':
        Object.assign(locales[key], elementLocaleZhCN, { labelName: '中文(简体)' })
        break
      case 'zh-tw':
        Object.assign(locales[key], elementLocaleZhTW, { labelName: '中文(繁體)' })
        break
      case 'en':
        Object.assign(locales[key], elementLocaleEn, { labelName: 'English' })
        break
    }
  }
  return locales
}

export {
  useI18n,
  getElementLocales,
}
