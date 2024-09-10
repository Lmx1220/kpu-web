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
  <div class="topbar-container fixed top-0 z-999 flex items-center justify-between" data-fixed-calc-width>
    <div class="left-side h-full flex items-center of-hidden pe-16 ps-2">
      <LeftSide />
    </div>
    <div v-show="['side', 'single', 'only-side', 'side-panel'].includes(settingsStore.settings.menu.mode)" class="h-full flex items-center justify-end px-2">
      <RightSide />
    </div>
  </div>
</template>

<style scoped>
.topbar-container {
  height: var(--g-topbar-height);
  background-color: var(--g-toolbar-bg);
  box-shadow: 0 1px 0 0 var(--g-border-color);
  transition: width 0.3s, top 0.3s, transform 0.3s, background-color 0.3s;

  .left-side {
    mask-image: linear-gradient(to right, #000 0%, #000 calc(100% - 50px), transparent);

    [dir="rtl"] {
      mask-image: linear-gradient(to left, #000 0%, #000 calc(100% - 50px), transparent);
    }
  }
}
</style>
