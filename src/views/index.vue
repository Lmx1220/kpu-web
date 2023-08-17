<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDialogContext } from '@/components/Dialog/hooks/useDialogContext'
import { useDialog } from '@/components/Dialog/hooks/useDialog'

defineOptions({
  name: 'Home',
})
const { t } = useI18n()
const { t: ti } = useI18nT()
const msg = ref('Hello, Vue 3.0 + Vite')
const [register, { openDialog }] = useDialog()
const loadingRef = ref(false)

function onOpen() {
  openDialog()
  // loadingRef.value = true
  // setTimeout(() => {
  //   loadingRef.value = false
  // }, 3000)
}

const modalFn = useDialogContext()

function onOk() {
  nextTick(() => {
    modalFn?.redoDialogHeight?.()
  })
  console.log('ok')
}

function visibleChange() {
  console.log('visibleChange')
}
</script>

<template>
  <div>
    {{ msg }}
    <div>{{ ti("hello") }}</div>
    <div>{{ t("hello") }}</div>
    <div>{{ t('component.dialog.maximize') }}</div>
    <div>{{ t("language") }}</div>
    <div>{{ t("common.cancelText") }}</div>
    <el-button @click="onOpen">
      开启
    </el-button>
    <BaseDialog
      title="s" :loading="loadingRef" :show-cancel-btn="false" :ok-button-props="{ disabled: true }"
      loading-tip="加载" @register="register" @ok="onOk" @visibleChange="visibleChange"
    >
      <el-form>
        <el-form-item v-for="index in 100" :key="index" :label="`用户名${index}`">
          <el-input v-model="msg" />
        </el-form-item>
      </el-form>
    </BaseDialog>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
