import type { window } from '#/global'
import useWindowStore from '@/store/modules/window'
import eventBus from '@/utils/eventBus'

export default function useAuth() {
  const windowStore = useWindowStore()

  // 新增窗口
  function add(windowName: string | window) {
    windowStore.add(windowName)
    eventBus.emit('scrollToWindow', typeof windowName === 'string' ? windowName : windowName.name)
  }

  // 关闭窗口
  function remove(windowName: string) {
    windowStore.remove(windowName)
  }

  function toggleMaximize(windowName: string) {
    windowStore.toggleMaximize(windowName)
  }

  function isMaximize(windowName: string) {
    let isMaximize = false
    windowStore.list.map((item) => {
      if (item.name === windowName) {
        isMaximize = !!item.isMaximize
      }
      return item
    })
    return isMaximize
  }

  // 窗口刷新
  function reload(windowName: string) {
    windowStore.reload(windowName)
    setTimeout(() => {
      windowStore.reload(windowName)
    }, 0)
  }

  return {
    add,
    remove,
    toggleMaximize,
    isMaximize,
    reload,
  }
}
