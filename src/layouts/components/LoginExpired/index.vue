<script setup lang="ts">
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import eventBus from '@/utils/eventBus'
import LoginAgainForm from './LoginAgainForm.vue'

const [KpuModal, modalApi] = useKpuModal({
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
  <KpuModal
    v-model="open"
    :header="false"
    :footer="false"
    :closable="false"
    :close-on-click-overlay="false"
    :close-on-press-escape="false"
  >
    <LoginAgainForm @on-after-login="onAfterLogin" />
  </KpuModal>
</template>
