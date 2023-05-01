<script lang="ts" setup name="ListLayout">
const props = defineProps({
  enableLeftSide: {
    type: Boolean,
    default: true,
  },
  enableRightSide: {
    type: Boolean,
    default: true,
  },
  leftSideWidth: {
    type: [Number, String],
    default: 300,
  },
  rightSideWidth: {
    type: [Number, String],
    default: 300,
  },
  hideLeftSideToggle: {
    type: Boolean,
    default: false,
  },
  hideRightSideToggle: {
    type: Boolean,
    default: false,
  },
})

// 侧边栏是否折叠
const leftSideVisiable = ref(true)
const rightSideVisiable = ref(true)

const enabledLeftSide = computed(() => {
  return props.enableLeftSide && !!useSlots().leftSide
})
const enabledRightSide = computed(() => {
  return props.enableRightSide && !!useSlots().rightSide
})
</script>

<template>
  <div class="flex-container">
    <div
      v-if="enabledLeftSide" v-show="leftSideVisiable" class="left-side" :style="{
        width: typeof leftSideWidth === 'number' ? `${leftSideWidth}px` : leftSideWidth,
      }"
    >
      <slot name="leftSide" />
    </div>
    <div class="main">
      <el-icon
        v-if="enabledLeftSide && !hideLeftSideToggle" class="left-side-icon"
        @click="leftSideVisiable = !leftSideVisiable"
      >
        <svg-icon :name="leftSideVisiable ? 'i-ep:caret-left' : 'i-ep:caret-right'" />
      </el-icon>
      <el-icon
        v-if="enabledRightSide && !hideRightSideToggle" class="right-side-icon"
        @click="rightSideVisiable = !rightSideVisiable"
      >
        <svg-icon :name="rightSideVisiable ? 'i-ep:caret-right' : 'i-ep:caret-left'" />
      </el-icon>
      <div class="main-container">
        <slot name="default" />
      </div>
    </div>
    <div
      v-if="enabledRightSide" v-show="rightSideVisiable" class="right-side" :style="{
        width: typeof rightSideWidth === 'number' ? `${rightSideWidth}px` : rightSideWidth,
      }"
    >
      <slot name="rightSide" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px;

    .left-side,
    .right-side,
    .main {
        --container-padding: 15px;

        height: 100%;
        padding: var(--container-padding);
        background-color: var(--g-app-bg);
        transition: background-color 0.3s;
    }

    .left-side {
        margin-right: 20px;
        flex: none;
        overflow: auto;
    }

    .right-side {
        margin-left: 20px;
        flex: none;
        overflow: auto;
    }

    .main {
        flex: 1;
        position: relative;
        width: 100%;

        .left-side-icon,
        .right-side-icon {
            font-size: 18px;
            background-color: var(--g-app-bg);
            color: var(--el-text-color-placeholder);
            transition: background-color 0.3s, var(--el-transition-color);
            border-radius: 50%;
            width: 24px;
            height: 24px;
            cursor: pointer;

            @include position-center(y);

            &:hover {
                color: var(--el-text-color-regular);
            }
        }

        .left-side-icon {
            left: -10px;
        }

        .right-side-icon {
            right: -10px;
        }

        .main-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: var(--container-padding);
            overflow: auto;
        }
    }
}
</style>
