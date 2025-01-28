<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <div>
    <KpuPageHeader title="复选框" description="KCheckbox" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KpuCheckbox v-model="checked">
          复选框
        </KpuCheckbox>
        {{ checked }}
      </div>
    </KpuPageMain>
  </div>
</template>
