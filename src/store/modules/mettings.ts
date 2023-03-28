import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsCustom from '@/settings'
import settingsDefault from '@/settings.default'

const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  () => {
    const mergeSettings: RecursiveRequired<Settings.all> = defaultsDeep(
      settingsCustom,
      settingsDefault,
    )
    const settings = ref(mergeSettings)
    // 更新应用配置
    function updateSettings(data: Settings.all) {
      settings.value = defaultsDeep(data, settings.value)
    }
    // 设置默认语言
    function setDefaultLang(lang: string) {
      settings.value.app.defaultLang = lang
    }
    return {
      settings,
      updateSettings,
      setDefaultLang,
    }
  },
)
export default useSettingsStore
