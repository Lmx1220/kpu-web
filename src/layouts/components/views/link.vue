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
    <transition name="link" mode="out-in" appear>
      <page-main :key="route.meta.link" title="⚠️访问提醒">
        <div class="container">
          <svg-icon :size="120" color="var(--g-theme-color)" name="i-icon-park-twotone:planet" />
          <div class="title">
            是否访问此链接
          </div>
          <el-tooltip content="复制链接" placement="top" :show-after="300">
            <div class="link" @click="route.meta.link && copy(route.meta.link)">
              {{ route.meta.link }}
            </div>
          </el-tooltip>
          <el-button type="primary" plain round @click="open">
            <template #icon>
              <svg-icon name="ep:link" />
            </template>
            立即访问
          </el-button>
        </div>
      </page-main>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.link-view {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .page-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;

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
        margin: 10px 0;
        max-width: 300px;
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
