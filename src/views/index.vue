<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'Home',
})
const { t } = useI18n()
const { t: ti } = useI18nT()
const msg = ref('Hello, Vue 3.0 + Vite')
console.log(t('en.hello'))
</script>

<template>
  <div>
    {{ msg }}
    <div>{{ ti("hello") }}</div>
    <div>{{ t("hello") }}</div>
    <div>{{ t("language") }}</div>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
