import { isEqual, isFunction } from 'lodash-es'
import { tryOnUnmounted } from '@vueuse/core'
import type { DialogMethods, DialogProps, ReturnMethods, UseDialogInnerReturnType, UseDialogReturnType } from '../typing'
import type { Nullable } from '#/global.d.ts'
import { isProdMode } from '@/util/env'

const dataTransfer = reactive<any>({})
const visibleData = reactive<{ [key: number]: boolean }>({})

export function useDialog(): UseDialogReturnType {
  const dialog = ref<Nullable<DialogMethods>>(null)
  const visible = ref<Nullable<boolean>>(false)
  const uid = ref('')

  function register(dialogMethod: DialogMethods, uuid: string) {
    if (!getCurrentInstance()) {
      throw new Error('useDialog() can only be used inside setup() or functional components!')
    }
    uid.value = uuid
    isProdMode()
        && onUnmounted(() => {
          dialog.value = null
          visible.value = false
          dataTransfer[unref(uid)] = null
        })
    if (unref(visible) && isProdMode() && dialogMethod === unref(dialog)) {
      return
    }

    dialog.value = dialogMethod
    visible.value = true
    dialogMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }
  }

  const getInstance = () => {
    const instance = unref(dialog)
    if (!instance) {
      throw new Error('useDialog instance is undefined!')
    }
    return instance
  }
  const methods: ReturnMethods = {
    setDialogProps: (props: Partial<DialogProps>): void => {
      getInstance()?.setDialogProps(props)
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),

    redoDialogHeight: () => {
      getInstance()?.redoDialogHeight?.()
    },

    openDialog: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDialogProps({
        visible,
      })

      if (!data) {
        return
      }
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal) {
        dataTransfer[id] = toRaw(data)
      }
    },

    closeDialog: () => {
      getInstance()?.setDialogProps({ visible: false })
    },
  }
  return [register, methods]
}

export function useDialogInner(callbackFn?: Fn): UseDialogInnerReturnType {
  const dialogInstanceRef = ref<Nullable<DialogMethods>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')

  const getInstance = () => {
    const instance = unref(dialogInstanceRef)
    if (!instance) {
      throw new Error('useDialogInner instance is undefined!')
    }
    return instance
  }

  const register = (dialogInstance: DialogMethods, uuid: string) => {
    isProdMode()
        && tryOnUnmounted(() => {
          dialogInstanceRef.value = null
        })
    uidRef.value = uuid
    dialogInstanceRef.value = dialogInstance
    currentInstance?.emit('register', dialogInstance, uuid)
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if (!data) {
      return
    }
    if (!callbackFn || !isFunction(callbackFn)) {
      return
    }
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setDialogProps({ loading })
      },
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)]
      }),

      changeOkLoading: (loading = true) => {
        getInstance()?.setDialogProps({ confirmLoading: loading })
      },

      closeDialog: () => {
        getInstance()?.setDialogProps({ visible: false })
      },

      setDialogProps: (props: Partial<DialogProps>) => {
        getInstance()?.setDialogProps(props)
      },

      redoDialogHeight: () => {
        const callRedo = getInstance()?.redoDialogHeight
        callRedo && callRedo()
      },
    },
  ]
}
