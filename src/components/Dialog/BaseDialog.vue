<script setup lang="ts">
import { omit } from 'lodash-es'
import DialogFooter from './components/DialogFooter.vue'
import DialogHeader from './components/DialogHeader.vue'
import DialogWrapper from './components/DialogWrapper.vue'

import type { DialogMethods, DialogProps } from './typing'
import { isFunction } from '@/util/is'
import { deepMerge } from '@/util'

const props = withDefaults(defineProps<Partial<DialogProps>>(), {
  scrollTop: true,
  draggable: true,
  canFullscreen: true,
  wrapperFooterOffset: 0,
  helpMessage: '',
  useWrapper: true,
  showCancelBtn: true,
  showOkBtn: true,
  closable: true,
  mask: true,
  maskClosable: true,
  keyboard: true,
  footer: undefined,
})
const emits = defineEmits<{
  'register': [DialogMethods, string]
  'update:visible': [boolean]
  'visibleChange': [boolean]
  'heightChange': [number]
  'cancel': [Event?]
  'ok': [Event]
}>()
const { t } = useI18nT()
const cancelText = computed(() => {
  return t('common.cancelText')
})
const okText = computed(() => {
  return t('common.okText')
})
defineOptions({
  name: 'BaseDialog',
  inheritAttrs: false,
})

const attrs = useAttrs()
const propsRef = ref<Partial<DialogProps> | null>(null)
const dialogWrapperRef = ref<InstanceType<typeof DialogWrapper>>()
const visibleRef = ref(false)
const fullscreenRef = ref(false)
const dialogMethods: DialogMethods = {
  setDialogProps,
  emitVisible: undefined,
  redoDialogHeight: () => {
    nextTick(() => {
      if (unref(dialogWrapperRef)) {
        unref(dialogWrapperRef)?.setDialogHeight()
      }
    })
  },
}
const instance = getCurrentInstance()
if (instance) {
  emits('register', dialogMethods, String(instance.uid))
}
const getMergeProps = computed((): Recordable => {
  return {
    ...props,
    ...(unref(propsRef) as any),
  }
})
const getProps = computed((): Recordable => {
  const opt = {
    ...unref(getMergeProps),
    visible: unref(visibleRef),
    okButtonProps: undefined,
    cancelButtonProps: undefined,
    title: undefined,
  }
  return {
    ...opt,
  }
})
const getBindValue = computed((): Recordable => {
  const attr = {

    ...attrs,
    ...unref(getMergeProps),
    modelValue: visibleRef.value,
    fullscreen: unref(fullscreenRef),
  } as any

  if (unref(fullscreenRef)) {
    return omit(attr, ['height', 'title'])
  }
  attr.cancelText || (attr.cancelText = cancelText.value)
  attr.okText || (attr.okText = okText.value)
  return omit(attr, 'title')
})

watchEffect(() => {
  visibleRef.value = !!props.visible
  fullscreenRef.value = !!props.defaultFullscreen
})

watch(
  () => unref(visibleRef),
  (v) => {
    emits('visibleChange', v)
    emits('update:visible', v)
    instance && dialogMethods.emitVisible?.(v, instance.uid)
    nextTick(() => {
      if (props.scrollTop && v && unref(dialogWrapperRef)) {
        (unref(dialogWrapperRef) as any).setScrollTop()
      }
    })
  },
  {
    immediate: false,
  },
)

function setDialogProps(props: Partial<DialogProps>): void {
  // Keep the last setDialogProps
  propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
  if (Reflect.has(props, 'visible')) {
    visibleRef.value = !!props.visible
  }
  if (Reflect.has(props, 'defaultFullscreen')) {
    fullscreenRef.value = !!props.defaultFullscreen
  }
}

const getWrapperHeight = computed(() => {
  if (unref(fullscreenRef)) {
    return undefined
  }
  return unref(getProps).height
})

async function handleCancel(e?: Event) {
  e?.stopPropagation()
  // 过滤自定义关闭按钮的空白区域
  // if ((e.target as HTMLElement)?.classList?.contains(`${prefixCls}-close--custom`)) {
  //   return
  // }
  if (props.closeFunc && isFunction(props.closeFunc)) {
    const isClose: boolean = await props.closeFunc()
    visibleRef.value = !isClose
    return
  }

  visibleRef.value = false
  emits('cancel', e)
}

function handleOk(e: Event) {
  emits('ok', e)
}

function handleFullScreen(e: Event) {
  e && e.stopPropagation()
  fullscreenRef.value = !fullscreenRef.value
}
</script>

<template>
  <el-dialog v-bind="getBindValue" :show-close="false" @close="handleCancel">
    <template v-if="!$slots.footer" #footer>
      <DialogFooter v-bind="getBindValue" @cancel="handleCancel" @ok="handleOk">
        <template v-for="item in Object.keys($slots)" #[item]="data">
          <slot :name="item" v-bind="data || {}" />
        </template>
      </DialogFooter>
    </template>
    <template v-if="!$slots.header" #header>
      <DialogHeader
        :can-fullscreen="getProps.canFullscreen"
        :fullscreen="fullscreenRef"
        :title="getMergeProps.title"
        :help-message="getProps.helpMessage"
        @cancel="handleCancel"
        @fullscreen="handleFullScreen"
      />
    </template>
    <DialogWrapper
      ref="dialogWrapperRef"
      :use-wrapper="getProps.useWrapper"
      :footer-offset="wrapperFooterOffset"
      :full-screen="fullscreenRef"
      :loading="getProps.loading"
      :loading-tip="getProps.loadingTip"
      :min-height="getProps.minHeight"
      :height="getWrapperHeight"
      :visible="visibleRef"
      :dialog-footer-height="footer !== undefined && !footer ? 0 : undefined"
    >
      <slot />
    </DialogWrapper>
    <template v-for="item in Object.keys(omit($slots, 'default'))" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
