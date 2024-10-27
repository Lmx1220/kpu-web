<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import eventBus from '@/utils/eventBus'
import { useI18n } from 'vue-i18n'
import Tools from './tools.vue'

defineOptions({
  name: 'ToolbarRightSide',
})

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const { t } = useI18n()

// const { generateI18nTitle } = useMenu()

const avatarError = ref(false)
watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false
  }
})
</script>

<template>
  <div class="flex items-center">
    <Tools mode="right-side" />
    <HDropdownMenu
      :items="[
        [
          { label: t('app.preferences'), handle: () => eventBus.emit('global-preferences-toggle'), hide: !settingsStore.settings.userPreferences.enable },
        ],
        [
          { label: t('app.hotkeys'), handle: () => eventBus.emit('global-hotkeys-intro-toggle') },
        ],
        [
          { label: t('app.logout'), handle: () => userStore.logout() },
        ],
      ]" class="flex-center cursor-pointer px-2"
    >
      <div class="flex-center gap-1">
        <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)" class="h-[24px] w-[24px] rounded-full">
        <SvgIcon v-else name="i-carbon:user-avatar-filled-alt" :size="24" class="text-gray-400" />
        {{ userStore.account }}
        <SvgIcon name="i-ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>
