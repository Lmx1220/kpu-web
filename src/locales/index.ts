// import useSettingsStore from '@/store/modules/settings'

import messages from '@intlify/unplugin-vue-i18n/messages'
import elementLocaleEn from 'element-plus/dist/locale/en.mjs'
import elementLocaleJa from 'element-plus/dist/locale/ja.mjs'

import elementLocaleZhCN from 'element-plus/dist/locale/zh-cn.mjs'
import elementLocaleZhTW from 'element-plus/dist/locale/zh-tw.mjs'

import vxeZhCN from 'vxe-table/lib/locale/lang/zh-CN'
import vxeEnUS from 'vxe-table/lib/locale/lang/en-US'
import vxeJaJP from 'vxe-table/lib/locale/lang/ja-JP'
import { defaultsDeep, set } from 'lodash-es'
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import useSettingsStore from '@/store/modules/settings'

const modules = import.meta.glob('./lang/zh-cn/**/*.ts', {
  as: 'json',
  eager: true,
})
const modulesEn = import.meta.glob('./lang/en/**/*.ts', {
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

messages['zh-cn'] = defaultsDeep(messages['zh-cn'], vxeZhCN)
messages['zh-cn'] = defaultsDeep(messages['zh-cn'], genMessage(modules, 'lang/zh-cn'))
messages.en = defaultsDeep(messages.en, genMessage(modulesEn, 'lang/en'))
messages.en = defaultsDeep(messages.en, vxeEnUS)
messages.jp = defaultsDeep(messages.en, vxeJaJP)
// eslint-disable-next-line import/no-mutable-exports
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
  setHtmlPageLang(settingsStore.settings.app.defaultLang)
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
function setHtmlPageLang(locale: string) {
  document.querySelector('html')?.setAttribute('lang', locale)
}
export {
  useI18n,
  getElementLocales,
}
