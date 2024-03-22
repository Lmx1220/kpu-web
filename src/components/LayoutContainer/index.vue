<script lang="ts" setup>
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
  }>(), {
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
      <div
        v-if="enabledLeftSide && !hideLeftSideToggle"
        class="left-side-icon z-1 flex-center w-6 h-6 rounded-1/2 absolute top-1/2 -left-3 bg-[var(--g-container-bg)] cursor-pointer"
      >
        <SvgIcon
          :name="leftSideVisiable ? 'i-ep:caret-left' : 'i-ep:caret-right'"
          class="op-30 hover:op-100 transition-opacity"
          @click="leftSideVisiable = !leftSideVisiable"
        />
      </div>
      <div
        v-if="enabledRightSide && !hideRightSideToggle"
        class="right-side-icon z-1 flex-center w-6 h-6 rounded-1/2 absolute top-1/2 -right-3 bg-[var(--g-container-bg)] cursor-pointer"
      >
        <SvgIcon
          :name="rightSideVisiable ? 'i-ep:caret-right' : 'i-ep:caret-left'"
          class="op-30 hover:op-100 transition-opacity"
          @click="rightSideVisiable = !rightSideVisiable"
        />
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
.flex-container{
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
    transition: background-color .3s
  }
  .left-side{
    flex: none;
    margin-right: 20px;
    overflow: auto;
  }
  .right-side{
    flex: none;
    margin-left: 20px;
    overflow: auto;
  }
  .main{
    position: relative;
    flex: 1;
    width: 100%;
    .main-container{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: var(--container-padding);
      overflow: auto
    }

  }

}
</style>
