<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>

<template>
  <div>
    <KPageHeader title="分页" description="KPagination" />
    <KPageHeader>
      <KPagination :page="page" :size="size" :total="total" @page-change="(cpage:number) => page = cpage" />
    </KPageHeader>
  </div>
</template>
