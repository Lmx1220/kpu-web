<script setup lang="ts">
defineOptions({
  name: 'PageReload',
})

const mainPage = useMainPage()

const isAnimating = ref(false)

function handleClick() {
  isAnimating.value = true
  mainPage.reload()
}
</script>

<template>
  <span class="flex-center cursor-pointer px-2 py-1" :class="{ animation: isAnimating }" @click="handleClick" @animationend="isAnimating = false">
    <SvgIcon name="i-iconoir:refresh-double" />
  </span>
</template>

<style scoped>
.animation {
  animation: animation 1s;
}

@keyframes animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
