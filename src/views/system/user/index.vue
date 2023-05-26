<script setup lang="ts">
defineOptions({
  name: 'SystemUser',
})
const mes = ref('hello world')
</script>

<template>
  <div class="user">
    <h1>用户管理</h1>
    <p>{{ mes }}</p>
  </div>
</template>

<style scoped lang="scss">
// scss
</style>
