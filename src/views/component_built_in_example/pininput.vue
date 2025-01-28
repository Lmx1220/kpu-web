<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const pin = ref('')
</script>

<template>
  <div>
    <KpuPageHeader title="数字输入框" description="KpuPinInput" />
    <KpuPageMain>
      <KpuPinInput v-model="pin" />
    </KpuPageMain>
  </div>
</template>
