import type { window } from '#/global'
import useMenuStore from './menu'

export const useWindowStore = defineStore(
  // 唯一ID
  'windows',
  () => {
    const list = ref<window[]>([])

    function add(data: string | window) {
      let preData: window
      if (typeof data === 'string') {
        const menuStore = useMenuStore()
        preData = {
          name: data,
          width: menuStore.flatMenu[data].windowWidth,
          title: menuStore.flatMenu[data].title,
          noTitle: menuStore.flatMenu[data].noTitle,
          params: menuStore.flatMenu[data].params,
          breadcrumbNeste: menuStore.flatMenu[data].breadcrumbNeste,
          isMaximize: false,
          reload: false,
        }
      }
      else {
        preData = {
          name: data.name,
          width: data.width,
          title: data.title,
          noTitle: data.noTitle,
          params: data.params,
          breadcrumbNeste: [],
          isMaximize: false,
          reload: false,
        }
      }
      // 无则添加，有则更新
      const index = list.value.findIndex(item => item.name === preData.name)
      if (index < 0) {
        list.value.push(preData)
      }
      else {
        Object.assign(list.value[index], preData)
      }
    }
    function remove(name: string) {
      list.value = list.value.filter(item => item.name !== name)
    }
    function removeOtherSide(name: string) {
      list.value = list.value.filter(item => item.name === name)
    }
    function removeLeftSide(name: string) {
      const i = list.value.findIndex(item => item.name === name)
      list.value = list.value.filter((_item, index) => index >= i)
    }
    function removeRightSide(name: string) {
      const i = list.value.findIndex(item => item.name === name)
      list.value = list.value.filter((_item, index) => index <= i)
    }
    function removeAll() {
      list.value = []
    }
    function sort(data: window[]) {
      list.value = data
    }
    function toggleMaximize(name: string) {
      list.value.map((item) => {
        if (item.name === name) {
          item.isMaximize = !item.isMaximize
        }
        else {
          item.isMaximize = false
        }
        return item
      })
    }
    function allMinimize() {
      list.value.some(item => item.isMaximize = false)
    }
    function reload(name: string) {
      list.value.map((item) => {
        if (item.name === name) {
          item.reload = !item.reload
        }
        return item
      })
    }
    return {
      list,
      add,
      remove,
      removeOtherSide,
      removeLeftSide,
      removeRightSide,
      removeAll,
      sort,
      toggleMaximize,
      allMinimize,
      reload,
    }
  },
)

export default useWindowStore
