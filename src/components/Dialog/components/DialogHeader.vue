<script setup lang="ts">
interface Props {
  canFullscreen?: boolean
  fullscreen?: boolean
  title?: string
}

defineOptions({
  name: 'BasicDialogHeader',
})

const props = withDefaults(defineProps<Props>(), {
  canFullscreen: true,
  // fullscreen: false,
})

const emits = defineEmits<{
  fullscreen: [Event]
  cancel: [Event]
}>()
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
        <ElTooltip v-if="fullscreen" :content="t('component.dialog.restore')" placement="bottom">
          <SvgIcon name="i-ri:fullscreen-exit-line" @click="handleFullScreen" />
        </ElTooltip>
        <ElTooltip v-else :content="t('component.dialog.maximize')" placement="bottom">
          <SvgIcon name="ri:fullscreen-line" @click="handleFullScreen" />
        </ElTooltip>
        <ElTooltip :content="t('component.dialog.close')" placement="bottom">
          <SvgIcon name="ep:close" @click="handleCancel" />
        </ElTooltip>
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
  width: 86px;
  height: 54px;
  padding: 0;
  font-size: var(--el-message-close-size, 16px);
  line-height: 54px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;

  > i {
    margin-left: 16px;
  }
}
</style>
