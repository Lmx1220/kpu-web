<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()
const state = reactive({
  description: '...',
  // avatarList: [
  //   {
  //     avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
  //     username: 'good luck',
  //   },
  //   {
  //     avatar:
  //       'https://fastly.jsdelivr.net/gh/'
  //       + 'chuzh'
  //       + 'ixin/image'
  //       + '/user/fwfmiao.gif',
  //     username: 'FlowPea' + 'kFish',
  //   },
  //   {
  //     avatar: 'https://i.gtimg.cn/club/item/face/img/3/15643_100.gif',
  //     username: '嘻嘻',
  //   },
  // ],
})

function handleTips() {
  const hour = new Date().getHours()
  return hour < 8
    ? `早上好 ${userStore.account}，又是元气满满的一天。`
    : hour <= 11
      ? `上午好 ${userStore.account}，看到你我好开心。`
      : hour <= 13
        ? `中午好 ${userStore.account}，忙碌了一上午，记得吃午饭哦。`
        : hour < 18
          ? `下午好 ${userStore.account}，你一定有些累了，喝杯咖啡提提神。`
          : `晚上好 ${userStore.account}，愿你天黑有灯，下雨有伞。`
}
</script>

<template>
  <ElCard class="page-header" shadow="never">
    <el-avatar class="page-header-avatar" :src="userStore.avatar" />
    <div class="page-header-tip">
      <p class="page-header-tip-title">
        {{ handleTips() }}
      </p>
      <p
        class="page-header-tip-description"
        v-html="state.description"
      />
    </div>
  </ElCard>
</template>

<style scoped>
.page-header {
  &.el-card {
    position: relative;
    min-height: 120px;
    cursor: pointer;
    background: #fff linear-gradient(120deg, rgb(var(--primary) / 10%) 10%, #fff) no-repeat;
  }

  :deep(.el-card__body) {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }

  &-avatar {
    width: 80px;
    height: 80px;
    padding: 20px;
    margin-right: 20px;
    background-color: #fff !important;
    border-radius: 50%;
  }

  &-tip {
    flex: auto;
    width: calc(100% - 200px);
    min-width: 300px;

    &-title {
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 30px;
    }

    &-description {
      min-height: 25px;
      line-height: 25px;
    }
  }
}
</style>
