<script lang="ts" setup>
import CodePreview from '../DetailForm/CodePreview.vue'
import { useDialogInner } from '@/components/Dialog/hooks/useDialog'

defineOptions({
  name: 'ToolsGeneratorPreviewMode',
})
const genData = ref<{
  ids?: string[]
  template?: 'WEB_PLUS' | 'BACKEND'
}>({})

function visibleChange(v: boolean) {
  if (!v) {
    genData.value = {}
  }
}

const [register] = useDialogInner((data) => {
  data && onDataReceive(data)
})

function onDataReceive(data: any) {
  genData.value = data
}
</script>

<template>
  <BaseDialog
    :close-on-click-modal="true"
    default-fullscreen
    loading-tip="加载"
    title="预览代码"
    @register="register"
    @visible-change="visibleChange"
  >
    <CodePreview v-if="genData.ids" :id="genData.ids" :template="genData.template" />
  </BaseDialog>
</template>

<style lang="scss" scoped>
/* scss */
</style>
