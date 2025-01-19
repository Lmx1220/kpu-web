<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const scrollbar = ref(true)
const mask = ref(false)
</script>

<template>
  <div>
    <KPageHeader title="滚动区域" description="KScrollArea" />
    <KPageMain>
      <div class="flex-col-start gap-4">
        <div class="flex-col-start gap-4">
          <div class="flex-center-start gap-4">
            <div class="text-sm">
              显示滚动条
            </div>
            <KSwitch v-model="scrollbar" />
          </div>
          <div class="flex-center-start gap-4">
            <div class="text-sm">
              显示遮罩
            </div>
            <KSwitch v-model="mask" />
          </div>
        </div>
        <KScrollArea :scrollbar :mask class="h-72 w-48 border rounded-md">
          <div v-for="tag in 20" :key="tag" class="p-4 text-sm">
            {{ tag }}
          </div>
        </KScrollArea>
        <KScrollArea horizontal :scrollbar :mask class="w-96 border rounded-md">
          <div class="flex-center-start">
            <div v-for="tag in 20" :key="tag" class="h-16 w-16 flex-center text-sm">
              {{ tag }}
            </div>
          </div>
        </KScrollArea>
      </div>
    </KPageMain>
  </div>
</template>
