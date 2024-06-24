<script setup lang="ts">
import useMenuBadgeStore from '@/store/modules/menuBadge.ts'

const menuBadgeStore = useMenuBadgeStore()
function add() {
  menuBadgeStore.setNumber(menuBadgeStore.number + 1)
}
function sub() {
  menuBadgeStore.setNumber(menuBadgeStore.number - 1)
}
</script>

<template>
  <div>
    <PageHeader title="数字标记" content="搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏" />
    <PageMain>
      <div>
        当前 number 值：{{ menuBadgeStore.number }}
      </div>
      <ElButton @click="add">
        <template #icon>
          <svg-icon name="i-ep:plus" />
        </template>
        1
      </ElButton>
      <ElButton @click="sub">
        <svg-icon name="i-ep:minus" />
        1
      </ElButton>
    </PageMain>
  </div>
</template>
