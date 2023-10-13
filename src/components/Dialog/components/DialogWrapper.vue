<script setup lang="ts">
import { useMutationObserver } from '@vueuse/core'
import { createDialogContext } from '../hooks/useDialogContext'
import { useWindowSizeFn } from '@/hooks/useWindowSizeFn'
import type { AnyFunction } from '@/hooks/utils'

const props = defineProps({
  loading: { type: Boolean },
  useWrapper: {
    type: Boolean,
    default: true,
  },
  dialogHeaderHeight: {
    type: Number,
    default: 54,
  },
  dialogFooterHeight: {
    type: Number,
    default: 62,
  },
  minHeight: {
    type: Number,
    default: 200,
  },
  height: { type: Number },
  footerOffset: {
    type: Number,
    default: 0,
  },
  visible: { type: Boolean },
  fullScreen: { type: Boolean },
  loadingTip: { type: String },
})
const emits = defineEmits<{
  'heightChange': [number]
  'extHeight': [number]
}
>()
defineOptions({
  name: 'DialogWrapper',
  inheritAttrs: false,
})
const wrapperRef = ref()
const spinRef = ref()
const realHeightRef = ref(0)
const minRealHeightRef = ref(0)
let realHeight = 0
const stopElResizeFn: AnyFunction = () => {
}

useWindowSizeFn(setDialogHeight.bind(null, false))
useMutationObserver(
  spinRef,
  () => {
    setDialogHeight()
  },
  {
    attributes: true,
    subtree: true,
  },
)
onMounted(() => {
  const {
    dialogHeaderHeight,
    dialogFooterHeight,
  } = props
  emits('extHeight', dialogHeaderHeight + dialogFooterHeight)
})

onUnmounted(() => {
  stopElResizeFn && stopElResizeFn()
})
createDialogContext({
  redoDialogHeight: setDialogHeight,
})
watchEffect(() => {
  props.useWrapper && setDialogHeight()
})

watch(
  () => props.fullScreen,
  (v) => {
    setDialogHeight()
    if (!v) {
      realHeightRef.value = minRealHeightRef.value
    }
    else {
      minRealHeightRef.value = realHeightRef.value
    }
  },
)

async function setDialogHeight(bool = true) {
  if (!bool) {
    return
  }
  if (!props.visible) {
    return
  }
  const wrapperRefDom = unref(wrapperRef)
  if (!wrapperRefDom) {
    return
  }

  const bodyDom = (wrapperRefDom as any).$el.parentElement
  if (!bodyDom) {
    return
  }
  bodyDom.style.padding = '0'
  await nextTick()

  try {
    const dialogDom = bodyDom.parentElement
    if (!dialogDom) {
      return
    }

    const dialogRect = getComputedStyle(dialogDom as Element).marginTop
    const dialogTop = Number.parseInt(dialogRect)
    let maxHeight
        = window.innerHeight
        - dialogTop * 2
        - (props.footerOffset! || 0)
        - props.dialogHeaderHeight
        - props.dialogFooterHeight
    if (dialogTop < 40) {
      maxHeight -= 26
    }
    await nextTick()
    const spinEl: any = unref(spinRef)

    if (!spinEl) {
      return
    }
    await nextTick()
    // if (!realHeight) {
    realHeight = spinEl.scrollHeight
    if (props.fullScreen) {
      realHeightRef.value
          = window.innerHeight - props.dialogFooterHeight - props.dialogHeaderHeight - 28
    }
    else {
      realHeightRef.value = props.height
        ? props.height
        : realHeight > maxHeight
          ? maxHeight
          : realHeight
    }
    emits('heightChange', unref(realHeightRef))
  }
  catch (e) {
    console.error(e)
  }
}

defineExpose({
  setDialogHeight,
  setScrollTop: () => {
    nextTick(() => wrapperRef.value?.setScrollTop(0))
  },
})
</script>

<template>
  <el-scrollbar
    ref="wrapperRef" v-loading="loading" :element-loading-text="loadingTip"
    :wrap-style="{ minHeight: `${minHeight}px` }" :height="height" :max-height="realHeightRef"
  >
    <div ref="spinRef">
      <slot />
    </div>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-scrollbar {
  padding: 14px;
}
</style>
