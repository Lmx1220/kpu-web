<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const settingsStore = useSettingsStore()

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <KButton v-if="settingsStore.mode === 'pc'" variant="ghost" size="icon" @click="toggle">
    <SvgIcon :name="isFullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'" :size="16" />
  </KButton>
</template>
