<script setup lang="ts">
import { $t } from '@/locales/utils'
import useSettingsStore from '@/store/modules/settings'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'HotkeysIntro',
})
const [KModal, modalApi] = useKpuModal({
})
const settingsStore = useSettingsStore()

onMounted(() => {
  eventBus.on('global-hotkeys-intro-toggle', () => {
    modalApi.open()
  })
})
</script>

<template>
  <KModal :title="$t('app.hotkeys.title')" :footer="false">
    <div class="px-4">
      <div class="grid gap-2 sm-grid-cols-2">
        <div>
          <h2 class="m-0 text-lg font-bold">
            {{ $t('app.hotkeys.global.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                I
              </KpuKbd>
              {{ $t('app.hotkeys.global.system') }}
            </li>
            <li v-if="settingsStore.settings.toolbar.navSearch && settingsStore.settings.navSearch.enableHotkeys" class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                K
              </KpuKbd>
              {{ $t('app.hotkeys.global.search') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                L
              </KpuKbd>
              {{ $t('app.hotkeys.global.lock') }}
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.mode)">
          <h2 class="m-0 text-lg font-bold">
            {{ $t('app.hotkeys.nav.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                `
              </KpuKbd>
              {{ $t('app.hotkeys.nav.next') }}
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys">
          <h2 class="m-0 text-lg font-bold">
            {{ $t('app.hotkeys.tabbar.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                ←
              </KpuKbd>
              {{ $t('app.hotkeys.tabbar.prev') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                →
              </KpuKbd>
              {{ $t('app.hotkeys.tabbar.next') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                W
              </KpuKbd>
              {{ $t('app.hotkeys.tabbar.close') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                1~9
              </KpuKbd>
              {{ $t('app.hotkeys.tabbar.n') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                0
              </KpuKbd>
              {{ $t('app.hotkeys.tabbar.last') }}
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.mainPage.enableHotkeys">
          <h2 class="m-0 text-lg font-bold">
            {{ $t('app.hotkeys.page.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                ↑
              </KpuKbd>
              {{ $t('app.hotkeys.page.maximizing') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KpuKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KpuKbd>
              <KpuKbd>
                ↓
              </KpuKbd>
              {{ $t('app.hotkeys.page.exit') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </KModal>
</template>
