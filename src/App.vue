<script setup lang="ts">
import { useLocale } from '@/locales/useLocale.ts'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'

import dayjs from 'dayjs'
import hotkeys from 'hotkeys-js'
import Provider from './ui-provider/index.vue'

const settingsStore = useSettingsStore()
const { getLocale } = useLocale()

watch([
  () => settingsStore.title,
], () => {
  document.title = 'One-KPU-admin 专业版'
}, {
  immediate: true,
})
onMounted(() => {
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })
})
watch(getLocale, () => {
  switch (getLocale.value) {
    case 'zh-cn':
      dayjs.locale('zh-cn')
      break
    case 'en':
      dayjs.locale('en')
      break
  }
}, {
  immediate: true,
})
</script>

<template>
  <Provider>
    <RouterView />
    <SystemInfo />
  </Provider>
</template>
