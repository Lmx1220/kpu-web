<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const drawer = ref(false)
</script>

<template>
  <div>
    <KPageHeader title="抽屉" description="KDrawer" />
    <KPageMain>
      <KButton @click="drawer = true">
        打开
      </KButton>
      <KDrawer v-model="drawer" title="标题" description="这里是一段描述介绍">
        这里是 drawer 内容
      </KDrawer>
    </KPageMain>
  </div>
</template>
