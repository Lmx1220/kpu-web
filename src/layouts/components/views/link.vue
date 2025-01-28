<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import { useClipboard } from '@vueuse/core'
import { toast } from 'vue-sonner'

defineOptions({
  name: 'LinkView',
})

const route = useRoute()
const settingsStore = useSettingsStore()

const { copy, copied } = useClipboard()
watch(copied, (val) => {
  val && toast.success('复制成功', {

  })
})

function open() {
  window.open(route.meta.link, '_blank')
}
</script>

<template>
  <div class="absolute h-full w-full flex flex-col">
    <Transition :name="settingsStore.settings.mainPage.enableTransition ? settingsStore.settings.mainPage.transitionMode : ''" mode="out-in" appear>
      <PageMain :key="route.meta.link" class="flex flex-1 flex-col justify-center">
        <div class="flex flex-col items-center">
          <KpuIcon name="i-icon-park-twotone:planet" :size="120" class="text-ui-primary/80" />
          <div class="my-2 text-xl text-dark dark-text-white">
            是否访问此链接
          </div>
          <div class="my-2 max-w-[300px] cursor-pointer text-center text-[14px] text-stone-5" @click="route.meta.link && copy(route.meta.link)">
            <KpuTooltip text="复制链接">
              <div class="line-clamp-3">
                {{ route.meta.link }}
              </div>
            </KpuTooltip>
          </div>
          <KpuButton class="my-4" @click="open">
            <KpuIcon name="i-ri:external-link-fill" />
            立即访问
          </KpuButton>
        </div>
      </PageMain>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.slide-left-enter-active,
.slide-right-enter-active,
.slide-top-enter-active,
.slide-bottom-enter-active {
  transition: 0.2s;
}

.fade-leave-active,
.slide-left-leave-active,
.slide-right-leave-active,
.slide-top-leave-active,
.slide-bottom-leave-active {
  transition: 0.15s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-from {
  margin-left: 20px;
  opacity: 0;
}

.slide-left-leave-to {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-enter-from {
  margin-left: -20px;
  opacity: 0;
}

.slide-right-leave-to {
  margin-left: 20px;
  opacity: 0;
}

.slide-top-enter-from {
  margin-top: 20px;
  opacity: 0;
}

.slide-top-leave-to {
  margin-top: -20px;
  opacity: 0;
}

.slide-bottom-enter-from {
  margin-top: -20px;
  opacity: 0;
}

.slide-bottom-leave-to {
  margin-top: 20px;
  opacity: 0;
}
</style>
