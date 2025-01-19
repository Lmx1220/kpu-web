<script setup lang="ts">
const router = useRouter()

const enableLeftSide = ref(true)
const enableRightSide = ref(true)
const leftSideWidth = ref(300)
const rightSidewidth = ref(300)
const layout = computed({
  get() {
    if (enableLeftSide.value && enableRightSide.value) {
      return 'three'
    }
    if (enableLeftSide.value && !enableRightSide.value) {
      return 'left'
    }
    if (!enableLeftSide.value && enableRightSide.value) {
      return 'right'
    }
    return 'left'
  },
  set(val: string) {
    switch (val) {
      case 'three':
        enableLeftSide.value = true
        enableRightSide.value = true
        break
      case 'left':
        enableLeftSide.value = true
        enableRightSide.value = false
        break
      case 'right':
        enableLeftSide.value = false
        enableRightSide.value = true
        break
    }
  },
})
</script>

<template>
  <div>
    <KPageHeader title="Iconify" content="提供双栏、三栏布局，侧栏支持折叠。" />
    <KLayoutContainer :enable-left-side="enableLeftSide" :enable-right-side="enableRightSide" :left-side-width="leftSideWidth" :right-side-width="rightSidewidth">
      <template #leftSide>
        <h2>左侧栏</h2>
        <p>调整宽度</p>
        <ElSlider
          v-model="leftSideWidth"
          :step="10"
          :min="250"
          :max="350"
        />
      </template>
      <template #rightSide>
        <h2>右侧栏</h2>
        <p>调整宽度</p>
        <ElSlider
          v-model="rightSidewidth"
          :step="10"
          :min="250"
          :max="350"
        />
      </template>
      <template #default>
        <h2>模式选择</h2>
        <el-radio-group v-model="layout" size="large">
          <el-radio-button value="three">
            <SvgIcon name="i-bi:layout-three-columns" />
          </el-radio-button>
          <el-radio-button value="left">
            <SvgIcon name="i-bi:layout-sidebar" />
          </el-radio-button>
          <el-radio-button value="right">
            <SvgIcon name="i-bi:layout-sidebar-reverse" />
          </el-radio-button>
        </el-radio-group>
        <h2>示例页面</h2>
        <KButton @click="router.push('pagesExampleSidelayout')">
          查看
        </KButton>
      </template>
    </KLayoutContainer>
  </div>
</template>
