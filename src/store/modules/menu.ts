import useRouteStore from './route'
import useSettingsStore from './settings'
import type { Menu } from '#/global'
import { resolveRoutePath } from '@/util'

const useMenuStore = defineStore(
  // 唯一ID
  'menu',
  () => {
    const settingsStore = useSettingsStore()
    // const userStore = useUserStore()
    const routeStore = useRouteStore()
    // 菜单列表
    const menus = ref<Menu.recordMainRaw[]>([{
      meta: {},
      children: [],
    }])
    const actived = ref(0)
    // 将多级导航的每一级 path 都转换为完整路径
    function convertToFullPath(menu: any[], path: string = '') {
      return menu.map((item) => {
        item.path = resolveRoutePath(path, item.path)
        if (item.children) {
          item.children = convertToFullPath(item.children, item.path)
        }
        return item
      })
    }
    // 完整导航数据
    const allMenus = computed(() => {
      let returnMenus: Menu.recordMainRaw[] = [{
        meta: {},
        children: [],
      }]

      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        if (settingsStore.settings.menu.menuMode === 'single') {
          returnMenus[0].children = []
          routeStore.routes.forEach((item) => {
            returnMenus[0].children?.push(...item.children as Menu.recordRaw[])
          })
        }
        else {
          returnMenus = routeStore.routes as Menu.recordMainRaw[]
        }
        returnMenus.map(item => convertToFullPath(item.children))
      }
      else {
        returnMenus = menus.value
      }
      return returnMenus
    })
    // 次导航数据
    const sidebarMenus = computed<Menu.recordMainRaw['children']>(() => {
      return allMenus.value.length > 0
        ? allMenus.value[actived.value].children
        : []
    })
    // 次导航第一层最深路径
    const sidebarMenusFirstDeepestPath = computed(() => {
      return allMenus.value.length > 0
        ? getDeepestPath(sidebarMenus.value[0])
        : '/'
    })
    function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
      let retnPath = ''
      if (menu.children) {
        const item = menu.children.find(item => item.meta?.sidebar !== false)
        if (item) {
          retnPath = getDeepestPath(item, resolveRoutePath(rootPath, menu.path))
        }
        else {
          retnPath = getDeepestPath(menu.children[0], resolveRoutePath(rootPath, menu.path))
        }
      }
      else {
        retnPath = resolveRoutePath(rootPath, menu.path)
      }
      return retnPath
    }
    // 默认展开的导航路径
    const defaultOpenedPaths = computed(() => {
      let defaultOpenedPaths: string[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        defaultOpenedPaths = getDefaultOpenedPaths(sidebarMenus.value)
      }
      return defaultOpenedPaths
    })
    function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
      const defaultOpenedPaths: string[] = []
      menus.forEach((item) => {
        if (item.meta?.defaultOpened && item.children) {
          defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path))
          const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path))
          if (childrenDefaultOpenedPaths.length > 0) {
            defaultOpenedPaths.push(...childrenDefaultOpenedPaths)
          }
        }
      })
      return defaultOpenedPaths
    }
    // 切换主导航
    function setActived(data: number | string) {
      if (typeof data === 'number') {
        // 如果是 number 类型，则认为是主导航的索引
        actived.value = data
      }
      else {
        // 如果是 string 类型，则认为是路由，需要查找对应的主导航索引
        const findIndex = allMenus.value.findIndex(item => item.children.some(r => data.indexOf(`${r.path}/`) === 0 || data === r.path))
        if (findIndex >= 0) {
          actived.value = findIndex
        }
      }
    }
    return {
      menus,
      actived,
      allMenus,
      sidebarMenus,
      sidebarMenusFirstDeepestPath,
      defaultOpenedPaths,
      setActived,
    }
  },
)
export default useMenuStore
