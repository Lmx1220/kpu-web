<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const switchVal = ref(false)
</script>

<template>
  <div>
    <KPageHeader title="开关" description="KSwitch" />
    <KPageMain>
      <div class="flex gap-4">
        <KSwitch v-model="switchVal" />
        <KSwitch v-model="switchVal" on-icon="ri:sun-line" off-icon="ri:moon-line" />
      </div>
    </KPageMain>
  </div>
</template>
