<script setup lang="ts">
import { useLocale } from '@/locales/useLocale.ts'

defineOptions({
  name: 'I18n',
})

const isAnimating = ref(false)
const { getLocale } = useLocale()

watch(getLocale, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isAnimating.value = true
  }
})
</script>

<template>
  <I18nSelector :class="{ animation: isAnimating }" @animationend="isAnimating = false">
    <KButton variant="ghost" size="icon">
      <KIcon name="i-ri:translate" :size="16" />
    </KButton>
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
