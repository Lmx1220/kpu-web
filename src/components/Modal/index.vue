<script setup lang="ts">
import type { ExtendedModalApi, ModalProps } from '@/utils/model'
import { cn } from '@/utils/classNames.ts'
import { useIsMobile } from '@/utils/composables/use-is-mobile.ts'
import { usePriorityValues } from '@/utils/composables/use-priority-value.ts'
import { useI18n } from '@/utils/composables/useI18n.ts'
import { useModalDraggable } from '@/utils/model/use-modal-draggable.ts'
import { TransitionRoot } from '@headlessui/vue'
import DialogContent from './components/DialogContent.vue'
import DialogDescription from './components/DialogDescription.vue'
import DialogFooter from './components/DialogFooter.vue'
import DialogHeader from './components/DialogHeader.vue'
import DialogTitle from './components/DialogTitle.vue'

interface Props extends ModalProps {
  modalApi?: ExtendedModalApi
}
defineOptions({
  name: 'Modal',
})

const props = withDefaults(defineProps<Props>(), {
  modalApi: undefined,
})

// const emits = defineEmits<{ close: [] }>()
const contentRef = ref()
const wrapperRef = ref<HTMLElement>()
const dialogRef = ref()
const headerRef = ref()
const footerRef = ref()

const { t: $t } = useI18n()
const { isMobile } = useIsMobile()
const state = props.modalApi?.useStore?.()

const {
  cancelText,
  centered,
  class: modalClass,
  closable,
  closeOnClickModal,
  closeOnPressEscape,
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
  showCancelButton,
  showConfirmButton,
  title,
  titleTooltip,
} = usePriorityValues(props, state)

const shouldFullscreen = computed(
  () => (fullscreen.value && header.value) || isMobile.value,
)

const shouldDraggable = computed(
  () => {
    return draggable.value && !shouldFullscreen.value && header.value
  },
)

const { dragging, transform } = useModalDraggable(
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
  () => showLoading.value,
  (v) => {
    if (v && wrapperRef.value) {
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
  if (!closeOnClickModal.value) {
    e.preventDefault()
    e.stopPropagation()
  }
}
function escapeKeyDown(e: KeyboardEvent) {
  if (!closeOnPressEscape.value) {
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
  const isDismissableModal = !!target?.dataset.dismissableModal
  if (!closeOnClickModal.value || !isDismissableModal) {
    e.preventDefault()
    e.stopPropagation()
  }
}

function handleFocusOutside(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}
</script>

<template>
  <TransitionRoot as="template" appear :show="state?.isOpen">
    <DialogContent
      ref="contentRef"
      :class="
        cn(
          'border-zinc-200 left-0 right-0 top-[10vh] mx-auto flex max-h-[80%] w-[520px] flex-col border-solid border p-0',
          modalClass,
          {
            'left-0 top-0 size-full max-h-full !translate-x-0 !translate-y-0':
              shouldFullscreen,
            'top-1/2 !-translate-y-1/2': centered && !shouldFullscreen,
            'duration-300': !dragging,
          },
        )
      "
      :modal="modal"
      :open="state?.isOpen"
      :show-close="closable"
      close-class="top-3"
      @close="() => modalApi?.close()"
      @close-auto-focus="handleFocusOutside"
      @escape-key-down="escapeKeyDown"
      @focus-outside="handleFocusOutside"
      @interact-outside="interactOutside"
      @open-auto-focus="handerOpenAutoFocus"
      @pointer-down-outside="pointerDownOutside"
    >
      <DialogHeader
        ref="headerRef"
        :class="cn('px-5 py-4 border-b-stone/15  border-0 b-b-1 border-solid border-b-zinc-200', {
                     'hidden': !header,
                     'cursor-move select-none': shouldDraggable,
                   },
                   headerClass)"
      >
        <DialogTitle v-if="title" class="text-left">
          <slot name="title">
            {{ title }}

            <slot v-if="titleTooltip" name="titleTooltip">
              <HTooltip trigger-class="pb-1">
                {{ titleTooltip }}
              </HTooltip>
            </slot>
          </slot>
        </DialogTitle>
        <DialogDescription v-if="description">
          <slot name="description">
            {{ description }}
          </slot>
        </DialogDescription>

        <DialogTitle
          v-if="!title" :style="{
            // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
            position: 'absolute',
            border: 0,
            width: '1px',
            display: 'inline-block',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            wordWrap: 'normal',
          }"
        />
        <DialogDescription
          v-if="!description" :style="{
            // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
            position: 'absolute',
            border: 0,
            width: '1px',
            display: 'inline-block',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            wordWrap: 'normal',
          }"
        />
      </DialogHeader>
      <div
        ref="wrapperRef"
        :class="
          cn('relative min-h-40 flex-1 overflow-y-auto p-3', contentClass, {
            'overflow-hidden': showLoading,
          })
        "
      >
        <!--        <VbenLoading -->
        <!--          v-if="showLoading" -->
        <!--          class="size-full h-auto min-h-full" -->
        <!--          spinning -->
        <!--        /> -->
        <slot />
      </div>
      <div
        v-if="fullscreenButton"
        class="absolute right-10 top-3 size-6 flex-center rounded-full bg-transparent px-1 text-lg text-zinc-950/80 opacity-70 transition-opacity hidden disabled:pointer-events-none sm:block hover:bg-zinc-100 hover:text-zinc-900 hover:opacity-100 focus:outline-none"
        @click="handleFullscreen"
      >
        <svg-icon v-if="fullscreen" name="i-lucide:shrink" class="size-3.5!" />
        <svg-icon v-else name="i-lucide:expand" class="size-3.5!" />
      </div>
      <!--              <div v-if="showFooter" flex="~ items-center justify-end" px-4 py-3 border-t="~ solid stone/15"> -->
      <!--                <slot name="footer" /> -->
      <!--              </div> -->
      <DialogFooter
        v-if="showFooter"
        ref="footerRef"
        :class="
          cn('flex-row items-center justify-end b-t-solid border-t p-2 border-t-zinc-200', footerClass)
        "
      >
        <slot name="prepend-footer" />
        <slot name="footer">
          <HButton
            v-if="showCancelButton"
            class="bg-transparent"
            variant="ghost"
            @click="() => modalApi?.onCancel()"
          >
            <slot name="cancelText">
              {{ cancelText || $t('common.cancelText') }}
            </slot>
          </HButton>
          <HButton
            v-if="showConfirmButton"
            :loading="confirmLoading"
            @click="() => modalApi?.onConfirm()"
          >
            <slot name="confirmText">
              {{ confirmText || $t('common.okText') }}
            </slot>
          </HButton>
        </slot>
        <slot name="append-footer" />
      </DialogFooter>
    </DialogContent>
  </TransitionRoot>
</template>
