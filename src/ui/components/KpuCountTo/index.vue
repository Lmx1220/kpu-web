<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'

defineOptions({
  name: 'KCountTo',
})
const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  duration: 2000,
  transition: 'linear',
  delay: 0,
  decimals: 0,
  separator: ',',
})
const emits = defineEmits(['onStarted', 'onFinished'])
interface Props {
  startVal: number
  endVal: number
  autoplay?: boolean
  duration?: number
  transition?: keyof typeof TransitionPresets
  delay?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
}
const disabled = ref(false)
const source = ref(props.startVal)
const outputValue = useTransition(source, {

  duration: props.duration,
  transition: TransitionPresets[props.transition],
  delay: props.delay,
  disabled,
  onFinished: () => emits('onFinished'),
  onStarted: () => emits('onStarted'),
})
const value = computed(() => {
  let num: number | string = unref(outputValue)
  num = Number(num).toFixed(props.decimals)
  if (props.separator) {
    const [x1, x2] = num.split('.')
    num = x1.replace(/\B(?=(\d{3})+(?!\d))/g, props.separator) + (x2 ? `.${x2}` : '')
  }
  if (props.prefix) {
    num = props.prefix + num
  }
  if (props.suffix) {
    num = num + props.suffix
  }
  return num
})
function start() {
  source.value = props.endVal
}
function reset() {
  disabled.value = true
  source.value = props.startVal
  nextTick(() => {
    disabled.value = false
  },
  )
}
watch([() => props.startVal, () => props.endVal], () => {
  start()
})
onMounted(() => {
  props.autoplay && start()
})
defineExpose({ start, reset })
</script>

<template>
  <span>
    {{ value }}
  </span>
</template>
