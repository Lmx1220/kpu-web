<script setup lang="ts">
import useMenuBadgeStore from '@/store/modules/menuBadge.ts'

const menuBadgeStore = useMenuBadgeStore()
function switchText() {
  menuBadgeStore.setText(menuBadgeStore.text === '热门' ? '促销' : '热门')
}
function cleared() {
  menuBadgeStore.setText('')
}
</script>

<template>
  <div>
    <PageHeader title="文字标记" content="搭配 Pinia 可实现动态设置。请控制文字展示长度，避免导航标记覆盖导航标题" />
    <PageMain>
      <div>
        当前 badge 值：'{{ menuBadgeStore.text }}'
      </div>
      <ElButton @click="switchText">
        切换
      </ElButton>
      <ElButton @click="cleared">
        清空
      </ElButton>
    </PageMain>
  </div>
</template>
