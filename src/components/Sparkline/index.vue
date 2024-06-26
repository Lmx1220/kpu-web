<script setup lang="ts">
import sparkline from './sparkline'

defineOptions({
  name: 'Sparkline',
})

const props = withDefaults(
  defineProps<{
    value: number[] | {
      value: number
      tooltip: string
    }[]
    width?: number
    height?: number
    strokeWidth?: number
    strokeColor?: string
    fillColor?: string
    cursorColor?: string
    spotColor?: string
    tooltip?: boolean
  }>(),
  {
    width: 100,
    height: 30,
    strokeWidth: 3,
    strokeColor: '#dc2b33',
    fillColor: 'transparent',
    cursorColor: '#dc2b33',
    spotColor: '#dc2b33',
    tooltip: false,
  },
)

const sparklineRef = ref()
const tip = ref({
  show: false,
  content: '',
  top: 0,
  left: 0,
})

onMounted(() => {
  sparkline(sparklineRef.value, props.value, props.tooltip && {
    onmousemove: (event: MouseEvent, datapoint: any) => {
      tip.value.show = true
      tip.value.content = datapoint.tooltip
      tip.value.top = event.offsetY
      tip.value.left = event.offsetX + 20
    },
    onmouseout: () => {
      tip.value.show = false
    },
  })
})
</script>

<template>
  <div class="sparkline">
    <svg ref="sparklineRef" :width="width" :height="height" :stroke-width="strokeWidth" :stroke="strokeColor" :fill="fillColor" />
    <span v-if="tooltip" v-show="tip.show" class="tooltip" :style="[`left: ${tip.left}px`, `top: ${tip.top}px`]">{{ tip.content }}</span>
  </div>
</template>

<style lang="scss" scoped>
.sparkline {
  position: relative;

  :deep(.sparkline--cursor) {
    stroke: v-bind("cursorColor");
  }

  :deep(.sparkline--spot) {
    fill: v-bind("spotColor");
    stroke: v-bind("spotColor");
  }

  .tooltip {
    position: absolute;
    z-index: 9999;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    background: rgb(0 0 0 / 70%);
  }
}
</style>
