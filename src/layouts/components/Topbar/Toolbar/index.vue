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
    <div class="left-side h-full flex items-center of-hidden pe-16 ps-2">
      <LeftSide />
    </div>
    <div v-show="['side', 'single', 'only-side'].includes(settingsStore.settings.menu.menuMode)" class="h-full flex items-center justify-end px-2">
      <RightSide />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-container {
  height: var(--g-toolbar-height);
  background-color: var(--g-container-bg);
  transition: background-color 0.3s;

  .left-side {
    mask-image: linear-gradient(to right, #000 0%, #000 calc(100% - 50px), transparent);

    [dir="rtl"] & {
      mask-image: linear-gradient(to left, #000 0%, #000 calc(100% - 50px), transparent);
    }
  }
}
</style>
