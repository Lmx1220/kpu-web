<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'I18n',
})

const isAnimating = ref(false)
const settingsStore = useSettingsStore()
watch(() => settingsStore.settings.app.defaultLang, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isAnimating.value = true
  }
})
</script>

<template>
  <I18nSelector :class="{ animation: isAnimating }" @animationend="isAnimating = false">
    <KpuButton variant="ghost" size="icon">
      <KpuIcon name="i-ri:translate" :size="16" />
    </KpuButton>
  </I18nSelector>
</template>

<style scoped>
.animation {
  transform-origin: center top;
  animation: animation 1s;
}

@keyframes animation {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}
</style>
