<script lang="ts" setup>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import useNotificationStore from '@/store/modules/notification'

defineOptions({
  name: 'Notification',
})
const notificationStore = useNotificationStore()
const activeName = ref('message')
</script>

<template>
  <div class="w-xs">
    <HTabList
      v-model="activeName"
      :options="[
        { label: `消息${notificationStore.message > 0 ? `(${notificationStore.message})` : ''}`, value: 'message' },
        { label: `待办${notificationStore.message > 0 ? `(${notificationStore.message})` : ''} `, value: 'todo' },
      ]"
      class="m-3 flex!" @click.stop="() => {}"
    />
    <template v-if="activeName === 'message'">
      <OverlayScrollbarsComponent
        :options="{
          scrollbars: {
            autoHide: 'leave',
            autoHideDelay: 300,
          },
        }"
        class="list max-h-300px"
        defer
      >
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
          <SvgIcon class="service" name="i-ri:service-fill" />
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
          <SvgIcon class="file-edit" name="i-ri:file-edit-fill" />
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
          <SvgIcon class="service" name="i-ri:service-fill" />
          <div class="info">
            <div class="title">
              你收到了 3 位同事的好友申请，请及时处理
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
      <RouterLink :to="{ name: 'personalNotification' }" custom>
        <div class="cursor-pointer py-4 text-center text-sm text-stone-5">
          进入通知列表
        </div>
      </RouterLink>
    </template>
    <template v-else>
      <OverlayScrollbarsComponent
        :options="{
          scrollbars: {
            autoHide: 'leave',
            autoHideDelay: 300,
          },
        }"
        class="list max-h-300px"
        defer
      >
        <div class="item">
          <SvgIcon class="bug" name="i-ri:bug-fill" />
          <div class="info">
            <div class="title">
              你有 2 个来自项目「admin」的 bug 待处理
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
        <div class="item">
          <SvgIcon name="i-ri:git-merge-fill" />
          <div class="info">
            <div class="title">
              你有 3 个来自项目「admin」的代码合并申请，提交人：Hooray，提交备注：专业版更新
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
      <RouterLink :to="{ name: 'personalNotification' }" custom>
        <div class="cursor-pointer py-4 text-center text-sm text-stone-5">
          进入待办列表
        </div>
      </RouterLink>
    </template>
  </div>
</template>

<style lang="scss" scoped>
[data-overlayscrollbars-viewport] {
  overscroll-behavior: contain;
}

.list {
  --at-apply: border-block-1 border-block border-block-stone-2 dark-border-block-stone-7 border-block-solid;

  .item {
    --at-apply: flex cursor-pointer items-center gap-3 border-b-1 border-b-stone-2 dark-border-b-stone-7 border-b-solid p-y-4 px-3;

    &:last-child {
      --at-apply: border-b-0;
    }

    &:hover {
      --un-bg-opacity: 1;
      --at-apply: bg-stone-1 dark-bg-dark/50;
    }

    i {
      --at-apply: w-6 min-w-6 h-6 border-rd-9999px bg-blue-400 font-size-3 leading-4 color-white;

      &.service {
        --at-apply: bg-green;
      }

      &.file-edit {
        --at-apply: bg-orange;
      }

      &.bug {
        --at-apply: bg-pink;
      }
    }

    .info {
      .title {
        --at-apply: line-clamp-2 font-size-3.5 leading-5;
      }

      .date {
        --at-apply: m-t-1 font-size-3 leading-4 color-stone-5;
      }
    }
  }
}
</style>
