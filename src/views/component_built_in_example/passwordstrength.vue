<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const password = ref('')
</script>

<template>
  <div>
    <KpuPageHeader title="密码强度" description="KpuPasswordStrength" />
    <KpuPageMain>
      <div class="w-80 flex-col">
        <KpuInput v-model="password" placeholder="请输入密码" class="w-full" />
        <KpuPasswordStrength :password="password" class="mt-2" />
      </div>
    </KpuPageMain>
  </div>
</template>
