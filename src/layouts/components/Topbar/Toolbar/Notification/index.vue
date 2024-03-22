<script setup lang="ts">
import Notification from '@/layouts/components/Tools/Notification/index.vue'
import useSettingsStore from '@/store/modules/settings.ts'
import useNotificationStore from '@/store/modules/notification.ts'

defineOptions({
  name: 'Notification',
})

const settingsStore = useSettingsStore()
const notificationStore = useNotificationStore()
notificationStore.init()
</script>

<template>
  <HDropdown v-if="settingsStore.settings.toolbar.notification" class="flex-center cursor-pointer px-2 py-1">
    <HBadge :value="notificationStore.total > 9 ? true : notificationStore.total">
      <SvgIcon name="i-ri:notification-3-line" />
    </HBadge>
    <template #dropdown>
      <Notification />
    </template>
  </HDropdown>
</template>
