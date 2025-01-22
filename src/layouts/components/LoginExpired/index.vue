<script setup lang="ts">
import { useKpuModal } from '@/ui/components/KModal/use-modal.ts'
import eventBus from '@/utils/eventBus'
import LoginAgainForm from './LoginAgainForm.vue'

const [KModal, modalApi] = useKpuModal({
  closable: false,
  closeOnPressEscape: false,
  closeOnClickModal: false,
})
const open = ref(false)
onMounted(() => {
  eventBus.on('global-login-again-visible', () => {
    modalApi.open()
  })
})
function onAfterLogin() {
  modalApi.close()
}
</script>

<template>
  <KModal
    v-model="open"
    :header="false"
    :footer="false"
    :closable="false"
    :close-on-click-overlay="false"
    :close-on-press-escape="false"
  >
    <LoginAgainForm @on-after-login="onAfterLogin" />
  </KModal>
</template>
