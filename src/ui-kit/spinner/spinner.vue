<script lang="ts" setup>
import { cn } from '@/utils/classNames.ts'
import { ref, watch } from 'vue'

interface Props {
  class?: string
  /**
   * @zh_CN 最小加载时间
   * @en_US Minimum loading time
   */
  minLoadingTime?: number
  /**
   * @zh_CN loading状态开启
   */
  spinning?: boolean
}

defineOptions({
  name: 'VbenSpinner',
})

const props = withDefaults(defineProps<Props>(), {
  minLoadingTime: 50,
})
// const startTime = ref(0);
const showSpinner = ref(false)
const renderSpinner = ref(true)
const timer = ref<ReturnType<typeof setTimeout>>()

watch(
  () => props.spinning,
  (show) => {
    if (!show) {
      showSpinner.value = false
      clearTimeout(timer.value)
      return
    }

    // startTime.value = performance.now();
    timer.value = setTimeout(() => {
      // const loadingTime = performance.now() - startTime.value;

      showSpinner.value = true
      if (showSpinner.value) {
        renderSpinner.value = true
      }
    }, props.minLoadingTime)
  },
  {
    immediate: true,
  },
)

function onTransitionEnd() {
  if (!showSpinner.value) {
    renderSpinner.value = false
  }
}
</script>

<template>
  <div
    :class="
      cn(
        'flex-center z-100  bg-stone-2/75 dark-bg-stone-8/75 absolute left-0 top-0 size-full backdrop-blur-sm transition-all duration-500',
        {
          'invisible opacity-0': !showSpinner,
        },
        props.class,
      )
    "
    @transitionend="onTransitionEnd"
  >
    <div
      class="loader relative size-12 after:absolute before:absolute after:left-0 after:top-0 before:left-0 before:top-[60px] after:h-full after:w-full before:h-[5px] before:w-12 after:rounded before:rounded-[50%] after:bg-ui-primary before:bg-ui-primary/50 after:content-[''] before:content-['']"
    />
  </div>
</template>

<style scoped>
.loader {
  &::before {
    animation: loader-shadow-ani 0.5s linear infinite;
  }

  &::after {
    animation: loader-jump-ani 0.5s linear infinite;
  }
}

@keyframes loader-jump-ani {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 40px;
    transform: translateY(18px) scale(1, 0.9) rotate(45deg);
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes loader-shadow-ani {
  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
