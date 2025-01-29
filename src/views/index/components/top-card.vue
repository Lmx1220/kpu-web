<script setup lang="ts">
// import VabCount from '@/plugins/VabCount'
import _ from 'lodash'

withDefaults(
  defineProps<{
    background?: string
    title?: string
    icon?: string
    percentage?: string
    countConfig?: {
      startValue: number
      endValue: number
      decimals: number
      prefix: string
      suffix: string
      separator: string
      duration: number
    }
  }>(),
  {
    background: 'white',
    title: 'Test',
    icon: '',
    percentage: '10%',
    countConfig: () => ({
      startValue: 0,
      endValue: _.random(1000, 20000),
      decimals: 0,
      prefix: '',
      suffix: '',
      separator: ',',
      duration: 8000,
    }),

  },
)
</script>

<template>
  <ElCard class="top-card" :class="`top-card-${background}`" shadow="hover">
    {{ title }}
    <slot v-if="$slots.tag" name="tag" />
    <p>
      <KpuCountTo
        :decimals="countConfig.decimals"
        :duration="countConfig.duration"
        :end-val="countConfig.endValue"
        :prefix="countConfig.prefix"
        :separator="countConfig.separator"
        :start-val="countConfig.startValue"
        :suffix="countConfig.suffix"
      />
    </p>
    <div v-if="icon" class="right-icon">
      <KpuIcon :name="icon" />
    </div>

    <div class="bottom">
      自上周以来
      <KpuIcon name="ri:arrow-up-line" />
      <span>{{ percentage }}</span>
    </div>
    <slot v-if="$slots.chart" name="chart" />
  </ElCard>
</template>

<style scoped>
.top-card {
  position: relative;
  height: 168px !important;

  &.el-card,
  .el-card {
    margin-bottom: 1.25rem;
  }

  :deep(.el-tag) {
    float: right;
  }

  p {
    font-size: 23px;

    --uno: my-7;
  }

  .right-icon {
    position: absolute;
    top: 50%;
    right: 20px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    color: rgb(var(--primary));
    text-align: center;
    background: rgb(var(--primary) / 10%);
    border-radius: 50%;
    transform: translateY(-50%);

    i {
      height: 60px;
      font-size: 35px;
    }
  }

  .bottom {
    > i {
      width: 18px;
      height: 18px;
      margin: 0 3px 0 2px;
      vertical-align: -3px !important;
      color: var(--el-color-success);
      background: rgb(19 206 102 / 20%);
      border-radius: 50%;
      transform: scale(0.8);
    }

    span {
      color: var(--el-color-success);
    }
  }

  &-blue {
    color: #fff;
    background: rgb(var(--primary));
    background:
      linear-gradient(
        90deg,
        rgb(var(--primary) / 40%),
        rgb(var(--primary))
      );

    .right-icon,
    .bottom > i {
      color: rgb(var(--primary));
      background: #fff;
    }

    .bottom {
      span {
        color: #fff;
      }
    }
  }
}
</style>
