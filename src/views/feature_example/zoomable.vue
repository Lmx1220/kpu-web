<script setup lang="ts">
import imgLogo from '@/assets/images/logo.png'

const dialog = ref(false)
</script>

<template>
  <div>
    <KPageHeader title="图片预览" />
    <KPageMain>
      <img v-zoomable :src="imgLogo" block h-20 w-20 alt="">
    </KPageMain>
    <KPageMain>
      <ElButton @click="() => dialog = true">
        打开对话框
      </ElButton>
      <ElDialog v-model="dialog" title="Tips" width="30%">
        <img v-zoomable :src="imgLogo" block h-20 w-20 alt="">
      </ElDialog>
    </KPageMain>
  </div>
</template>
