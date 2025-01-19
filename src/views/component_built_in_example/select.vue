<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const select = ref('1')
</script>

<template>
  <div>
    <KPageHeader title="选择器" description="KSelect" />
    <KPageMain>
      <KSelect
        v-model="select"
        :options="[
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2', disabled: true },
          { label: '选项3', value: '3' },
        ]"
      />
    </KPageMain>
  </div>
</template>
