import type { Menu } from '#/global'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'

export default function useMenu() {
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  const appWindow = useWindow()
  const { t, te } = useI18n()
  function generateI18nTitle(key: string | Function = t('app.window.undefined')) {
    return typeof key == 'function' ? key() : te(key) ? t(key) : key
  }

  function switchTo(index: number) {
    menuStore.setActived(index)
    if (settingsStore.settings.menu.switchMainMenuAndOpenWindow) {
      const windowName = getDeepestWindow(menuStore.sidebarMenus[0]).windowName
      if (windowName) {
        if (/^(?:https?:|mailto:|tel:)/.test(windowName)) {
          window.open(windowName)
        }
        else {
          appWindow.add(windowName)
        }
      }
    }
  }
  function getDeepestWindow(menu: Menu.recordRaw): Menu.recordRaw {
    return menu.children ? getDeepestWindow(menu.children[0]) : menu
  }

  return {
    generateI18nTitle,
    switchTo,
  }
}
