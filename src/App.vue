<script setup lang="ts">
import eruda from 'eruda'
import VConsole from 'vconsole'
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
  if (settingsStore.settings.menu.menuMode === 'single' || (['head', 'only-head'].includes(settingsStore.settings.menu.menuMode) && settingsStore.mode !== 'mobile')) {
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
  if (['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode) && settingsStore.mode !== 'mobile') {
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
provide('i18nTitle', i18nTitleInjectionKey)
function i18nTitleInjectionKey(key: string | Function = t('route.undefined')) {
  return typeof key == 'function' ? key() : te(key) ? t(key) : key
}

const pageTitle = usePageTitle()
watch([
  () => settingsStore.settings.app.enableDynamicTitle,
  () => settingsStore.title,
  () => settingsStore.customTitleList,
  () => settingsStore.settings.app.defaultLang,
], () => {
  const breadcrumbNeste = route.meta.breadcrumbNeste
  const customTitle = settingsStore.customTitleList?.find(On => On.fullPath === route.fullPath)
  const lastBreadcrumb = breadcrumbNeste?.at(-1)
  const secondLastBreadcrumb = breadcrumbNeste?.at(-2)
  const hasDynamicTitle = settingsStore.settings.app.enableDynamicTitle && settingsStore.title

  let title = hasDynamicTitle && (customTitle?.title || i18nTitleInjectionKey(route.meta.title))

  if (hasDynamicTitle && !title && settingsStore.settings.app.routeBaseOn !== 'filesystem' && lastBreadcrumb?.i18n && secondLastBreadcrumb?.i18n) {
    title = i18nTitleInjectionKey(secondLastBreadcrumb.title)
  }

  pageTitle.value = title ? `${title} - ${import.meta.env.VITE_APP_TITLE}` : import.meta.env.VITE_APP_TITLE
}, {
  immediate: true,
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
</script>

<template>
  <Provider>
    <RouterView
      v-slot="{ Component, route }"
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
