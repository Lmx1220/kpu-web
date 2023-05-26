import type { RouteLocationNormalizedLoaded, RouteRecordRaw, RouteRecordRedirectOption } from 'vue-router'
import useSettingsStore from './settings'
import useRouteStore from './route'
import useUserStore from './user'
import { resolveRoutePath } from '@/util'
import storage from '@/util/storage'
import api from '@/api'

interface Favorite {
  fullPath: string
  title?: string | Function
  i18n?: string
  icon?: string
}
const useFavoritesStore = defineStore(
  // 唯一ID
  'favorites',
  () => {
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const routeStore = useRouteStore()
    // const menuStore = useMenuStore()
    const list = ref<Favorite[]>([])
    function hasChildren(route: RouteRecordRaw) {
      let flag = true
      if (route.children) {
        if (route.children.every(item => item.meta?.sidebar === false)) {
          flag = false
        }
      }
      else {
        flag = false
      }
      return flag
    }
    function pin(route: RouteRecordRaw[], path: string | undefined) {
      const routes: RouteRecordRedirectOption[] = []
      route.forEach((item) => {
        if (item.meta?.sidebar !== false) {
          if (item.children && hasChildren(item)) {
            routes.push(...pin(item.children, resolveRoutePath(`${path}`, item.path)))
          }
          else {
            (item.redirect ?? resolveRoutePath(`${path}`, item.path))
            && routes.push(item.redirect ?? resolveRoutePath(`${path}`, item.path))
          }
        }
      },
      )
      return routes
    }
    const routeList = computed(() => {
      const routes: RouteRecordRedirectOption[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        routeStore.routes.forEach((route) => {
          route.children && routes.push(...pin(route.children, undefined))
        })
      }

      return routes
    })
    function canAdd(path: string) {
      return routeList.value.includes(path)
    }

    function isAdd(path: string) {
      return list.value.some(item => item.fullPath === path)
    }
    function add(route: RouteLocationNormalizedLoaded) {
      const meta = route.matched.at(-1)?.meta
      list.value.find(item => item.fullPath === route.fullPath) || list.value.push({
        fullPath: route.fullPath,
        title: meta?.title,
        i18n: meta?.i18n,
        icon: meta?.icon ?? meta?.breadcrumbNeste?.findLast(item => item.icon)?.icon,
      })
      updateStorage()
    }
    function remove(path: string) {
      list.value = list.value.filter(item => item.fullPath !== path)
      updateStorage()
    }
    function sort(newIndex: number, oldIndex: number) {
      list.value.splice(newIndex, 0, list.value.splice(oldIndex, 1)[0])
      updateStorage()
    }

    // 修改固定标签页
    async function updateStorage() {
      if (settingsStore.settings.tabbar.storageTo === 'local') {
        const favoritesData = storage.local.has('favoritesData') ? JSON.parse(`${storage.local.get('favoritesData')}`) : {}
        favoritesData[userStore.account] = list.value
        storage.local.set('favoritesData', JSON.stringify(favoritesData))
      }
      else {
        settingsStore.settings.tabbar.storageTo === 'server' && await api.post({
          url: 'member/favorites/edit',
          data: {
            tabbar: JSON.stringify(list.value),
          },
          // baseURL: '/mock/',
        })
      }
    }
    // 根据 localstorage 数据复原当前帐号的固定标签页
    async function recoveryStorage() {
      if (settingsStore.settings.favorites.storageTo === 'local') {
        storage.local.has('favoritesData') && list.value.push(...JSON.parse(`${storage.local.get('favoritesData')}`)[userStore.account] || [])
      }
      else if (settingsStore.settings.favorites.storageTo === 'server') {
        const res = await api.get<any>({
          url: 'member/favorites/edit',
          data: {
            tabbar: JSON.stringify(list.value),
          },
          // baseURL: '/mock/',
        })
        list.value.push(...JSON.parse(res.data.favorites || '[]'))
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
