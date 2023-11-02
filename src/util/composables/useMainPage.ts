import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar.ts'

export default function useMainPage() {
  const settingsStore = useSettingsStore()
  const tabbarStore = useTabbarStore()
  const tabbar = useTabbar()
  const router = useRouter()
  const route = useRoute()
  function reload() {
    router.push(
      { name: 'reload' },
    )
  }
  function setCustomTitle(title: string) {
    settingsStore.setCustomTitle(route.fullPath, title)
    settingsStore.settings.tabbar.enable && tabbarStore.setCustomTitle({
      tabId: tabbar.getId(),
      title,
    })
  }
  function resetCustomTitle() {
    settingsStore.resetCustomTitle(route.fullPath)
    settingsStore.settings.tabbar.enable && tabbarStore.resetCustomTitle(tabbar.getId())
  }
  function maximize(status: boolean) {
    settingsStore.setMainPageMaximize(status)
  }
  return {
    reload,
    setCustomTitle,
    resetCustomTitle,
    maximize,
  }
}
