<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import Favorites from '@/layouts/components/Favorites/index.vue'

defineOptions({
  name: 'Favorites',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <HDropdown
    v-if="settingsStore.settings.toolbar.favorites && settingsStore.mode === 'pc'"
    class="flex-center cursor-pointer px-2 py-1"
    placement="bottom-start"
  >
    <SvgIcon name="i-uiw:star-off" />
    <template #dropdown>
      <Favorites />
    </template>
  </HDropdown>
</template>
