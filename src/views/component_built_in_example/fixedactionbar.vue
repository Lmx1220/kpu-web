<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const testHeight = ref(50)
</script>

<template>
  <div>
    <KPageHeader title="固定底部操作栏">
      <template #description>
        <div class="space-y-2">
          <p>KFixedActionBar</p>
          <p>避免因页面过长，导致操作按钮需要滚动到页面底部才能操作</p>
        </div>
      </template>
    </KPageHeader>
    <KPageMain>
      <div class="h-500" />
    </KPageMain>
    <KFixedActionBar>
      <div :style="`height: ${testHeight}px;`" />
      <ElSlider v-model="testHeight" />
    </KFixedActionBar>
  </div>
</template>
