<script setup lang="ts">
import eruda from 'eruda'
import VConsole from 'vconsole'
import hotkeys from 'hotkeys-js'
import { getElementLocales } from './locales'
import useI18nTitle from '@/util/composables/useI18nTitle'

import eventBus from '@/util/eventBus'
import useTabbarStore from '@/store/modules/tabbar'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

const route = useRoute()
const locales = computed(() => getElementLocales())
const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const tabbarStore = useTabbarStore()
const tabbar = useTabbar()
const { auth } = useAuth()
const { generateI18nTitle } = useI18nTitle()
// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (settingsStore.settings.menu.menuMode === 'single' || (['head', 'only-head'].includes(settingsStore.settings.menu.menuMode) && settingsStore.mode !== 'mobile')) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})
// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.settings.menu.subMenuCollapse && settingsStore.mode !== 'mobile') {
    actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-collapse-width'))
  }
  if (['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode) && settingsStore.mode !== 'mobile') {
    actualWidth = 0
  }
  if (
    settingsStore.settings.menu.subMenuOnlyOneHide
        && menuStore.sidebarMenus.length === 1
        && (
          !menuStore.sidebarMenus[0].children
            || menuStore.sidebarMenus[0]?.children.every(item => item.meta?.sidebar === false)
        )
  ) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})
provide('generateI18nTitle', generateI18nTitle)
watch([
  () => settingsStore.settings.app.enableDynamicTitle,
  () => settingsStore.title,
], () => {
  if (settingsStore.settings.app.enableDynamicTitle && settingsStore.title) {
    const _title = settingsStore.titleFirst ? settingsStore.title : generateI18nTitle(route.meta.i18n, settingsStore.title)

    document.title = `${_title} - ${import.meta.env.VITE_APP_TITLE}`
  }
  else {
    document.title = import.meta.env.VITE_APP_TITLE
    if (settingsStore.settings.tabbar.enable && settingsStore.titleFirst && settingsStore.title) {
      tabbarStore.editTitle({ tabId: tabbar.getId(), title: settingsStore.title })
    }
  }
}, {
  immediate: true,
})
onMounted(() => {
  settingsStore.setMode(document.documentElement.clientWidth)
  window.onresize = () => {
    settingsStore.setMode(document.documentElement.clientWidth)
  }
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })

  return () => {
    window.onresize = null
  }
})

import.meta.env.VITE_APP_DEBUG_TOOL === 'eruda' && eruda.init()
import.meta.env.VITE_APP_DEBUG_TOOL === 'vconsole' && new VConsole()
</script>

<template>
  <el-config-provider
    :locale="locales[settingsStore.settings.app.defaultLang]" :size="settingsStore.settings.app.elementSize" :button="{
      autoInsertSpace: true,
    }"
  >
    <RouterView
      v-slot="{ Component, route }"
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth,
      }"
    >
      <component :is="Component" v-if="auth(route.meta.auth ?? '')" />
      <not-allowed v-else />
    </RouterView>
    <system-info />
  </el-config-provider>
</template>

<style lang="scss" scoped>
// scss
</style>

<i18n global>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  },
  "zh-cn": {
    "language": "语言",
    "hello": "你好，世界！"
  },
  "zh-tw": {
    "language": "語言",
    "hello": "你好，世界！"
  }
}
</i18n>
