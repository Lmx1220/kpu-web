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
    <KpuPageHeader title="数字标记" content="搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏" />
    <KpuPageMain>
      <div>
        当前 number 值：{{ menuBadgeStore.number }}
      </div>
      <ElButton @click="add">
        <template #icon>
          <KpuIcon name="i-ep:plus" />
        </template>
        1
      </ElButton>
      <ElButton @click="sub">
        <KpuIcon name="i-ep:minus" />
        1
      </ElButton>
    </KpuPageMain>
  </div>
</template>
