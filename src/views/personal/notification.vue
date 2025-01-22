<route lang="yaml">
  name: personalNotification
  meta:
    title: 通知中心
  </route>

<script setup lang="ts">
import useNotificationStore from '@/store/modules/notification'

defineOptions({
  name: 'PersonalNotification',
})

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
  <div>
    <PageHeader title="通知中心" content="本页面仅模拟右上角通知数变化，具体业务逻辑请到 /src/store/modules/notification.ts 文件中编写" />
    <PageMain title="消息">
      <HButton @click="messagePlus">
        <KIcon name="i-ep:plus" />
        1
      </HButton>
      <HButton ml-2 @click="messageMinus">
        <KIcon name="i-ep:minus" />
        1
      </HButton>
    </PageMain>
    <PageMain title="待办">
      <HButton @click="todoPlus">
        <KIcon name="i-ep:plus" />
        1
      </HButton>
      <HButton ml-2 @click="todoMinus">
        <KIcon name="i-ep:minus" />
        1
      </HButton>
    </PageMain>
  </div>
</template>
