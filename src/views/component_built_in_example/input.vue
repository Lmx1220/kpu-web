<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div>
    <KPageHeader title="输入框" description="KInput" />
    <KPageMain>
      <KInput v-model="value" placeholder="请输入内容" />
    </KPageMain>
  </div>
</template>
