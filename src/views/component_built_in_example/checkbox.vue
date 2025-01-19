<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <div>
    <KPageHeader title="复选框" description="KCheckbox" />
    <KPageMain>
      <div class="flex gap-4">
        <KCheckbox v-model="checked">
          复选框
        </KCheckbox>
        {{ checked }}
      </div>
    </KPageMain>
  </div>
</template>
