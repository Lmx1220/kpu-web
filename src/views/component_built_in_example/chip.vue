<script setup lang="ts">
import logo from '@/assets/images/logo.png'

defineOptions({
  name: 'KChip',
})
const closable = ref(true)
function close() {
  closable.value = false
}
</script>

<template>
  <div>
    <KPageHeader title="纸片" content="KChip" />
    <KPageMain>
      <ElSpace>
        <KChip>
          基础纸片
        </KChip>
        <KChip>
          <ElAvatar size="small" class="-ml-1.5">
            Ad
          </ElAvatar>
          头像文字
        </KChip>
        <KChip>
          <ElAvatar size="small" class="-ml-1.5">
            <KIcon name="i-ep:user-filled" />
          </ElAvatar>
          头像图标
        </KChip>
        <KChip>
          <ElAvatar size="small" class="-ml-1.5" :src="logo" />
          头像图片
        </KChip>
        <KChip v-if="closable" closable @close="close">
          关闭按钮
        </KChip>
        <KChip class="c-white bg-sky!">
          自定义颜色
        </KChip>
      </ElSpace>
    </KPageMain>
  </div>
</template>
