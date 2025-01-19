<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const pin = ref('')
</script>

<template>
  <div>
    <KPageHeader title="数字输入框" description="KPinInput" />
    <KPageMain>
      <KPinInput v-model="pin" />
    </KPageMain>
  </div>
</template>
