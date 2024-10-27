<script lang="ts" setup>
import { useVbenDrawer } from '@/ui-kit'
import { ref } from 'vue'
import Message from 'vue-m-message'

const list = ref<number[]>([])

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close()
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
  drawerApi.setState({ loading: true })
  setTimeout(() => {
    list.value = Array.from({ length: len }, (_v, k) => k + 1)
    drawerApi.setState({ loading: false })
  }, 2000)
}
</script>

<template>
  <Drawer title="自动计算高度" title-tooltip="标题提示内容">
    <template #extra>
      extra
    </template>
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
  </Drawer>
</template>
