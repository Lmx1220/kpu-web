<script lang="ts" setup name="Notification">
import useNotificationStore from '@/store/modules/notification'

const notificationStore = useNotificationStore()
const activeName = ref('message')
</script>

<template>
  <el-tabs v-model="activeName" class="notification">
    <el-tab-pane :label="`消息 ${notificationStore.message > 0 ? `(${notificationStore.message})` : ''}`" name="message" class="container">
      <div class="list">
        <div class="item">
          <el-icon>
            <svg-icon name="i-ri:mail-fill" />
          </el-icon>
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
          <el-icon class="service">
            <svg-icon name="i-ri:service-fill" />
          </el-icon>
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
          <el-icon class="file-edit">
            <svg-icon name="i-ri:file-edit-fill" />
          </el-icon>
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
          <el-icon>
            <svg-icon name="i-ri:mail-fill" />
          </el-icon>
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
          <el-icon class="service">
            <svg-icon name="i-ri:service-fill" />
          </el-icon>
          <div class="info">
            <div class="title">
              你收到了 3 位同事的好友申请，请及时处理
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
      </div>
      <div class="more">
        进入通知列表
      </div>
    </el-tab-pane>
    <el-tab-pane :label="`待办 ${notificationStore.todo > 0 ? `(${notificationStore.todo})` : ''}`" name="todo" class="container">
      <div class="list">
        <div class="item">
          <el-icon class="bug">
            <svg-icon name="i-ri:bug-fill" />
          </el-icon>
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
          <el-icon>
            <svg-icon name="i-ri:git-merge-fill" />
          </el-icon>
          <div class="info">
            <div class="title">
              你有 3 个来自项目「admin」的代码合并申请，提交人：Hooray，提交备注：专业版更新
            </div>
            <div class="date">
              2020-10-10 10:00:00
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.notification {
    margin-top: -10px;

    :deep(.el-tabs__header) {
        margin-bottom: 0;
    }

    :deep(.el-tabs__nav-scroll) {
        text-align: center;

        .el-tabs__nav {
            display: inline-block;
            margin: 0 auto;
            float: none;

            .el-tabs__item {
                padding: 0 12px;
            }
        }
    }
}

.container {
    .list {
        max-height: 300px;
        overflow-y: auto;
        overscroll-behavior: contain;

        .item {
            display: flex;
            align-items: flex-start;
            padding: 15px 10px;
            transition: 0.3s;
            border-bottom: 1px solid var(--el-border-color);
            cursor: pointer;

            &:hover {
                background-color: var(--el-fill-color);
            }

            &:last-child {
                border-bottom: unset;
            }

            .el-icon {
                flex: none;
                margin-right: 10px;
                width: 2em;
                height: 2em;
                border-radius: 50%;
                color: #fff;
                background-color: var(--el-color-primary);

                &.service {
                    background-color: var(--el-color-success);
                }

                &.file-edit {
                    background-color: var(--el-color-warning);
                }

                &.bug {
                    background-color: var(--el-color-danger);
                }
            }

            .info {
                .title {
                    font-size: 14px;
                    line-height: 1.5;

                    @include text-overflow(2);
                }

                .date {
                    margin-top: 5px;
                    font-size: 12px;
                    color: var(--el-text-color-secondary);
                }
            }
        }

        .empty {
            padding: 30px 0;
            text-align: center;
            color: var(--el-text-color-placeholder);
        }
    }

    .more {
        padding: 15px 0;
        margin-bottom: -10px;
        text-align: center;
        color: var(--el-text-color-secondary);
        border-top: 1px solid var(--el-border-color);
        cursor: pointer;
    }
}
</style>
