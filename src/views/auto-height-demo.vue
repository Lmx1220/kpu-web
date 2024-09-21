<script lang="ts" setup>
import { useVbenModal } from '@/utils/model'
import { ref } from 'vue'
import Message from 'vue-m-message'

const list = ref<number[]>([])

const [Modal, modalApi] = useVbenModal({
  // draggable: true,
  onCancel() {
    modalApi.close()
  },
  onConfirm() {
    Message.info('onConfirm', {
      zIndex: 2001,
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
  list.value = []
  setTimeout(() => {
    list.value = Array.from({ length: len }, (_v, k) => k + 1)
    modalApi.setState({ loading: false })
  }, 2000)
}
</script>

<template>
  <Modal title="自动计算高度">
    <div
      v-for="item in list"
      :key="item"
      class="bg-muted even:bg-heavy h-[220px] w-full flex-center"
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
