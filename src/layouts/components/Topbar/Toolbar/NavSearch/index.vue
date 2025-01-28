<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { useI18n } from 'vue-i18n'
import Search from './search.vue'

defineOptions({
  name: 'NavSearch',
})

const settingsStore = useSettingsStore()
const [KModal, modalApi] = useKpuModal({
  connectedComponent: Search,
})
const { t } = useI18n()
</script>

<template>
  <KpuButton :variant="settingsStore.mode === 'pc' ? 'outline' : 'ghost'" :size="settingsStore.mode === 'pc' ? undefined : 'icon'" :class="{ 'mx-2 pe-1.5 ps-2': settingsStore.mode === 'pc' }" @click="() => modalApi.open()">
    <KpuIcon name="i-ri:search-line" :size="16" />
    <template v-if="settingsStore.mode === 'pc'">
      <span class="text-sm text-muted-foreground/60 transition group-hover-text-muted-foreground">{{ t('app.search.text') }}</span>
      <KpuKbd v-if="settingsStore.settings.navSearch.enableHotkeys">
        {{ settingsStore.os === 'mac' ? '⌘' : 'Ctrl' }} K
      </KpuKbd>
    </template>
  </KpuButton>
  <KModal />
</template>
