<script lang="ts" setup>
import type { ExtendedModalApi, ModalProps } from './modal'
import { ELEMENT_ID_MAIN_CONTENT } from '@/enums/globals'

import KpuButton from '@/ui/components/KpuButton/index.vue'
import HelpTooltip from '@/ui/components/KpuTooltip/help-tooltip.vue'
import { cn } from '@/utils'
import { globalShareState } from '@/utils/global-state'
import { Expand, Shrink } from 'lucide-vue-next'
import { VisuallyHidden } from 'radix-vue'

import { computed, nextTick, provide, ref, useId, watch } from 'vue'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog'
import { useDraggable } from './use-draggable'

interface Props extends ModalProps {
  modalApi?: ExtendedModalApi
}

const props = withDefaults(defineProps<Props>(), {
  appendToMain: false,
  modalApi: undefined,
})

const slots = defineSlots<{
  'header'?: () => VNode
  'default'?: () => VNode
  'title'?: () => VNode
  'titleTooltip'?: () => VNode
  'description'?: () => VNode
  'footer'?: () => VNode
  'prepend-footer'?: () => VNode
  'cancelText'?: () => VNode
  'confirmText'?: () => VNode
  'append-footer'?: () => VNode
}>()

const components = globalShareState.getComponents()

const contentRef = ref()
const wrapperRef = ref<HTMLElement>()
const dialogRef = ref()
const headerRef = ref()
const footerRef = ref()

// defineExpose({
//   areaRef: wrapperRef,
// })

const id = useId()

provide('DISMISSABLE_MODAL_ID', id)

const { $t } = useSimpleLocale()
const { isMobile } = useIsMobile()
const state = props.modalApi?.useStore?.()

const {
  appendToMain,
  bordered,
  cancelText,
  centered,
  class: modalClass,
  closable,
  closeOnClickModal,
  closeOnPressEscape,
  confirmDisabled,
  confirmLoading,
  confirmText,
  contentClass,
  description,
  draggable,
  footer: showFooter,
  footerClass,
  fullscreen,
  fullscreenButton,
  header,
  headerClass,
  loading: showLoading,
  modal,
  openAutoFocus,
  overlayBlur,
  showCancelButton,
  showConfirmButton,
  submitting,
  title,
  titleTooltip,
  zIndex,
} = usePriorityValues(props, state)

const shouldFullscreen = computed(
  // () => (fullscreen.value && header.value) || isMobile.value,
  () => (fullscreen.value) || isMobile.value,
)

const shouldDraggable = computed(
  () => draggable.value && !shouldFullscreen.value && header.value,
)

const { dragging, transform } = useDraggable(
  dialogRef,
  headerRef,
  shouldDraggable,
)

watch(
  () => state?.value?.isOpen,
  async (v) => {
    if (v) {
      await nextTick()
      if (!contentRef.value) {
        return
      }
      const innerContentRef = contentRef.value.getContentRef()
      dialogRef.value = innerContentRef.$el
      // reopen modal reassign value
      const { offsetX, offsetY } = transform
      dialogRef.value.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    }
  },
)

watch(
  () => [showLoading.value, submitting.value],
  ([l, s]) => {
    if ((s || l) && wrapperRef.value) {
      wrapperRef.value.scrollTo({
        // behavior: 'smooth',
        top: 0,
      })
    }
  },
)

function handleFullscreen() {
  props.modalApi?.setState((prev) => {
    // if (prev.fullscreen) {
    //   resetPosition();
    // }
    return { ...prev, fullscreen: !fullscreen.value }
  })
}
function interactOutside(e: Event) {
  if (!closeOnClickModal.value || submitting.value) {
    e.preventDefault()
    e.stopPropagation()
  }
}
function escapeKeyDown(e: KeyboardEvent) {
  if (!closeOnPressEscape.value || submitting.value) {
    e.preventDefault()
  }
}

function handerOpenAutoFocus(e: Event) {
  if (!openAutoFocus.value) {
    e?.preventDefault()
  }
}

// pointer-down-outside
function pointerDownOutside(e: Event) {
  const target = e.target as HTMLElement
  const isDismissableModal = target?.dataset.dismissableModal
  if (
    !closeOnClickModal.value
    || isDismissableModal !== id
    || submitting.value
  ) {
    e.preventDefault()
    e.stopPropagation()
  }
}

function handleFocusOutside(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}
const getAppendTo = computed(() => {
  return appendToMain.value ? `#${ELEMENT_ID_MAIN_CONTENT}` : undefined
})
</script>

