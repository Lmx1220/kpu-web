<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { toast } from 'vue-sonner'

function showToast(type?: 'success' | 'error' | 'info' | 'warning' | 'loading1' | 'loading2') {
  if (type) {
    if (type === 'loading1') {
      toast.promise(() => new Promise((resolve) => {
        setTimeout(resolve, 2000)
      }), {
        loading: '加载中',
        success: () => '加载成功',
        error: () => '加载失败',
        position: 'top-right',
        duration: 3000,
      })
    }
    else if (type === 'loading2') {
      const loading = toast.loading('加载中', {
        position: 'top-right',
        duration: Infinity,
      })
      setTimeout(() => {
        toast.dismiss(loading)
        toast('Kpu-admin 杰出的管理系统框架', {
          description: '开箱即用，提供舒适开发体验',
          position: 'top-right',
          duration: 3000,
        })
      }, 2000)
    }
    else {
      toast[type]('Kpu-admin 杰出的管理系统框架', {
        description: '开箱即用，提供舒适开发体验',
        position: 'top-right',
        duration: 3000,
      })
    }
  }
  else {
    toast('Kpu-admin 杰出的管理系统框架', {
      description: '开箱即用，提供舒适开发体验',
      position: 'top-right',
      duration: 3000,
    })
  }
}
</script>

<template>
  <div>
    <KPageHeader title="轻提示" description="KToast" />
    <KPageMain>
      <div class="flex gap-4">
        <KButton @click="showToast()">
          默认
        </KButton>
        <KButton @click="showToast('success')">
          成功
        </KButton>
        <KButton @click="showToast('error')">
          错误
        </KButton>
        <KButton @click="showToast('info')">
          信息
        </KButton>
        <KButton @click="showToast('warning')">
          警告
        </KButton>
        <KButton @click="showToast('loading1')">
          加载中 1
        </KButton>
        <KButton @click="showToast('loading2')">
          加载中 2
        </KButton>
      </div>
    </KPageMain>
  </div>
</template>
