<script setup lang="ts" name="IframeView">
import useIframeStore from '@/store/modules/iframe'

const route = useRoute()
const iframeStore = useIframeStore()
const iframeRef = ref<HTMLIFrameElement[]>()
watch(
  () => route.fullPath,
  (value) => {
    nextTick(() => {
      iframeRef.value?.forEach((iframe) => {
        if (iframe.dataset.path === value) {
          iframe.onload = () => {
            iframeStore.closeLoading(value)
          }
        }
      })
    })
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="iframe-view">
    <div
      v-for="iframe in iframeStore.openedList" :key="iframe.path" v-loading="iframe.isLoading" class="iframe"
      :class="{ actived: route.fullPath === iframe.path }"
    >
      <transition name="iframe" mode="out-in" appear>
        <iframe v-show="route.fullPath === iframe.path" ref="iframeRef" :src="iframe.src" :data-path="iframe.path" frameborder="0" />
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.iframe-view,
.iframe {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.actived {
    z-index: 1;
  }

  iframe {
    flex: 1;
    width: 100%;
    height: 100%
  }
}

.iframe-enter-active {
    transition: .2s
}

.iframe-leave-active {
    transition: .15s
}

.iframe-enter-from {
    opacity: 0;
    margin-left: -20px
}

.iframe-leave-to {
    opacity: 0;
    margin-left: 20px
}
</style>
