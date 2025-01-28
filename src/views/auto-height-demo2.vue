<script lang="ts" setup>
import { useKpuDrawer } from '@/ui/components/KpuDrawer/use-drawer.ts'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const list = ref<number[]>([])

const [Drawer, drawerApi] = useKpuDrawer({
  onCancel() {
    drawerApi.close()
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
