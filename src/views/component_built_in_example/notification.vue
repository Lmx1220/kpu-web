<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { kpuNotification } from '@/ui/components/KpuNotification'

function showNotification(type?: 'html') {
  if (type === 'html') {
    kpuNotification({
      title: 'Kpu-admin 杰出的管理系统框架',
      description: h('null', {
        innerHTML: '<p class="text-red-500">开箱即用，提供舒适开发体验</p>',
      }),
      duration: 3000,
    })
  }
  else {
    kpuNotification({
      title: 'Kpu-admin 杰出的管理系统框架',
      description: '开箱即用，提供舒适开发体验',
      duration: 3000,
    })
  }
}
</script>

<template>
  <div>
    <KpuPageHeader title="通知" description="KpuNotification" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KpuButton @click="showNotification()">
          默认
        </KpuButton>
        <KpuButton @click="showNotification('html')">
          支持 HTML 代码
        </KpuButton>
      </div>
    </KpuPageMain>
  </div>
</template>
