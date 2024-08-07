import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

export default function useMenu() {
  const router = useRouter()

  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()
  const { t, te } = useI18n()
  function generateI18nTitle(key: string | Function = t('route.undefined')) {
    return typeof key == 'function' ? key() : te(key) ? t(key) : key
  }
  function switchTo(index: number | string) {
    menuStore.setActived(index)
    if (settingsStore.settings.menu.switchMainMenuAndPageJump) {
      router.push(menuStore.sidebarMenusFirstDeepestPath)
    }
  }

  return {
    generateI18nTitle,
    switchTo,
  }
}