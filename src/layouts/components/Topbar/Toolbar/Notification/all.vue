<script setup lang="ts">
import useNotificationStore from '@/store/modules/notification'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'

const [KpuModal] = useKpuModal()

const notificationStore = useNotificationStore()

function messagePlus() {
  notificationStore.$patch((state) => {
    state.message += 1
  })
}
function messageMinus() {
  notificationStore.$patch((state) => {
    state.message -= state.message > 0 ? 1 : 0
  })
}

function todoPlus() {
  notificationStore.$patch((state) => {
    state.todo += 1
  })
}
function todoMinus() {
  notificationStore.$patch((state) => {
    state.todo -= state.todo > 0 ? 1 : 0
  })
}
</script>

<template>
  <KpuModal title="通知中心" :footer="false" :fullscreen-button="false" description="本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/layouts/components/Topbar/Toolbar/Notification/panel.vue 文件中编写">
    <div>
      <KpuDivider>消息</KpuDivider>
      <div class="flex-center">
        <KpuButton @click="messagePlus">
          <KpuIcon name="i-ep:plus" />1
        </KpuButton>
        <KpuButton ml-2 @click="messageMinus">
          <KpuIcon name="i-ep:minus" />1
        </KpuButton>
      </div>

      <KpuDivider>待办</KpuDivider>
      <div class="flex-center">
        <KpuButton @click="todoPlus">
          <KpuIcon name="i-ep:plus" />1
        </KpuButton>
        <KpuButton ml-2 @click="todoMinus">
          <KpuIcon name="i-ep:minus" />1
        </KpuButton>
      </div>
    </div>
  </KpuModal>
</template>
