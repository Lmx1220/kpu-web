<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { useTitle as usePageTitle } from '@vueuse/core'
import Provider from './ui-provider/index.vue'

import eventBus from '@/util/eventBus'
import useSettingsStore from '@/store/modules/settings'

const route = useRoute()
const settingsStore = useSettingsStore()
const { auth } = useAuth()
const { generateI18nTitle } = useMenu()

const isAuth = computed(() => {
  return route.matched.every((item) => {
    return auth(item.meta.auth ?? '')
  })
})

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
</script>

<template>
  <Provider>
    <RouterView v-slot="{ Component }">
      <component :is="Component" v-if="isAuth" />
      <NotAllowed v-else />
    </RouterView>
    <SystemInfo />
  </Provider>
</template>

<style lang="scss" scoped>
// scss
</style>
