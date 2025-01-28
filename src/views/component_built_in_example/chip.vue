<script setup lang="ts">
import logo from '@/assets/images/logo.png'

defineOptions({
  name: 'KpuChip',
})
const closable = ref(true)
function close() {
  closable.value = false
}
</script>

<template>
  <div>
    <KpuPageHeader title="纸片" content="KpuChip" />
    <KpuPageMain>
      <ElSpace>
        <KpuChip>
          基础纸片
        </KpuChip>
        <KpuChip>
          <ElAvatar size="small" class="-ml-1.5">
            Ad
          </ElAvatar>
          头像文字
        </KpuChip>
        <KpuChip>
          <ElAvatar size="small" class="-ml-1.5">
            <KpuIcon name="i-ep:user-filled" />
          </ElAvatar>
          头像图标
        </KpuChip>
        <KpuChip>
          <ElAvatar size="small" class="-ml-1.5" :src="logo" />
          头像图片
        </KpuChip>
        <KpuChip v-if="closable" closable @close="close">
          关闭按钮
        </KpuChip>
        <KpuChip class="c-white bg-sky!">
          自定义颜色
        </KpuChip>
      </ElSpace>
    </KpuPageMain>
  </div>
</template>
