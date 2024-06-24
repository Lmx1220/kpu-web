<script setup lang="ts">
import logo from '@/assets/images/logo.png'

defineOptions({
  name: 'ComponentExampleChip',
})
const closable = ref(true)
function close() {
  closable.value = false
}
</script>

<template>
  <div>
    <PageHeader title="纸片" content="Chip" />
    <PageMain>
      <ElSpace>
        <Chip>
          基础纸片
        </Chip>
        <Chip>
          <ElAvatar size="small" class="-ml-1.5">
            Ad
          </ElAvatar>
          头像文字
        </Chip>
        <Chip>
          <ElAvatar size="small" class="-ml-1.5">
            <SvgIcon name="i-ep:user-filled" />
          </ElAvatar>
          头像图标
        </Chip>
        <Chip>
          <ElAvatar size="small" class="-ml-1.5" :src="logo" />
          头像图片
        </Chip>
        <Chip v-if="closable" closable @close="close">
          关闭按钮
        </Chip>
        <Chip class="c-white bg-sky!">
          自定义颜色
        </Chip>
      </ElSpace>
    </PageMain>
  </div>
</template>
