import type { RouteLocationRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import useTabbarStore from '@/store/modules/tabbar'
import type { Tabbar } from '@/types/global'

export default function useTabbar() {
  const route = useRoute()
  const router = useRouter()
  const settingsStore = useSettingsStore()
  const tabbarStore = useTabbarStore()
  function getId() {
    return settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? route.meta.activeMenu ?? route.fullPath : route.fullPath
  }
  function open(to: RouteLocationRaw) {
    const index = tabbarStore.list.findIndex(item => item.tabId === getId())
    tabbarStore.$patch({
      leaveIndex: index,
    })
    router.push(to)
  }

  function close(to: RouteLocationRaw) {
    const activedTabId = getId()
    router.push(to).then(() => {
      tabbarStore.remove(activedTabId)
    })
  }
  function closeById(tabId: string) {
    const activedTabId = getId()
    if (tabbarStore.list.some(item => item.tabId === tabId)) {
      if (tabbarStore.list.length > 1) {
        if (tabId === activedTabId) {
          const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
          index < tabbarStore.list.length - 1 ? close(`${tabbarStore.list[index + 1]?.fullPath}`) : close(`${tabbarStore.list[index - 1].fullPath}`)
        }
        else { tabbarStore.remove(tabId) }
      }
      else { ElMessage.error('当前只有一个标签页，已阻止关闭') }
    }
    else { ElMessage.error('关闭的页面不存在') }
  }
  function closeOtherSide(tabId = getId()) {
    const activedTabId = getId()
    if (tabId !== activedTabId) {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      router.push(tabbarStore.list[index].fullPath ?? '')
    }
    tabbarStore.removeOtherSide(tabId)
  }
  function closeLeftSide(tabId = getId()) {
    const activedTabId = getId()
    if (tabId !== activedTabId) {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      tabbarStore.list.findIndex(item => item.tabId === activedTabId) < index && router.push(`${tabbarStore.list[index].fullPath}`)
    }
    tabbarStore.removeLeftSide(tabId)
  }
  function closeRightSide(tabId = getId()) {
    const activedTabId = getId()
    if (tabId !== activedTabId) {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      tabbarStore.list.findIndex(item => item.tabId === activedTabId) > index && router.push(`${tabbarStore.list[index].fullPath}`)
    }
    tabbarStore.removeRightSide(tabId)
  }
  /**
   * 校验指定标签两侧是否有可关闭的标签
   * @param tabId
   * @returns boolea
   */
  function checkCloseOtherSide(tabId = getId()) {
    return tabbarStore.list.some(item => !item.isPermanent && !item.isPin && item.tabId !== tabId)
  }
  function checkCloseLeftSide(tabId = getId()) {
    let fig = true
    if (tabId === tabbarStore.list[0]?.tabId) {
      fig = false
    }
    else {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      fig = tabbarStore.list.some((item, i) => i < index && !item.isPermanent && !item.isPin && item.tabId !== tabId)
    }
    return fig
  }
  function checkCloseRightSide(tabId = getId()) {
    const tabbar: Tabbar.recordRaw | undefined = tabbarStore.list.at(-1)

    let flg = true
    if (tabId === (!tabbar ? 0 : tabbar.tabId)) {
      flg = false
    }
    else {
      const index = tabbarStore.list.findIndex(item => item.tabId === tabId)
      flg = tabbarStore.list.some((item, i) => i >= index && !item.isPermanent && !item.isPin && item.tabId !== tabId)
    }
    return flg
  }

  return {
    getId,
    open,
    closeById,
    close,
    closeOtherSide,
    closeLeftSide,
    closeRightSide,
    checkCloseOtherSide,
    checkCloseLeftSide,
    checkCloseRightSide,
  }
}
