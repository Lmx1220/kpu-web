<script setup lang="ts">
import Panel from './panel.vue'
import useNotificationStore from '@/store/modules/notification'

defineOptions({
  name: 'Notification',
})

const notificationStore = useNotificationStore()

notificationStore.init()

const isAnimating = ref(false)
</script>

<template>
  <HDropdown class="flex-center cursor-pointer px-2 py-1">
    <HBadge :value="notificationStore.total > 9 ? true : notificationStore.total" @mouseenter="isAnimating = true">
      <SvgIcon name="i-ri:notification-3-line" :class="{ animation: isAnimating }" @animationend="isAnimating = false" />
    </HBadge>
    <template #dropdown>
      <Panel />
    </template>
  </HDropdown>
</template>

<style scoped>
.animation {
  transform-origin: center top;
  animation: animation 1s;
}

@keyframes animation {
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
</style>
