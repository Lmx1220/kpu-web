<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <KPageHeader title="带参导航" />
    <KPageMain>
      {{ route.query }}
    </KPageMain>
  </div>
</template>
