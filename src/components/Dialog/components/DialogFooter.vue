<script setup lang="ts">
import type { ButtonProps } from 'element-plus'
import type { PropType } from 'vue'

interface Props {
  okText?: string
  cancelText?: string
  okType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  showOkBtn?: boolean
  showCancelBtn?: boolean
  confirmLoading?: boolean
  cancelButtonProps?: PropType<Partial<ButtonProps>>
  okButtonProps?: PropType<Partial<ButtonProps>>
}

defineOptions({
  name: 'BasicDialogFooter',
})
withDefaults(defineProps<Props>(), {
  // okText: '确定',
  // cancelText: '取消',
  // okType: 'primary',
  // showOkBtn: true,
  // showCancelBtn: true,
  // confirmLoading: false,
  // cancelButtonProps: () => ({}),
  // okButtonProps: () => ({}),
})
const emits = defineEmits<{
  ok: [Event]
  cancel: [Event]
}>()

function handleOk(e: Event) {
  emits('ok', e)
}

function handleCancel(e: Event) {
  emits('cancel', e)
}
</script>

<template>
  <div>
    <slot name="insertFooter" />
    <ElButton v-if="showCancelBtn" v-bind="cancelButtonProps" @click="handleCancel">
      {{ cancelText }}
    </ElButton>
    <slot name="centerFooter" />
    <ElButton
      v-if="showOkBtn"
      :type="okType"
      :loading="confirmLoading"
      v-bind="okButtonProps"
      @click="handleOk"
    >
      {{ okText }}
    </ElButton>
    <slot name="appendFooter" />
  </div>
</template>
