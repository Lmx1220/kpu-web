<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'LinkView',
})

const route = useRoute()
const { copy, copied } = useClipboard()
watch(copied, (value) => {
  if (value) {
    ElMessage.success('复制成功')
  }
})
function open() {
  window.open(route.meta.link, '_blank')
}
</script>

<template>
  <div class="link-view">
    <Transition name="link" mode="out-in" appear>
      <PageMain :key="route.meta.link" title="⚠️访问提醒">
        <div class="container">
          <SvgIcon :size="120" color="var(--g-theme-color)" name="i-icon-park-twotone:planet" />
          <div class="title">
            是否访问此链接
          </div>
          <ElTooltip content="复制链接" placement="top" :show-after="300">
            <div class="link" @click="route.meta.link && copy(route.meta.link)">
              {{ route.meta.link }}
            </div>
          </ElTooltip>
          <ElButton type="primary" plain round @click="open">
            <template #icon>
              <SvgIcon name="ep:link" />
            </template>
            立即访问
          </ElButton>
        </div>
      </PageMain>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.link-view {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0 50px;

      .title {
        margin: 10px 0;
        font-size: 22px;
        color: var(--el-text-color-primary);
      }

      .link {
        max-width: 300px;
        margin: 10px 0;
        font-size: 14px;
        color: var(--el-text-color-disabled);

        @include text-overflow(3);
      }

      .el-button {
        margin: 20px 0;
      }
    }
  }
}
// link 区动画
.link-enter-active {
  transition: 0.2s;
}

.link-leave-active {
  transition: 0.15s;
}

.link-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.link-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
