import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import useSettingsStore from './settings'
import useUserStore from './user'
import useRouteStore from './route'
import useKeepAliveStore from './keepAlive'
import useIframeStore from './iframe'
import storage from '@/util/storage'
import type { Tabbar } from '@/types/global'
import api from '@/api'
import { deepClone } from '@/util'

const useTabbarStore = defineStore(
  // 唯一ID
  'tabbar',
  () => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const routeStore = useRouteStore()
    const keepAliveStore = useKeepAliveStore()
    const iframeStore = useIframeStore()
    const list = ref<Tabbar.recordRaw[]>([])
    const leaveIndex = ref(-1)

    // 添加常驻标签页
    function initPermanentTab() {
      const tabs: Tabbar.recordRaw[] = []
      routeStore.flatSystemRoutes.forEach((items) => {
        items.children && items.children.forEach((route) => {
          if (route.meta?.permanent) {
            // route.meta?.breadcrumbNeste?[1]
            const fullPath = route.meta?.breadcrumbNeste?.[route.meta?.breadcrumbNeste.length - 1]?.path
            const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (route.meta.activeMenu || route.meta.breadcrumbNeste?.at(-1)?.path) : route.meta.breadcrumbNeste?.at(-1)?.path
            tabs.push({
              tabId: `${tabId}`,
              fullPath: `${fullPath}`,
              activeMenu: route.meta.activeMenu,
              title: typeof route.meta.title === 'function' ? route.meta.title() : route.meta.title,
              activeIcon: route.meta.activeIcon,
              name: route.name ? [String(route.name)] : [],
              i18n: route.meta.i18n,
              customTitleList: [],
              isPin: false,
              isPermanent: true,
            })
          }
        })
      })
      routeStore.flatRoutes.forEach((items) => {
        if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
          items.children && items.children.forEach((route) => {
            if (route.meta?.permanent) {
              const fullPath = route.meta?.breadcrumbNeste?.[route.meta.breadcrumbNeste.length - 1]!.path
              const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (route.meta.activeMenu || route.meta.breadcrumbNeste?.at(-1)?.path) : route.meta.breadcrumbNeste?.at(-1)?.path
              tabs.push({
                tabId: `${tabId}`,
                fullPath: `${fullPath}`,
                routeName: route.name,
                activeMenu: route.meta.activeMenu,
                title: typeof route.meta.title === 'function' ? route.meta.title() : route.meta.title,
                i18n: route.meta.i18n,
                iframe: route.meta.iframe,
                name: route.name ? [String(route.name)] : [],
                customTitleList: [],
                isPin: false,
                isPermanent: true,
              })
            }
          })
        }
        else {
          if (items.meta?.permanent) {
            const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (items.meta?.activeMenu || items.path) : items.path
            tabs.push({
              tabId,
              fullPath: items.path,
              routeName: items.name,
              activeMenu: items.meta.activeMenu,
              title: typeof items.meta.title === 'function' ? items.meta.title() : items.meta.title,
              i18n: items.meta.i18n,
              iframe: items.meta.iframe,
              name: items.name ? [String(items.name)] : [],
              customTitleList: [],
              isPin: false,
              isPermanent: true,
            })
          }
        }
      })
      // 常驻的标签页添加到标签栏开头
      tabs.length && list.value.unshift(...tabs)
    }
    // 添加标签页
    function add(route: RouteLocationNormalizedLoaded) {
      return new Promise<void>((resolve) => {
        const names: string[] = []
        route.matched.forEach((v, i) => {
          if (i > 0) {
            v.components?.default.name && names.push(v.components.default.name)
          }
        })
        const meta = route.matched.at(-1)?.meta
        const tabId = settingsStore.settings.tabbar.mergeTabsBy === 'activeMenu' ? (meta?.activeMenu || route.fullPath) : route.fullPath
        if (route.name !== 'reload') {
          // 记录查找到的标签页
          const tabbar = list.value.find(item => item.tabId === tabId)
          if (tabbar) {
            tabbar.tabId = tabId
            tabbar.fullPath = route.fullPath
            tabbar.routeName = route.name
            tabbar.activeMenu = meta?.activeMenu
            tabbar.title = typeof meta?.title === 'function' ? meta.title() : meta?.title
            tabbar.i18n = meta?.i18n
            tabbar.iframe = meta?.iframe
            tabbar.icon = meta?.icon || meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon
            tabbar.activeIcon = meta?.activeIcon || meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon
          }
          else {
            const tabbar = {
              tabId,
              fullPath: route.fullPath,
              routeName: route.name,
              activeMenu: meta?.activeMenu,
              title: typeof meta?.title === 'function' ? meta.title() : meta?.title,
              i18n: meta?.i18n,
              iframe: meta?.iframe,
              icon: meta?.icon || meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
              activeIcon: meta?.activeIcon || meta?.breadcrumbNeste?.findLast(item => item.activeIcon)?.activeIcon,
              name: names,
              customTitleList: [],
              isPin: false,
              isPermanent: false,
            }
            if (leaveIndex.value >= 0) {
              list.value.splice(leaveIndex.value + 1, 0, tabbar)
              leaveIndex.value = -1
            }
            else {
              list.value.push(tabbar)
            }
          }
        }
        // 更新固定标签页的数据，数据会记录在 localstorage 里
        updateStorage()
        resolve()
      })
    }
    // 删除指定标签页
    function remove(tabId: string) {
      let keepName: string[] = []
      let removeName: string[] = []
      const iframePath: string[] = []
      list.value.forEach((v) => {
        if (v.tabId === tabId) {
          if (v.iframe) {
            iframePath.push(v.fullPath)
          }
          else {
            removeName.push(...v.name)
          }
        }
        else {
          keepName.push(...v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      // 如果是手动点击关闭 tab 标签页，则删除页面缓存
      keepAliveStore.remove(name)
      // 删除 iframe
      iframeStore.close(iframePath)
      list.value = list.value.filter((item) => {
        return item.tabId !== tabId
      })
      updateStorage()
    }
    // 删除两侧非常驻和固定标签页
    function removeOtherSide(tabId: string) {
      let keepName: string[] = []
      let removeName: string[] = []
      const iframePath: string[] = []
      list.value.forEach((v) => {
        if (v.tabId !== tabId && !v.isPin) {
          if (v.iframe) {
            iframePath.push(v.fullPath)
          }
          else {
            removeName.push(...v.name)
          }
        }
        else {
          keepName.push(...v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      keepAliveStore.remove(name)
      iframeStore.close(iframePath)
      list.value = list.value.filter((item) => {
        return item.tabId === tabId || item.isPermanent || item.isPin
      })
      updateStorage()
    }
    // 删除左侧非常驻和固定标签页
    function removeLeftSide(tabId: string) {
      // 查找指定路由对应在标签页列表里的下标
      const index = list.value.findIndex(item => item.tabId === tabId)
      let keepName: string[] = []
      let removeName: string[] = []
      const iframePath: string[] = []
      list.value.forEach((v, i) => {
        if (i < index && !v.isPin) {
          if (v.iframe) {
            iframePath.push(v.fullPath)
          }
          else {
            removeName.push(...v.name)
          }
        }
        else {
          keepName.push(...v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v)
        }
      })
      keepAliveStore.remove(name)
      iframeStore.close(iframePath)
      list.value = list.value.filter((item, i) => {
        return i >= index || item.isPermanent || item.isPin
      })
      updateStorage()
    }
    // 删除右侧非常驻和固定标签页
    function removeRightSide(tabId: string) {
      // 查找指定路由对应在标签页列表里的下标
      const index = list.value.findIndex(item => item.tabId === tabId)
      let keepName: string[] = []
      let removeName: string[] = []
      const iframePath: string[] = []
      list.value.forEach((v, i) => {
        if (i > index && !v.isPin) {
          if (v.iframe) {
            iframePath.push(v.fullPath)
          }
          else {
            removeName.push(...v.name)
          }
        }
        else {
          keepName.push(...v.name)
        }
      })
      keepName = keepName.flat()
      removeName = removeName.flat()
      const name: string[] = []
      removeName.forEach((v) => {
        if (!keepName.includes(v)) {
          name.push(v as string)
        }
      })

      keepAliveStore.remove(name)
      iframeStore.close(iframePath)
      list.value = list.value.filter((item, i) => {
        return i <= index || item.isPermanent || item.isPin
      })
      updateStorage()
    }
    // 固定标签页（移动到最后一个常驻或固定标签页后面，如果没有则移动至第一个）
    function pin(tabId: string) {
      const index = list.value.findIndex(item => item.tabId === tabId)
      let toIndex = -1
      list.value.forEach((item, index) => {
        if (item.isPermanent || item.isPin) {
          toIndex = index
        }
      })
      if (index > toIndex) {
        list.value.splice(toIndex + 1, 0, list.value[index])
        list.value.splice(index + 1, 1)
      }
      // 修改状态
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          item.isPin = true
        }
      })
      updateStorage()
    }
    // 取消固定标签页（移动到最后一个常驻或固定标签页后面）
    function unPin(tabId: string) {
      const index = list.value.findIndex(item => item.tabId === tabId)
      let toIndex = -1
      list.value.forEach((item, index) => {
        if (item.isPermanent || item.isPin) {
          toIndex = index
        }
      })
      list.value.splice(toIndex + 1, 0, list.value[index])
      list.value.splice(index, 1)
      // 修改状态
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          item.isPin = false
        }
      })
      updateStorage()
    }
    // 清空所有标签页，登出的时候需要清空
    function clean() {
      list.value = []
    }
    // 拖拽排序
    function sort(newIndex: number, oldIdex: number) {
      list.value.splice(newIndex, 0, list.value.splice(oldIdex, 1)[0])
    }
    // 修改标签页标题
    function editTitle({ tabId, title }: { tabId: string, title: string }) {
      list.value.forEach((item) => {
        if (item.tabId === tabId && item.title !== title) {
          item.title = title
        }
      })
    }
    function setCustomTitle({ tabId, title }: {
      tabId: Tabbar.recordRaw['tabId']
      title: string
    }) {
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          const customTitle = item.customTitleList.find(title => title.fullPath === item.fullPath)
          if (customTitle) {
            customTitle.title = title
          }
          else {
            item.customTitleList.push({
              fullPath: item.fullPath,
              title,
            })
          }
        }
      })
      updateStorage()
    }
    function resetCustomTitle(tabId: string) {
      list.value.forEach((item) => {
        if (item.tabId === tabId) {
          const index = list.value.findIndex(title => item.fullPath === title.fullPath)
          if (index > -1) {
            list.value.splice(index, 1)
          }
        }
      })
      updateStorage()
    }

    async function updateStorage() {
      if (settingsStore.settings.tabbar.storageTo === 'local') {
        const tabbarPinData = storage.local.has('tabbarPinData') ? JSON.parse(`${storage.local.get('tabbarPinData')}`) : {}
        tabbarPinData[userStore.account] = cloneDeep(list.value.filter(item => item.isPin)).map((item) => {
          item.customTitleList = []
          return item
        })
        storage.local.set('tabbarPinData', JSON.stringify(tabbarPinData))
      }
      else {
        settingsStore.settings.tabbar.storageTo === 'server' && await api.post({
          url: '/member/tabbar/edit',
          data: {
            tabbar: JSON.stringify(cloneDeep(list.value.filter(item => item.isPin)).map((item) => {
              item.customTitleList = []
              return item
            })),
          },
        })
      }
      if (settingsStore.settings.tabbar.enableMemory) {
        const tabbarTempData = storage.session.has('tabbarTempData') ? JSON.parse(`${storage.session.get('tabbarTempData')}`) : {}
        tabbarTempData[userStore.account] = deepClone(list.value.filter(item => !item.isPin && !item.isPermanent)).map((item) => {
          item.customTitleList = []
          return item
        })
        storage.session.set('tabbarTempData', JSON.stringify(tabbarTempData))
      }
    }
    // 根据 localstorage 数据复原当前帐号的固定标签页
    async function recoveryStorage() {
      if (settingsStore.settings.tabbar.storageTo === 'local') {
        storage.local.has('tabbarPinData') && list.value.push(...JSON.parse(`${storage.local.get('tabbarPinData')}`)[userStore.account] || [])
      }
      else if (settingsStore.settings.tabbar.storageTo === 'server') {
        const res = await api.get<any>({
          url: '/member/tabbar/edit',
          data: {
            tabbar: JSON.stringify(list.value.filter(item => item.isPin)),
          },
        })
        list.value.push(...JSON.parse(res.tabbar || '[]'))
      }
      settingsStore.settings.tabbar.enableMemory && storage.session.has('tabbarTempData') && (list.value = JSON.parse(`${storage.session.get('tabbarTempData')}`)[userStore.account] || [])
    }
    return {
      list,
      leaveIndex,
      initPermanentTab,
      add,
      remove,
      removeOtherSide,
      removeLeftSide,
      removeRightSide,
      pin,
      unPin,
      clean,
      sort,
      editTitle,
      setCustomTitle,
      resetCustomTitle,
      recoveryStorage,
    }
  },
)
export default useTabbarStore
