<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const value = ref('')
</script>

<template>
  <div>
    <KpuPageHeader title="输入框" description="KInput" />
    <KpuPageMain>
      <KpuInput v-model="value" placeholder="请输入内容" />
    </KpuPageMain>
  </div>
</template>
