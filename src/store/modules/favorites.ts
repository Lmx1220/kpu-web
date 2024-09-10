import useSettingsStore from './settings'
import useUserStore from './user'
import useMenuStore from './menu'
import { favorites, favoritesEdit } from '@/api/modules/user'
import storage from '@/util/storage'
import type { Favorites, Menu } from '#/global'

const useFavoritesStore = defineStore(
  // 唯一ID
  'favorites',
  () => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const menuStore = useMenuStore()

    const list = ref<Favorites.recordRaw[]>([])

    function getSourceListByMenus(arr: Menu.recordRaw[]) {
      const list: Menu.recordRaw[] = []
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          list.push(...getSourceListByMenus(item.children))
        }
        else {
          list.push(item)
        }
      })
      return list
    }

    const flatSidebarMenu = computed(() => {
      const list: Menu.recordRaw[] = []
      menuStore.allMenus.forEach((item) => {
        list.push(...getSourceListByMenus(item.children))
      })
      return list
    })

    // 判断路由是否可添加进收藏夹
    function canAdd(windowName: Favorites.recordRaw['windowName']) {
      return flatSidebarMenu.value.some(item => item.windowName === windowName)
    }
    // 判断路由是否已经添加进收藏夹
    function isAdd(windowName: Favorites.recordRaw['windowName']) {
      return list.value.some(item => item.windowName === windowName)
    }
    // 新增收藏
    function add(windowName: string) {
      const existingWindow = flatSidebarMenu.value.find(item => item.windowName === windowName)

      if (existingWindow && !list.value.find(item => item.windowName === windowName)) {
        list.value.push({
          windowName,
          title: existingWindow.title,
        })
      }
      updateStorage()
    }
    // 删除收藏
    function remove(windowName: Favorites.recordRaw['windowName']) {
      list.value = list.value.filter((item) => {
        return item.windowName !== windowName
      })
      updateStorage()
    }
    // 拖拽排序
    function sort(newIndex: number, oldIndex: number) {
      list.value.splice(newIndex, 0, list.value.splice(oldIndex, 1)[0])
      updateStorage()
    }
    // 更新 storage 数据
    async function updateStorage() {
      if (settingsStore.settings.favorites.storageTo === 'local') {
        const favoritesData = storage.local.has('favoritesData') ? JSON.parse(storage.local.get('favoritesData') as string) : {}
        favoritesData[userStore.account] = list.value
        storage.local.set('favoritesData', JSON.stringify(favoritesData))
      }
      else if (settingsStore.settings.favorites.storageTo === 'server') {
        await favoritesEdit(JSON.stringify(list.value))
      }
    }
    // 根据 storage 数据复原当前帐号的标签页
    async function recoveryStorage() {
      if (settingsStore.settings.favorites.storageTo === 'local') {
        if (storage.local.has('favoritesData')) {
          list.value = JSON.parse(storage.local.get('favoritesData') as string)[userStore.account] || []
        }
      }
      else if (settingsStore.settings.favorites.storageTo === 'server') {
        const res = await favorites()
        list.value = JSON.parse(res.data.favorites || '[]')
      }
    }

    return {
      list,
      canAdd,
      isAdd,
      add,
      remove,
      sort,
      recoveryStorage,
    }
  },
)

export default useFavoritesStore
