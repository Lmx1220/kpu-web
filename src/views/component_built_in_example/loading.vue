<script setup lang="ts">
import { loadingHide, loadingShow } from '@/ui/components/KLoading/index.ts'

defineOptions({
  name: 'ComponentExampleLoading',
})
const type = ref<'plane' | 'chase' | 'bounce' | 'wave' | 'pulse' | 'flow' | 'swing' | 'circle' | 'circle-fade' | 'grid' | 'fold' | 'wander'>('plane')
const size = ref(50)
const color = ref('#ffffff')
const text = ref('加载中...')
function opens() {
  loadingShow({
    type: type.value,
    size: size.value,
    color: color.value,
    text: text.value,
  })
  setTimeout(() => {
    loadingHide()
  }, 2000)
}
</script>

<template>
  <div>
    <KPageHeader title="加载遮罩" content="KLoading" />
    <KPageMain>
      <ElForm>
        <ElFormItem
          label="类型"
        >
          <ElRadioGroup v-model="type">
            <ElRadioButton value="plane">
              Plane
            </ElRadioButton>
            <ElRadioButton value="chase">
              Chase
            </ElRadioButton>
            <ElRadioButton value="wave">
              Wave
            </ElRadioButton>
            <ElRadioButton value="pulse">
              Pulse
            </ElRadioButton>
            <ElRadioButton value="flow">
              Flow
            </ElRadioButton>
            <ElRadioButton value="swing">
              Swing
            </ElRadioButton>
            <ElRadioButton value="circle">
              Circle
            </ElRadioButton>
            <ElRadioButton value="circle-fade">
              circle-fade
            </ElRadioButton>
            <ElRadioButton value="grid">
              Grid
            </ElRadioButton>
            <ElRadioButton value="fold">
              Fold
            </ElRadioButton>
            <ElRadioButton value="wander">
              Wander
            </ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="尺寸">
          <ElInputNumber v-model="size" controls-position="right" :min="20" :max="200" :step="10" />
        </ElFormItem>
        <ElFormItem label="颜色">
          <ElColorPicker v-model="color" />
        </ElFormItem>
        <ElFormItem label="提示文字">
          <ElInput v-model="text" />
        </ElFormItem>
      </ElForm>
      <ElButton @click="opens">
        加载 Loading（演示控制在 2 秒后关闭）
      </ElButton>
    </KPageMain>
  </div>
</template>
