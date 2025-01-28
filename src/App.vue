<script setup lang="ts">
import CheckUpdates from '@/layouts/components/CheckUpdates/index.vue'
import useSettingsStore from '@/store/modules/settings'

import { useTitle as usePageTitle } from '@vueuse/core'
import Provider from './ui/provider/index.vue'

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
})
</script>

<template>
  <Provider>
    <RouterView v-slot="{ Component }">
      <component :is="Component" v-if="isAuth" />
      <KpuNotAllowed v-else />
    </RouterView>
    <KpuToast />
    <KpuNotification />
    <KpuSystemInfo />
    <CheckUpdates />
  </Provider>
</template>
