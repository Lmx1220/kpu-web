<script lang="ts" setup>
import { Dialog, DialogDescription, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    appear?: boolean
    side?: 'left' | 'right'
    title?: string
    preventClose?: boolean
    overlay?: boolean
  }>(),
  {
    modelValue: false,
    appear: false,
    side: 'right',
    preventClose: false,
    overlay: true,
  },
)

const emits = defineEmits<{
  'update:modelValue': [boolean]
  'close': []
}>()

const slots = useSlots()

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
    enter: 'transform transition ease-in-out duration-300',
    leave: 'transform transition ease-in-out duration-200',
    enterFrom: props.side === 'left' ? '-translate-x-full' : 'translate-x-full',
    enterTo: 'translate-x-0',
    leaveFrom: 'translate-x-0',
    leaveTo: props.side === 'left' ? '-translate-x-full' : 'translate-x-full',
  }
})

const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

function close() {
  isOpen.value = false
  emits('close')
}
</script>

<template>
  <TransitionRoot :appear="appear" :show="isOpen" as="template">
    <Dialog
      :class="{ 'justify-end': side === 'right' }" class="fixed inset-0 flex z-2000"
      @close="!preventClose && close()"
    >
      <TransitionChild :appear="appear" as="template" v-bind="overlayTransitionClass">
        <div
          :class="{ 'backdrop-blur-sm': overlay }"
          class="fixed inset-0 transition-opacity bg-stone-2/75 dark:bg-stone-8/75"
        />
      </TransitionChild>
      <TransitionChild :appear="appear" as="template" v-bind="transitionClass">
        <DialogPanel bg-white dark:bg-stone-8 flex flex-1 flex-col focus:outline-none max-w-md relative w-full w-screen>
          <div border-b="~ solid stone/15" flex="~ items-center justify-between" p-4 text-6>
            <DialogTitle dark:text-white m-0 text-dark text-lg>
              {{ title }}
            </DialogTitle>
            <SvgIcon cursor-pointer name="carbon:close" @click="close" />
          </div>
          <DialogDescription flex-1 m-0 of-y-hidden>
            <OverlayScrollbarsComponent
              :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" class="h-full p-4"
              defer
            >
              <slot />
            </OverlayScrollbarsComponent>
          </DialogDescription>
          <div v-if="!!slots.footer" border-t="~ solid stone/15" flex="~ items-center justify-end" px-3 py-2>
            <slot name="footer" />
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
