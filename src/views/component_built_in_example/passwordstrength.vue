<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const password = ref('')
</script>

<template>
  <div>
    <KPageHeader title="密码强度" description="KPasswordStrength" />
    <KPageMain>
      <div class="w-80 flex-col">
        <KInput v-model="password" placeholder="请输入密码" class="w-full" />
        <KPasswordStrength :password="password" class="mt-2" />
      </div>
    </KPageMain>
  </div>
</template>