<template>
  <Dialog
    :modal="false"
    :open="state?.isOpen"
    @update:open="() => (!submitting ? modalApi?.close() : undefined)"
  >
    <DialogContent
      ref="contentRef"
      :append-to="getAppendTo"
      :class="
        cn(
          'left-0 right-0 top-[10vh] mx-auto flex max-h-[80%] w-[520px] flex-col p-0 sm:rounded-lg',
          modalClass,
          {
            'border-border border': bordered,
            'shadow-3xl': !bordered,
            'left-0 top-0 size-full max-h-full !translate-x-0 !translate-y-0':
              shouldFullscreen,
            'top-1/2 !-translate-y-1/2': centered && !shouldFullscreen,
            'duration-300': !dragging,
          },
        )
      "
      :modal="modal"
      :open="state?.isOpen"
      :show-close="submitting ? false : closable"
      :z-index="zIndex"
      :overlay-blur="overlayBlur"
      close-class="top-3"
      @close-auto-focus="handleFocusOutside"
      @closed="() => modalApi?.onClosed()"
      @escape-key-down="escapeKeyDown"
      @focus-outside="handleFocusOutside"
      @interact-outside="interactOutside"
      @open-auto-focus="handerOpenAutoFocus"
      @opened="() => modalApi?.onOpened()"
      @pointer-down-outside="pointerDownOutside"
    >
      <DialogHeader
        ref="headerRef"
        :class="
          cn(
            'px-5 py-4',
            {
              'border-b': bordered,
              'hidden': !header,
              'cursor-move select-none': shouldDraggable,
            },
            headerClass,
          )
        "
      >
        <VisuallyHidden v-if="!!slots.header">
          <DialogTitle />
          <DialogDescription />
        </VisuallyHidden>
        <slot name="header">
          <DialogTitle v-if="title" class="text-left">
            <slot name="title">
              {{ title }}

              <slot v-if="titleTooltip" name="titleTooltip">
                <HelpTooltip trigger-class="pb-1">
                  {{ titleTooltip }}
                  <template #trigger>
                    sss
                  </template>
                </HelpTooltip>
              </slot>
            </slot>
          </DialogTitle>
          <DialogDescription v-if="description">
            <slot name="description">
              {{ description }}
            </slot>
          </DialogDescription>
          <VisuallyHidden v-if="!title || !description">
            <DialogTitle v-if="!title" />
            <DialogDescription v-if="!description" />
          </VisuallyHidden>
        </slot>
      </DialogHeader>
      <div
        ref="wrapperRef"
        :class="
          cn('relative min-h-40 flex-1 overflow-y-auto p-3', contentClass, {
            'overflow-hidden': showLoading || submitting,
          })
        "
      >
        <!--        <KLoading -->
        <!--          v-if="showLoading || submitting" -->
        <!--          class="size-full h-auto min-h-full" -->
        <!--          spinning -->
        <!--        /> -->
        <div
          v-if="showLoading || submitting"
          class="absolute inset-0 z-1000 size-full flex-center bg-popover/75"
        >
          <KpuIcon name="i-line-md:loading-twotone-loop" :size="36" />
        </div>
        <slot />
      </div>

      <KpuIconButton
        v-if="fullscreenButton"
        class="absolute right-10 top-3 size-6 flex-center rounded-sm px-1 text-lg text-foreground/80 opacity-70 transition-opacity hidden disabled:pointer-events-none sm:block hover:bg-accent hover:text-accent-foreground hover:opacity-100 focus:outline-none"
        @click="handleFullscreen"
      >
        <Shrink v-if="fullscreen" class="size-3.5" />
        <Expand v-else class="size-3.5" />
      </KpuIconButton>

      <DialogFooter
        v-if="showFooter"
        ref="footerRef"
        :class="
          cn(
            'flex-row items-center justify-end p-2',
            {
              'border-t': bordered,
            },
            footerClass,
          )
        "
      >
        <slot name="prepend-footer" />
        <slot name="footer">
          <component
            :is="components.DefaultButton || KpuButton"
            v-if="showCancelButton"
            variant="ghost"
            :disabled="submitting"
            @click="() => modalApi?.onCancel()"
          >
            <slot name="cancelText">
              {{ cancelText || $t('cancel') }}
            </slot>
          </component>

          <component
            :is="components.PrimaryButton || KpuButton"
            v-if="showConfirmButton"
            :disabled="confirmDisabled"
            :loading="confirmLoading || submitting"
            @click="() => modalApi?.onConfirm()"
          >
            <slot name="confirmText">
              {{ confirmText || $t('confirm') }}
            </slot>
          </component>
        </slot>
        <slot name="append-footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
