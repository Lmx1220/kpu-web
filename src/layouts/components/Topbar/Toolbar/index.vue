<script setup lang="ts">
import LeftSide from './leftSide.vue'
import RightSide from './rightSide.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'Toolbar',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="toolbar-container flex items-center justify-between">
    <div class="h-full flex items-center of-hidden pl-2 pr-16" style="mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);">
      <LeftSide />
    </div>
    <div v-show="['side', 'single', 'only-side'].includes(settingsStore.settings.menu.menuMode)" class="h-full flex items-center px-2">
      <RightSide />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  --at-apply: flex items-center justify-between;

  height: var(--g-toolbar-height);
  background-color: var(--g-container-bg);
  transition: background-color 0.3s;

  .left-box {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 50px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .breadcrumb {
      padding-left: 10px;
      white-space: nowrap;

      &.breadcrumb-modern {
        :deep(.breadcrumb-item) {
          .text {
            background-color: rgb(231 229 228 / 80%);
            padding: 6px 16px;
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);

            @at-root .dark & {
              background-color: rgb(41 37 36 / 80%);
            }

            &.is-link:hover {
              --at-apply: bg-stone-2 dark:bg-stone-8;
            }
          }

          &:first-child {
            .text {
              padding-left: 12px;
              border-radius: 6px 0 0 6px;
              clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
            }

            &:not(:first-child) {
              .text {
                --at-apply: bg-stone-2 dark:bg-stone-8;

                border-radius: 0 6px 6px 0;
              }
            }
          }

          .separator {
            display: none;
          }
        }
      }
    }
  }
}

// 面包屑动画
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
