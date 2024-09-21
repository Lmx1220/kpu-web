<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings.ts'
import useWatermarkStore from '@/store/modules/watermark.ts'
import dayjs from '@/utils/dayjs.ts'

const settingsStore = useSettingsStore()
const watermarkStore = useWatermarkStore()

const type = computed({
  get() {
    return settingsStore.settings.app.enableWatermark
  },
  set(value) {
    settingsStore.$patch((val) => {
      val.settings.app.enableWatermark = value
    })
  },
})
// 更新水印
function updateWatermark() {
  watermarkStore.update({
    text: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
  })
}
// 重置水印
function resetWatermark() {
  watermarkStore.update()
}
</script>

<template>
  <div>
    <PageHeader title="页面水印" content="在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生" />
    <PageMain title="可在 /src/store/modules/watermark.ts 文件里定制水印文案内容">
      <ElSpace>
        <ElRadioGroup v-model="type">
          <ElRadioButton :value="true">
            开启
          </ElRadioButton>
          <ElRadioButton :value="false">
            关闭
          </ElRadioButton>
        </ElRadioGroup>
        <ElButton v-if="type" @click="updateWatermark">
          更新水印
        </ElButton>
        <ElButton v-if="type" @click="resetWatermark">
          重置水印
        </ElButton>
      </ElSpace>
    </PageMain>
  </div>
</template>
