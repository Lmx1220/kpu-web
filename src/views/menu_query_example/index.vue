<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <KpuPageHeader title="带参导航" />
    <KpuPageMain>
      {{ route.query }}
    </KpuPageMain>
  </div>
</template>
