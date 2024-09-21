<script setup lang="ts">
import { cn } from '@/utils/classNames.ts'
import { Dialog, DialogPanel, TransitionChild } from '@headlessui/vue'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<
    {
      class?: any
      closeClass?: any
      modal?: boolean
      open?: boolean
      showClose?: boolean
    }
  >(),
  { showClose: true },
)
const emits = defineEmits<{ close: [] }>()

// const delegatedProps = computed(() => {
//   const {
//     class: _,
//     modal: _modal,
//     open: _open,
//     showClose: __,
//     ...delegated
//   } = props
//
//   return delegated
// })

const contentRef = ref<InstanceType<typeof Dialog> | null>(null)

defineExpose({
  getContentRef: () => contentRef.value,
})
const overlayTransitionClass = ref({
  enter: 'ease-in-out duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in-out duration-500',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
})

const transitionClass = computed(() => {
  return {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95',
    enterTo: 'opacity-100 translate-y-0 lg-scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 lg-scale-100',
    leaveTo: 'opacity-0 translate-y-4 lg-translate-y-0 lg-scale-95',
  }
})
function close() {
  // console.log('close', arguments)
  emits('close')
}
</script>

<template>
  <Dialog class="fixed inset-0 z-2000 flex" @close="() => close">
    <TransitionChild
      v-if="open && modal" as="template" :class="overlayTransitionClass.enterFrom"
      v-bind="overlayTransitionClass"
    >
      <div class="fixed inset-0 bg-stone-2/75 backdrop-blur-sm transition-opacity dark-bg-stone-8/75" @click="close" />
    </TransitionChild>
    <TransitionChild as="template" v-bind="transitionClass">
      <DialogPanel
        ref="contentRef"
        :class="
          cn(
            'bg-white fixed z-[1000] w-full p-6 shadow-lg outline-none sm:rounded-xl',
            props.class,
          )
        "
      >
        <slot />
        <div
          v-if="showClose"
          :class="
            cn(
              'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:bg-accent hover:text-accent-foreground bg-transparent text-foreground/80 flex-center absolute right-3 top-3 h-6 w-6 rounded-full px-1 text-lg opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none',
              props.closeClass,
            )
          "
        >
          <SvgIcon name="i-carbon:close" cursor-pointer @click="close" />
        </div>
      </DialogPanel>
    </TransitionChild>
  </Dialog>
</template>
