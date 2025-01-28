<script setup lang="ts">
import useNotificationStore from '@/store/modules/notification'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import All from './all.vue'

defineOptions({
  name: 'NotificationPanel',
})

const notificationStore = useNotificationStore()

const activeName = ref('message')
const [KpuModal, modalApi] = useKpuModal({
  connectedComponent: All,
})
</script>

<template>
  <div class="w-xs">
    <KpuTabs
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
    >
      <template v-if="activeName === 'message'" #message>
        <KpuScrollArea :scrollbar="false" mask class="list max-h-300px">
          <div class="item">
            <div class="size-6 flex-center flex-shrink-0 rounded-full bg-blue">
              <KpuIcon name="i-ri:mail-fill" class="size-4 text-white" />
            </div>
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
            <div class="size-6 flex-center flex-shrink-0 rounded-full bg-pink">
              <KpuIcon name="i-ri:service-fill" class="size-4 text-white" />
            </div>
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
            <div class="size-6 flex-center flex-shrink-0 rounded-full bg-orange">
              <KpuIcon name="i-ri:file-edit-fill" class="size-4 text-white" />
            </div>
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
            <div class="size-6 flex-center flex-shrink-0 rounded-full bg-blue">
              <KpuIcon name="i-ri:mail-fill" class="size-4 text-white" />
            </div>
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
            <div class="size-6 flex-center flex-shrink-0 rounded-full bg-pink">
              <KpuIcon name="i-ri:service-fill" class="size-4 text-white" />
            </div>
            <div class="info">
              <div class="title">
                你收到了 3 位同事的好友申请，请及时处理
              </div>
              <div class="date">
                2020-10-10 10:00:00
              </div>
            </div>
          </div>
        </KpuScrollArea>
        <!--        <RouterLink v-slot="{ navigate }" :to="{ name: 'personalNotification' }" custom> -->
        <div class="cursor-pointer py-4 text-center text-sm text-secondary-foreground/50" @click="modalApi.open()">
          进入消息列表
        </div>
        <!--        </RouterLink> -->
      </template>
      <template v-if="activeName === 'todo'" #todo>
        <KpuScrollArea :scrollbar="false" mask class="list max-h-300px">
          <div class="flex flex-col items-center py-6 text-stone-5">
            <KpuIcon name="i-tabler:mood-smile" :size="40" />
            <p m-2 text-base>
              没有新待办
            </p>
          </div>
        </KpuScrollArea>
        <!--        <RouterLink v-slot="{ navigate }" :to="{ name: 'personalNotification' }" custom> -->
        <div class="flex flex-col items-center py-6 text-secondary-foreground/50" @click="modalApi.open()">
          进入待办列表
        </div>
        <!--        </RouterLink> -->
      </template>
    </KpuTabs>
    <KpuModal />
  </div>
</template>

<style scoped>
.list {
  .item {
    --uno: flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-background-color hover-bg-muted;

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
