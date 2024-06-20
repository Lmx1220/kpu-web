import useRouteStore from './route'
import useSettingsStore from './settings'
import type { Menu } from '#/global'
import { resolveRoutePath } from '@/util'
import menu from '@/menu'

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
    // #TODO 需要修改
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
      let returnMenus: Menu.recordMainRaw[] = []

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
        : settingsStore.settings.home.fullPath
    })
    function getDeepestPath(menu: Menu.recordRaw, rootPath = '') {
      let retnPath = ''
      if (menu.children) {
        const item = menu.children.find(item => item.meta?.menu !== false)
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
      const defaultOpenedPaths: string[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        allMenus.value.forEach((item) => {
          defaultOpenedPaths.push(...getDefaultOpenedPaths(item.children))
        })
      }
      return defaultOpenedPaths
    })
    function getDefaultOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
      const defaultOpenedPaths: string[] = []
      menus.forEach((item) => {
        if (item.children) {
          item.meta?.defaultOpened && defaultOpenedPaths.push(resolveRoutePath(rootPath, item.path))
          const childrenDefaultOpenedPaths = getDefaultOpenedPaths(item.children, resolveRoutePath(rootPath, item.path))
          if (childrenDefaultOpenedPaths.length > 0) {
            defaultOpenedPaths.push(...childrenDefaultOpenedPaths)
          }
        }
      })
      return defaultOpenedPaths
    }

    //
    const alwaysOpenedPaths = computed(() => {
      const defaultOpenedPaths: string[] = []
      if (settingsStore.settings.app.routeBaseOn !== 'filesystem') {
        allMenus.value.forEach((item) => {
          try {
            defaultOpenedPaths.push(...getAlwaysOpenedPaths(item.children))
          }
          catch (e) {
            console.log(e)
          }
        },
        )
      }
      return defaultOpenedPaths
    },
    )
    function getAlwaysOpenedPaths(menus: Menu.recordRaw[], rootPath = '') {
      const alwaysOpenedOpenedPaths: string[] = []
      try {
        menus.forEach((item) => {
          if (item.children) {
            item.meta?.alwaysOpened && alwaysOpenedOpenedPaths.push(resolveRoutePath(rootPath, item.path))
            const childrenDefaultOpenedPaths = getAlwaysOpenedPaths(item.children, resolveRoutePath(rootPath, item.path))
            if (childrenDefaultOpenedPaths.length > 0) {
              alwaysOpenedOpenedPaths.push(...childrenDefaultOpenedPaths)
            }
          }
        })
      }
      catch (e) {
        console.log(e)
      }
      return alwaysOpenedOpenedPaths
    }
    // 生成导航（前端生成）
    async function generateMenusAtFront() {
      menus.value = menu.filter(item => item.children.length !== 0)
    }
    // 生成导航（后端生成）
    async function generateMenusAtBack() {
      // await apiApp.menuList().then(async (res) => {
      //   menus.value = (res.data as Menu.recordMainRaw[]).filter(item => item.children.length !== 0)
      // }).catch(() => {})
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
      alwaysOpenedPaths,
      generateMenusAtFront,
      generateMenusAtBack,
      setActived,
    }
  },
)
export default useMenuStore
