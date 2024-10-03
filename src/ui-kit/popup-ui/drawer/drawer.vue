<script lang="ts" setup>
import type { DrawerProps, ExtendedDrawerApi } from './drawer'

import { VbenLoading } from '@/ui-kit'
import { cn } from '@/utils/classNames.ts'
import { useI18n } from '@/utils/composables/useI18n.ts'
import { provide, ref, useId, watch } from 'vue'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './components'

interface Props extends DrawerProps {
  drawerApi?: ExtendedDrawerApi
}

const props = withDefaults(defineProps<Props>(), {
  drawerApi: undefined,
})

const id = useId()
provide('DISMISSABLE_DRAWER_ID', id)

const wrapperRef = ref<HTMLElement>()
const { t: $t } = useI18n()
const { isMobile } = useIsMobile()

const state = props.drawerApi?.useStore?.()

const {
  cancelText,
  class: drawerClass,
  closable,
  closeOnClickModal,
  closeOnPressEscape,
  confirmLoading,
  confirmText,
  contentClass,
  description,
  footer: showFooter,
  loading: showLoading,
  modal,
  openAutoFocus,
  showCancelButton,
  showConfirmButton,
  title,
  titleTooltip,
} = usePriorityValues(props, state)

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

function interactOutside(e: Event) {
  if (!closeOnClickModal.value) {
    e.preventDefault()
  }
}
function escapeKeyDown(e: KeyboardEvent) {
  if (!closeOnPressEscape.value) {
    e.preventDefault()
  }
}
// pointer-down-outside
function pointerDownOutside(e: Event) {
  const target = e.target as HTMLElement
  const dismissableDrawer = target?.dataset.dismissableDrawer
  if (!closeOnClickModal.value || dismissableDrawer !== id) {
    e.preventDefault()
  }
}

function handerOpenAutoFocus(e: Event) {
  if (!openAutoFocus.value) {
    e?.preventDefault()
  }
}

function handleFocusOutside(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}
</script>

<template>
  <Sheet
    :modal="false"
    :open="state?.isOpen"
    @update:open="() => drawerApi?.close()"
  >
    <SheetContent
      :class="
        cn('flex w-[520px] flex-col', drawerClass, {
          '!w-full': isMobile,
        })
      "
      :modal="modal"
      :open="state?.isOpen"
      @close-auto-focus="handleFocusOutside"
      @escape-key-down="escapeKeyDown"
      @focus-outside="handleFocusOutside"
      @interact-outside="interactOutside"
      @open-auto-focus="handerOpenAutoFocus"
      @pointer-down-outside="pointerDownOutside"
    >
      <SheetHeader
        :class="
          cn('!flex flex-row items-center justify-between border-zinc-200 border-b border-b-style-solid px-6 py-5', {
            'px-4 py-3': closable,
          })
        "
      >
        <div>
          <SheetTitle v-if="title" class="text-left">
            <slot name="title">
              {{ title }}

              <HTooltip class="size-5 inline-flex cursor-pointer pb-1 text-dark-900/80 hover:text-dark-900" :text="titleTooltip">
                <SvgIcon name="i-lucide:circle-help" />
              </HTooltip>
            </slot>
          </SheetTitle>
          <SheetDescription v-if="description" class="mt-1 text-xs">
            <slot name="description">
              {{ description }}
            </slot>
          </SheetDescription>
        </div>

        <!--        <VisuallyHidden v-if="!title || !description"> -->
        <!--          <SheetTitle v-if="!title" /> -->
        <!--          <SheetDescription v-if="!description" /> -->
        <!--        </VisuallyHidden> -->

        <!--   空白占位     -->
        <SheetTitle
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
        <SheetDescription
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

        <div class="flex-center">
          <slot name="extra" />
          <SheetClose
            v-if="closable"
            as-child
            class="text-foreground/80 data-[state=open]:text-muted-foreground hover:text-accent-foreground h-6 w-6 flex-center rounded-full b-none bg-transparent px-1 text-lg opacity-70 transition-opacity disabled:pointer-events-none data-[state=open]:bg-zinc-100 hover:bg-zinc-100 hover:opacity-100 focus:outline-none"
          >
            <!--            <VbenIconButton> -->
            <SvgIcon name="i-carbon:close" cursor-pointer class="text-4" />
            <!--              <X class="size-4" /> -->
            <!--            </VbenIconButton> -->
          </SheetClose>
        </div>
      </SheetHeader>

      <div
        ref="wrapperRef"
        :class="
          cn('relative flex-1 overflow-y-auto p-3', contentClass, {
            'overflow-hidden': showLoading,
          })
        "
      >
        <VbenLoading v-if="showLoading" class="size-full" spinning />

        <slot />
      </div>

      <SheetFooter
        v-if="showFooter"
        class="w-full flex-row items-center justify-end border-t border-zinc-200 border-t-style-solid p-2 px-3"
      >
        <slot name="prepend-footer" />
        <slot name="footer">
          <HButton
            v-if="showCancelButton"
            class="bg-transparent"
            variant="ghost"
            @click="() => drawerApi?.onCancel()"
          >
            <slot name="cancelText">
              {{ cancelText || $t('common.cancelText') }}
            </slot>
          </HButton>
          <HButton
            v-if="showConfirmButton"
            :loading="confirmLoading"
            @click="() => drawerApi?.onConfirm()"
          >
            <slot name="confirmText">
              {{ confirmText || $t('common.okText') }}
            </slot>
          </HButton>
        </slot>
        <slot name="append-footer" />
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
