<script setup lang="ts">
import useNotificationStore from '@/store/modules/notification'
import Panel from './panel.vue'

defineOptions({
  name: 'Notification',
})

const notificationStore = useNotificationStore()

notificationStore.init()
</script>

<template>
  <KpuPopover class="p-0">
    <KpuButton variant="ghost" size="icon" class="animation">
      <KpuBadge :value="notificationStore.total > 99 ? true : notificationStore.total">
        <KpuIcon name="i-ri:notification-3-line" :size="16" class="icon" />
      </KpuBadge>
    </KpuButton>
    <template #panel>
      <Panel />
    </template>
  </KpuPopover>
</template>

<style scoped>
.animation {
  .icon {
    transform-origin: center top;
  }

  &:hover .icon {
    animation: animation 1s;
  }
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
    transform: rotate3d(0, 0, 1, 0);
  }
}
</style>
