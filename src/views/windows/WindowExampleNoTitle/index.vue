<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <PageHeader title="注意看，我是没有标题栏的">
    <HButton @click="appWindow.remove('WindowExampleNoTitle')">
      关闭当前窗口
    </HButton>
  </PageHeader>
</template>
