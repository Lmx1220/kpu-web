<script lang="ts" setup>
import { useKpuModal } from '@/ui/components/KModal/use-modal.ts'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const list = ref<number[]>([])

const [Modal, modalApi] = useKpuModal({
  // draggable: true,
  onCancel() {
    modalApi.close()
  },
  onConfirm() {
    toast.info('onConfirm', {
      position: 'top-center',
    })
    // console.log('onConfirm')
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      handleUpdate(10)
    }
  },
})

function handleUpdate(len: number) {
  modalApi.setState({ loading: true })
  setTimeout(() => {
    list.value = Array.from({ length: len }, (_v, k) => k + 1)
    modalApi.setState({ loading: false })
  }, 2000)
}
</script>

<template>
  <Modal title="自动计算高度" title-tooltip="标题提示内容">
    <div
      v-for="item in list"
      :key="item"
      class="h-[220px] w-full flex-center bg-zinc-100 even:bg-zinc-200"
    >
      {{ item }}
    </div>
    <template #prepend-footer>
      <ElButton link @click="handleUpdate(6)">
        点击更新数据
      </ElButton>
    </template>
  </Modal>
</template>
