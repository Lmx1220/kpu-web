<script setup lang="ts">
import { useSlots } from '@/slots'
import useSettingsStore from '@/store/modules/settings'
import Tools from './tools.vue'

defineOptions({
  name: 'ToolbarLeftSide',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="flex items-center">
    <KButton v-if="settingsStore.mode === 'mobile'" variant="ghost" size="icon" class="h-9 w-9 -rotate-z-180" @click="settingsStore.toggleSidebarCollapse()">
      <KIcon name="toolbar-collapse" :rotate="settingsStore.settings.app.direction === 'rtl' ? 180 : 0" />
    </KButton>
    <component :is="useSlots('toolbar-start')" />
    <Tools mode="left-side" />
  </div>
</template>
