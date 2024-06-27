<script setup lang="ts">
defineOptions({
  name: 'ListLayout',
})

const props = withDefaults(
  defineProps<{
    enableLeftSide?: boolean
    enableRightSide?: boolean
    leftSideWidth?: number | string
    rightSideWidth?: number | string
    hideLeftSideToggle?: boolean
    hideRightSideToggle?: boolean
  }>(),
  {
    enableLeftSide: true,
    enableRightSide: true,
    leftSideWidth: 300,
    rightSideWidth: 300,
    hideLeftSideToggle: false,
    hideRightSideToggle: false,
  },
)

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
      <div v-if="enabledLeftSide && !hideLeftSideToggle" class="left-side-icon absolute top-1/2 z-1 h-6 w-6 flex-center cursor-pointer rounded-1/2 bg-[var(--g-container-bg)] -left-3">
        <SvgIcon :name="leftSideVisiable ? 'i-ep:caret-left' : 'i-ep:caret-right'" class="op-30 transition-opacity hover:op-100" @click="leftSideVisiable = !leftSideVisiable" />
      </div>
      <div v-if="enabledRightSide && !hideRightSideToggle" class="right-side-icon absolute top-1/2 z-1 h-6 w-6 flex-center cursor-pointer rounded-1/2 bg-[var(--g-container-bg)] -right-3">
        <SvgIcon :name="rightSideVisiable ? 'i-ep:caret-right' : 'i-ep:caret-left'" class="op-30 transition-opacity hover:op-100" @click="rightSideVisiable = !rightSideVisiable" />
      </div>
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
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;

  .left-side,
  .right-side,
  .main {
    --container-padding: 15px;

    height: 100%;
    padding: var(--container-padding);
    background-color: var(--g-container-bg);
    transition: background-color 0.3s;
  }

  .left-side {
    flex: none;
    margin-inline-end: 20px;
    overflow: auto;
  }

  .right-side {
    flex: none;
    margin-inline-start: 20px;
    overflow: auto;
  }

  .main {
    position: relative;
    flex: 1;
    width: 100%;

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
