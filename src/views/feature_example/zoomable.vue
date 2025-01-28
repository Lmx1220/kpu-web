<script setup lang="ts">
import imgLogo from '@/assets/images/logo.png'

const dialog = ref(false)
</script>

<template>
  <div>
    <KpuPageHeader title="图片预览" />
    <KpuPageMain>
      <img v-zoomable :src="imgLogo" block h-20 w-20 alt="">
    </KpuPageMain>
    <KpuPageMain>
      <ElButton @click="() => dialog = true">
        打开对话框
      </ElButton>
      <ElDialog v-model="dialog" title="Tips" width="30%">
        <img v-zoomable :src="imgLogo" block h-20 w-20 alt="">
      </ElDialog>
    </KpuPageMain>
  </div>
</template>
