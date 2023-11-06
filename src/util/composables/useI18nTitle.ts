import useSettingsStore from '@/store/modules/settings'
import type { App } from '@/types/global'

export default function useI18nTitle() {
  const settingsStore = useSettingsStore()

  const { t, te } = useI18n()
  const generateI18nTitle: App.GenerateI18nTitle = (key, defaultTitle = t('route.undefined')) => {
    return settingsStore.settings.toolbar.enableI18n && !!key && te(key) ? t(key) : (typeof defaultTitle === 'function' ? defaultTitle() : defaultTitle)
  }
  return {
    generateI18nTitle,
  }
}
