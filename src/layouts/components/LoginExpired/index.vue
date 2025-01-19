<script setup lang="ts">
import eventBus from '@/utils/eventBus'
import LoginAgainForm from './LoginAgainForm.vue'

const open = ref(false)
onMounted(() => {
  eventBus.on('global-login-again-visible', () => {
    open.value = true
  })
})
function onAfterLogin() {
  open.value = false
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

<style scoped>

</style>
