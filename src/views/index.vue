<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import { useVbenDrawer, useVbenModal } from '@/ui-kit'
import AutoHeightDemo from './auto-height-demo.vue'
import AutoHeightDemo2 from './auto-height-demo2.vue'

defineOptions({
  name: 'Home',
})
const [AutoHeightModal, autoHeightModalApi] = useVbenModal({
  connectedComponent: AutoHeightDemo,
})
const [AutoHeightDrawer2, autoHeightDrawerApi] = useVbenDrawer({
  connectedComponent: AutoHeightDemo2,
})

function openAutoHeightModal() {
  autoHeightModalApi.open()
}
function openAutoHeightDrawer() {
  autoHeightDrawerApi.open()
}
</script>

<template>
  <div>
    <PageMain class="kpu-j-vxe-table">
      <el-button @click="openAutoHeightModal">
        打开Modal
      </el-button>
      <el-button @click="openAutoHeightDrawer">
        打开Drawer
      </el-button>
    </PageMain>

    <AutoHeightModal />
    <AutoHeightDrawer2 />
  </div>
</template>
