<script setup lang="ts">
defineOptions({
  name: 'KSmartFixedBlock',
})

defineProps<{
  position: 'top' | 'bottom'
}>()
</script>

<template>
  <div class="smart-fixed-block" :class="{ [`${position}`]: position }">
    <slot />
  </div>
</template>

<style scoped>
.smart-fixed-block {
  position: fixed;
  inset-inline: 50% 0;
  z-index: 1000;
  width: calc(100% - var(--g-main-sidebar-actual-width) - var(--g-sub-sidebar-actual-width));
  padding-right: var(--scrollbar-width, 0);
  transform: translate(-50%) translate(calc(var(--g-main-sidebar-actual-width) / 2)) translate(calc(var(--g-sub-sidebar-actual-width) / 2));
  transition: width 0.3s, max-width 0.3s, transform 0.3s;

  &.top {
    top: var(--g-header-actual-height);
  }

  &.bottom {
    bottom: 0;
  }

  [data-app-width-mode="center"] &,
  [data-app-width-mode="center-max-width"] & {
    max-width: calc(var(--g-app-width) - var(--g-main-sidebar-actual-width) - var(--g-sub-sidebar-actual-width));
    padding-right: initial;
    transform: translate(-50%) translate(calc(var(--g-main-sidebar-actual-width) / 2)) translate(calc(var(--g-sub-sidebar-actual-width) / 2)) translate(calc(var(--scrollbar-width, 0px) * -0.5));
    transition: none;
  }

  [dir="rtl"] & {
    transform: translate(50%) translate(calc(var(--g-main-sidebar-actual-width) / 2 * -1)) translate(calc(var(--g-sub-sidebar-actual-width) / 2 * -1));
  }

  [data-mode="mobile"] & {
    width: 100% !important;
    transform: translateX(-50%) !important;

    [dir="rtl"] & {
      transform: translate(50%) !important;
    }
  }
}
</style>
