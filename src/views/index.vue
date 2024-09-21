<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import { useVbenModal } from '@/utils/model'
import AutoHeightDemo from './auto-height-demo.vue'

defineOptions({
  name: 'Home',
})
const [AutoHeightModal, autoHeightModalApi] = useVbenModal({
  connectedComponent: AutoHeightDemo,
})
function openAutoHeightModal() {
  autoHeightModalApi.open()
}
</script>

<template>
  <div>
    <PageMain class="kpu-j-vxe-table">
      <el-button @click="openAutoHeightModal">
        Dakai
      </el-button>
    </PageMain>

    <AutoHeightModal />
  </div>
</template>
