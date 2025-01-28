<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const switchVal = ref(false)
</script>

<template>
  <div>
    <KpuPageHeader title="开关" description="KpuSwitch" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KpuSwitch v-model="switchVal" />
        <KpuSwitch v-model="switchVal" on-icon="ri:sun-line" off-icon="ri:moon-line" />
      </div>
    </KpuPageMain>
  </div>
</template>
