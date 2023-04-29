import useSettingsStore from './settings'

interface IFrame {
  path: string
  src: string
  isOpen: boolean
  isLoading: boolean
}
const useIframeStore = defineStore(
  // 唯一ID
  'iframe',
  () => {
    const settingsStore = useSettingsStore()
    const list = ref<IFrame[]>([])
    const pathList = ref<string[]>([])
    const isGenerate = ref(false)
    const openedList = computed(() => list.value.filter(item => item.isOpen))
    function generateList(iframe: IFrame[]) {
      if (iframe) {
        list.value = iframe
        isGenerate.value = true
      }
    }
    function closeLoading(path: string) {
      const index = list.value.findIndex(item => item.path === path)
      index > -1 && (list.value[index].isLoading = false)
    }
    function open(path: string) {
      const he = list.value.find(xe => xe.path === path)
      if (he) {
        he.isOpen = true
        const index = pathList.value.findIndex(item => item === path)
        if (index > -1) {
          pathList.value.splice(0, 0, pathList.value[index])
          pathList.value.splice(index + 1, 1)
        }
        else {
          pathList.value.unshift(path)
        }
      }
      let count = 0
      pathList.value.forEach((xe) => {
        if ((list.value.find($e => $e.path === xe)?.isOpen && count++) && count > settingsStore.settings.mainPage.iframeCacheMax) {
          const index = list.value.findIndex($e => $e.path === xe)
          if (index > -1) {
            list.value[index].isOpen = false
            list.value[index].isLoading = true
          }
        }
      })
    }
    function close(path: string | string[]) {
      if (typeof path == 'string') {
        const index = list.value.findIndex(item => item.path === path)
        if (index > -1) {
          list.value[index].isOpen = false
          list.value[index].isLoading = true
          pathList.value = pathList.value.filter(item => item !== path)
        }
      }
      else {
        path.forEach((item) => {
          const index = list.value.findIndex(iframe => iframe.path === item)
          if (index > -1) {
            list.value[index].isOpen = false
            list.value[index].isLoading = true
            pathList.value = pathList.value.filter(path => path !== item)
          }
        })
      }
    }

    return {
      isGenerate,
      openedList,
      generateList,
      closeLoading,
      open,
      close,
    }
  },
)

export default useIframeStore
