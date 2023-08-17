<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  canFullscreen?: boolean
  fullscreen?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  canFullscreen: true,
  // fullscreen: false,
})

const emits = defineEmits<{
  'fullscreen': [Event]
  'cancel': [Event]
}>()
defineOptions({
  name: 'BasicDialogHeader',
})

function handleFullScreen(e: Event) {
  e?.stopPropagation()
  e?.preventDefault()
  emits('fullscreen', e)
}

function handleCancel(e: Event) {
  emits('cancel', e)
}

const { t } = useI18n()

function handleTitleDbClick(e: Event) {
  if (!props.canFullscreen) {
    return
  }
  emits('fullscreen', e)
}
</script>

<template>
  <div>
    <template v-if="canFullscreen">
      <div class="dialog-close">
        <el-tooltip v-if="fullscreen" :content="t('component.dialog.restore')" placement="bottom">
          <svg-icon name="i-ri:fullscreen-exit-line" @click="handleFullScreen" />
        </el-tooltip>
        <el-tooltip v-else :content="t('component.dialog.maximize')" placement="bottom">
          <svg-icon name="ri:fullscreen-line" @click="handleFullScreen" />
        </el-tooltip>
        <el-tooltip :content="t('component.dialog.close')" placement="bottom">
          <svg-icon name="ep:close" @click="handleCancel" />
        </el-tooltip>
      </div>
    </template>
    <div class="dialog-title" @dblclick="handleTitleDbClick">
      {{ title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-close {
  position: absolute;
  top: 6px;
  right: 0;
  padding: 0;
  width: 86px;
  height: 54px;
  line-height: 54px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: var(--el-message-close-size, 16px);

  > i {
    margin-left: 16px;
  }
}
</style>
