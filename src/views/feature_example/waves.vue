<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import VWave from 'v-wave'

const { vWave } = VWave.createLocalWaveDirective({
})

function toWave(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader title="水波纹" content="更多设置请查看文档">
      <ElButton v-wave @click="toWave('https://github.com/justintaddei/v-wave')">
        <template #icon>
          <SvgIcon
            name="i-ep:link"
          />
        </template>
        访问 v-wave
      </ElButton>
    </pageheader>
    <KPageMain>
      <ElButton v-wave>
        默认按钮
      </ElButton>
      <ElButton v-wave type="primary">
        主要按钮
      </ElButton>
      <ElButton v-wave type="success">
        成功按钮
      </ElButton>
      <ElButton v-wave type="info">
        信息按钮
      </ElButton>
      <ElButton v-wave type="warning">
        警告按钮
      </ElButton>
      <ElButton v-wave type="danger">
        危险按钮
      </ElButton>
      <div my4>
        <ElImage v-wave :src="logo" class="h-25 w-25" />
      </div>
      <div v-wave my-4 h-25 w-25 flex-center border-1 border-stone-5 border-solid>
        点击我
      </div>
      <div v-wave="{ color: '#f00', finalOpacity: 0.3 }" my-4 h-25 w-25 flex-center border-1 border-stone-5 border-solid>
        设置颜色
      </div>
      <div w-50>
        <ElInput v-wave>
          <template #append>
            <SvgIcon

              name="ep:search"
              class="cursor-pointer"
            />
          </template>
        </ElInput>
      </div>
    </KPageMain>
  </div>
</template>
