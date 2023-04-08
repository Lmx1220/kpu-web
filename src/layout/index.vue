<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <div class="man-container">
      <RouterView v-slot="{ Component, route }">
        <transition name="main" mode="out-in" appear>
          <KeepAlive :include="['/']">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.laoyout {
  height: 100%;
  width: 100vh;
}
</style>
