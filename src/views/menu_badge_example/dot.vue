<script setup lang="ts">
import useMenuBadgeStore from '@/store/modules/menuBadge.ts'

const menuBadgeStore = useMenuBadgeStore()
</script>

<template>
  <div>
    <PageHeader title="注意看子级导航的图标切换" content="通过设置子级导航路由 meta 对象里的 icon 和 activeIcon 实现图标切换效果" />
    <PageMain>
      <div>
        当前 badge 值：{{ menuBadgeStore.dot }}
      </div>
      <ElButton @click="menuBadgeStore.switchDot()">
        切换
      </ElButton>
    </PageMain>
  </div>
</template>
