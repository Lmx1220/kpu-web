<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { useKModal } from 'src/ui/components/KpuModal'

const modal = ref(false)
const modalInfo = ref({
  maximizable: false,
  closable: true,
  draggable: false,
  center: false,
  header: true,
  footer: true,
  contentHeight: '',
  loading: false,
})
watch(() => modalInfo.value.loading, (loading) => {
  if (loading) {
    setTimeout(() => {
      modalInfo.value.loading = false
    }, 3000)
  }
})

function showModalInfo() {
  useKModal().info({
    title: '温馨提醒',
    content: '这是 info 弹窗',
  })
}
function showModalSuccess() {
  useKModal().success({
    title: '温馨提醒',
    content: '这是 success 弹窗',
  })
}
function showModalWarning() {
  useKModal().warning({
    title: '温馨提醒',
    content: '这是 warning 弹窗',
  })
}
function showModalError() {
  useKModal().error({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
  })
}
function showModalConfirm() {
  useKModal().confirm({
    title: '温馨提醒',
    content: '这是 confirm 弹窗',
  })
}
</script>

<template>
  <div>
    <KpuPageHeader title="弹窗" description="KModal" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KButton @click="modal = true">
          打开
        </KButton>
        <KButton @click="showModalInfo">
          Info
        </KButton>
        <KButton @click="showModalSuccess">
          Success
        </KButton>
        <KButton @click="showModalWarning">
          Warning
        </KButton>
        <KButton @click="showModalError">
          Error
        </KButton>
        <KButton @click="showModalConfirm">
          Confirm
        </KButton>
      </div>
      <KModal v-model="modal" title="标题" description="这里是一段描述介绍" :maximizable="modalInfo.maximizable" :closable="modalInfo.closable" :draggable="modalInfo.draggable" :center="modalInfo.center" :loading="modalInfo.loading" :header="modalInfo.header" :footer="modalInfo.footer">
        <div :class="modalInfo.contentHeight">
          <div class="flex-start-center flex-wrap gap-2">
            <KButton :variant="modalInfo.maximizable ? 'default' : 'outline'" class="w-full" @click="modalInfo.maximizable = !modalInfo.maximizable">
              最大化按钮
            </KButton>
            <KButton :variant="modalInfo.closable ? 'default' : 'outline'" class="w-full" @click="modalInfo.closable = !modalInfo.closable">
              关闭按钮
            </KButton>
            <KButton :variant="modalInfo.draggable ? 'default' : 'outline'" class="w-full" @click="modalInfo.draggable = !modalInfo.draggable">
              拖拽
            </KButton>
            <KButton :variant="modalInfo.center ? 'default' : 'outline'" class="w-full" @click="modalInfo.center = !modalInfo.center">
              居中显示
            </KButton>
            <KButton :variant="modalInfo.header ? 'default' : 'outline'" class="w-full" @click="modalInfo.header = !modalInfo.header">
              头部区域
            </KButton>
            <KButton :variant="modalInfo.footer ? 'default' : 'outline'" class="w-full" @click="modalInfo.footer = !modalInfo.footer">
              尾部区域
            </KButton>
            <KButton :variant="!!modalInfo.contentHeight ? 'default' : 'outline'" class="w-full" @click="modalInfo.contentHeight = !!modalInfo.contentHeight ? '' : 'h-400'">
              切换内容高度
            </KButton>
            <KButton variant="outline" class="w-full" @click="modalInfo.loading = true">
              显示加载中
            </KButton>
          </div>
        </div>
      </KModal>
    </KpuPageMain>
  </div>
</template>
