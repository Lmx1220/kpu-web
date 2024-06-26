<script setup lang="ts">
import { getElementLocales } from '@/locales/useLocale.ts'

defineOptions({
  name: 'I18n',
})

const isAnimating = ref(false)
const locales = computed(() => getElementLocales())

watch(() => locales, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isAnimating.value = true
  }
})
</script>

<template>
  <I18nSelector class="flex-center cursor-pointer px-2 py-1" :class="{ animation: isAnimating }" @animationend="isAnimating = false">
    <SvgIcon name="i-ri:translate" />
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
