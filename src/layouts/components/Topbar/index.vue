<script lang="ts" setup>
import Tabbar from './Tabbar/index.vue'
import Toolbar from './Toolbar/index.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'Topbar',
})
const hide = ref(false)
const settingsStore = useSettingsStore()

const toolbar = computed(() => {
  return !(
    (settingsStore.settings.menu.menuMode === 'head' && !settingsStore.settings.menu.enableSubMenuCollapseButton && (!settingsStore.settings.breadcrumb.enable || settingsStore.settings.app.routeBaseOn === 'filesystem'))
    || (settingsStore.settings.menu.menuMode === 'only-head' && (!settingsStore.settings.breadcrumb.enable || settingsStore.settings.app.routeBaseOn === 'filesystem'))
  )
})

const topbar = computed(() => {
  const tabbarHeight = settingsStore.settings.tabbar.enable ? Number.parseInt(getComputedStyle(document.documentElement || document.body).getPropertyValue('--g-tabbar-height')) : 0
  const toolbarHeight = toolbar.value ? Number.parseInt(getComputedStyle(document.documentElement || document.body).getPropertyValue('--g-toolbar-height')) : 0
  return tabbarHeight + toolbarHeight
})

const scrollTop = ref(0)
onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
function onScroll() {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
}
watch(scrollTop, (value, oldValue) => {
  if (settingsStore.settings.topbar.mode === 'sticky') {
    hide.value = value > oldValue && value > topbar.value
  }
})
</script>

<template>
  <div
    class="topbar-container" :class="{
      'has-tabbar': settingsStore.settings.tabbar.enable,
      'has-toolbar': toolbar,
      [`topbar-${settingsStore.settings.topbar.mode}`]: true,
      'shadow': !settingsStore.settings.topbar.switchTabbarAndToolbar && scrollTop,
      hide,
      'switch-tabbar-toolbar': settingsStore.settings.topbar.switchTabbarAndToolbar,
    }" data-fixed-calc-width
  >
    <Tabbar v-if="settingsStore.settings.tabbar.enable" />
    <Toolbar v-if="toolbar" />
  </div>
</template>

<style lang="scss" scoped>
.topbar-container {
  position: absolute;
  z-index: 999;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 0 0 var(--g-border-color);
  transition: width 0.3s, top 0.3s, transform 0.3s, box-shadow 0.3s;

  &.topbar-fixed,
  &.topbar-sticky {
    position: fixed;

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  &.topbar-sticky {
    &.hide {
      top: calc((var(--g-tabbar-height) + var(--g-toolbar-height)) * -1) !important;
    }
  }

  &.switch-tabbar-toolbar {
    flex-direction: column-reverse;
  }
}
</style>
