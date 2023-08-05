// import useSettingsStore from '@/store/modules/settings'

import { createI18n } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'
import elementLocaleZhCN from 'element-plus/dist/locale/zh-cn'
import elementLocaleZhTW from 'element-plus/dist/locale/zh-tw'
import elementLocaleEn from 'element-plus/dist/locale/en'
import elementLocaleJa from 'element-plus/dist/locale/ja'
import type { App } from 'vue'
import { defaultsDeep, set } from 'lodash-es'
import useSettingsStore from '@/store/modules/settings'

const modules = import.meta.glob('./lang/zh-cn/**/*.ts', {
  as: 'json',
  eager: true,
})

export function genMessage(langs: Record<string, any>, prefix = 'lang') {
  const obj: Recordable = {}

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      }
      else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}

messages['zh-cn'] = defaultsDeep(messages['zh-cn'], genMessage(modules, 'lang/zh_CN'))
console.log(messages)
export let i18n: ReturnType<typeof createI18n>
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
  i18n = createI18n({
    legacy: false,
    locale: settingsStore.settings.app.defaultLang,
    flatJson: true,
    fallbackLocale: 'zh-cn',
    messages,
  })
  app.use(i18n)
}
function getElementLocales() {
  const locales: Record<string, any> = {}
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
      case 'ja':
        Object.assign(locales[key], elementLocaleJa, { labelName: '日本語' })
        break
    }
  }
  return locales
}

export {
  useI18n,
  getElementLocales,
}
