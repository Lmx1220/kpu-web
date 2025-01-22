<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import { useKpuDrawer } from '@/ui/components/KDrawer/use-drawer.ts'
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from '@/components/ui/avatar'
// import { useVbenDrawer, useVbenModal } from '@/ui-kit'
import { useKpuModal } from '@/ui/components/KModal/use-modal.ts'

import AutoHeightDemo2 from './auto-height-demo2.vue'
import AutoHeightDemo from './auto-height-demo.vue'

defineOptions({
  name: 'Home',
})
const [AutoHeightModal, autoHeightModalApi] = useKpuModal({
  connectedComponent: AutoHeightDemo,
})
const [AutoHeightDrawer2, autoHeightDrawerApi] = useKpuDrawer({
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
    <kPageMain class="kpu-j-vxe-table">
      <el-button @click="openAutoHeightModal">
        打开Modal
        <KIcon name="i-mdi:draw" />
      </el-button>
      <el-button @click="openAutoHeightDrawer">
        打开Drawer
      </el-button>
    </kPageMain>
    sss
    <AutoHeightModal />
    <AutoHeightDrawer2 />
    <!--    <Avatar> -->
    <!--      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> -->
    <!--      <AvatarFallback>CN</AvatarFallback> -->
    <!--    </Avatar> -->
  </div>
</template>
