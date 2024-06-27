<script setup lang="ts">
import eruda from 'eruda'
import VConsole from 'vconsole'
import DisableDevtool from 'disable-devtool'
import hotkeys from 'hotkeys-js'
import { useTitle as usePageTitle } from '@vueuse/core'
import Provider from './ui-provider/index.vue'

import eventBus from '@/util/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const route = useRoute()
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const { auth } = useAuth()
// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (settingsStore.settings.menu.mode === 'single' || (['head', 'only-head', 'head-panel'].includes(settingsStore.settings.menu.mode) && settingsStore.mode !== 'mobile')) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})
// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.settings.menu.subMenuCollapse && settingsStore.mode !== 'mobile') {
    actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-collapse-width'))
  }
  if (['only-side', 'only-head', 'side-panel', 'head-panel'].includes(settingsStore.settings.menu.mode) && settingsStore.mode !== 'mobile') {
    actualWidth = 0
  }
  if (
    settingsStore.settings.menu.subMenuOnlyOneHide
    && menuStore.sidebarMenus.length === 1
    && (
      !menuStore.sidebarMenus[0].children
      || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.menu === false)
    )
  ) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

const { t, te } = useI18n()
provide('i18nTitle', generateI18nTitle)

function generateI18nTitle(key: string | Function = t('route.undefined')) {
  return typeof key == 'function' ? key() : te(key) ? t(key) : key
}

const pageTitle = usePageTitle()
watch([
  () => settingsStore.settings.app.enableDynamicTitle,
  () => settingsStore.title,
  () => settingsStore.customTitleList,
  () => settingsStore.settings.app.defaultLang,
], () => {
  nextTick(() => {
    if (settingsStore.settings.app.enableDynamicTitle && settingsStore.title) {
      const title = settingsStore.customTitleList.find(item => item.fullPath === route.fullPath)?.title
        || generateI18nTitle(settingsStore.title)

      pageTitle.value = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    }
    else {
      pageTitle.value = import.meta.env.VITE_APP_TITLE
    }
  })
}, {
  immediate: true,
  deep: true,
})
onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.addEventListener('resize', () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  })
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })
})

import.meta.env.VITE_APP_DEBUG_TOOL === 'eruda' && eruda.init()
import.meta.env.VITE_APP_DEBUG_TOOL === 'vconsole' && new VConsole()
import.meta.env.VITE_APP_DISABLE_DEVTOOL === 'true' && DisableDevtool()
</script>

<template>
  <Provider>
    <RouterView
      v-slot="{ Component }"
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth,
      }"
    >
      <component :is="Component" v-if="auth(route.meta.auth ?? '')" />
      <NotAllowed v-else />
    </RouterView>
    <SystemInfo />
  </Provider>
</template>

<style lang="scss" scoped>
// scss
</style>
