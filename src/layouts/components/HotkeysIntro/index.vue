<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'HotkeysIntro',
})
const { t } = useI18n()
const isShow = ref(false)

const settingsStore = useSettingsStore()

onMounted(() => {
  eventBus.on('global-hotkeys-intro-toggle', () => {
    isShow.value = !isShow.value
  })
})
</script>

<template>
  <KModal v-model="isShow" :title="t('app.hotkeys.title')" :footer="false">
    <div class="px-4">
      <div class="grid gap-2 sm-grid-cols-2">
        <div>
          <h2 class="m-0 text-lg font-bold">
            {{ t('app.hotkeys.global.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                I
              </KKbd>
              {{ t('app.hotkeys.global.system') }}
            </li>
            <li v-if="settingsStore.settings.toolbar.navSearch && settingsStore.settings.navSearch.enableHotkeys" class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                K
              </KKbd>
              {{ t('app.hotkeys.global.search') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                L
              </KKbd>
              {{ t('app.hotkeys.global.lock') }}
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.mode)">
          <h2 class="m-0 text-lg font-bold">
            {{ t('app.hotkeys.nav.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                `
              </KKbd>
              {{ t('app.hotkeys.nav.next') }}
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.enableHotkeys">
          <h2 class="m-0 text-lg font-bold">
            {{ t('app.hotkeys.tabbar.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                ←
              </KKbd>
              {{ t('app.hotkeys.tabbar.prev') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                →
              </KKbd>
              {{ t('app.hotkeys.tabbar.next') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                W
              </KKbd>
              {{ t('app.hotkeys.tabbar.close') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                1~9
              </KKbd>
              {{ t('app.hotkeys.tabbar.n') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                0
              </KKbd>
              {{ t('app.hotkeys.tabbar.last') }}
            </li>
          </ul>
        </div>
        <div v-if="settingsStore.settings.mainPage.enableHotkeys">
          <h2 class="m-0 text-lg font-bold">
            {{ t('app.hotkeys.page.root') }}
          </h2>
          <ul class="list-none ps-4 text-sm">
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                ↑
              </KKbd>
              {{ t('app.hotkeys.page.maximizing') }}
            </li>
            <li class="flex-baseline gap-2 py-1">
              <KKbd>
                {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }}
              </KKbd>
              <KKbd>
                ↓
              </KKbd>
              {{ t('app.hotkeys.page.exit') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </KModal>
</template>
