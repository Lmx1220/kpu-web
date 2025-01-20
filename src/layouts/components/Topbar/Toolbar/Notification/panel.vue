<script setup lang="ts">
import useNotificationStore from '@/store/modules/notification'

defineOptions({
  name: 'NotificationPanel',
})

const notificationStore = useNotificationStore()

const activeName = ref('message')
</script>

<template>
  <div class="w-xs">
    <KTabs
      v-model="activeName" :list="[
        {
          label: `消息 ${notificationStore.message > 0 ? `(${notificationStore.message})` : ''}`,
          value: 'message',
        },
        {
          label: `待办 ${notificationStore.todo > 0 ? `(${notificationStore.todo})` : ''}`,
          value: 'todo',
        },
      ]" class="m-3 mb-0"
    />
    <template v-if="activeName === 'message'">
      <KScrollArea :scrollbar="false" mask class="list max-h-300px">
        <div class="item">
          <SvgIcon name="i-ri:mail-fill" />
          <div class="info">
            <div class="title">
              你收到了 8 份日报
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
        <div class="item">
          <SvgIcon name="i-ri:service-fill" class="service" />
          <div class="info">
            <div class="title">
              你收到了 3 位同事的好友申请，请及时处理
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
        <div class="item">
          <SvgIcon name="i-ri:file-edit-fill" class="file-edit" />
          <div class="info">
            <div class="title">
              你有 3 份合同待审批
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
        <div class="item">
          <SvgIcon name="i-ri:mail-fill" />
          <div class="info">
            <div class="title">
              你收到了 8 份日报
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
        <div class="item">
          <SvgIcon name="i-ri:service-fill" class="service" />
          <div class="info">
            <div class="title">
              你收到了 3 位同事的好友申请，请及时处理
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
      </KScrollArea>
      <RouterLink v-slot="{ navigate }" :to="{ name: 'personalNotification' }" custom>
        <div class="cursor-pointer py-4 text-center text-sm text-stone-5" @click="navigate">
          进入消息列表
        </div>
      </RouterLink>
    </template>
    <template v-if="activeName === 'todo'">
      <KScrollArea :scrollbar="false" mask class="list max-h-300px">
        <div class="flex flex-col items-center py-6 text-stone-5">
          <SvgIcon name="i-tabler:mood-smile" :size="40" />
          <p m-2 text-base>
            没有新待办
          </p>
        </div>
      </KScrollArea>
      <RouterLink v-slot="{ navigate }" :to="{ name: 'personalNotification' }" custom>
        <div class="cursor-pointer py-4 text-center text-sm text-stone-5" @click="navigate">
          进入待办列表
        </div>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
.list {
  .item {
    --uno: flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-background-color hover-bg-muted;

    i {
      --uno: w-6 h-6 text-xs rounded-full text-white bg-blue;

      &.service {
        --uno: bg-green;
      }

      &.file-edit {
        --uno: bg-orange;
      }

      &.bug {
        --uno: bg-pink;
      }
    }

    .info {
      .title {
        --uno: text-sm line-clamp-2;
      }

      .date {
        --uno: mt-1 text-xs text-stone-5;
      }
    }
  }
}
</style>
