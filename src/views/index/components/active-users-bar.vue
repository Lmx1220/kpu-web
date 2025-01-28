<script setup lang="ts">
import type { IntervalHandle } from '#/index'
import * as Echarts from 'echarts'
import _ from 'lodash'

let number: IntervalHandle
const option = ref({
  grid: {
    left: '20px',
    top: '5px',
    right: '20px',
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    data: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00'],
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: {
    barWidth: 18,
    name: '',
    type: 'bar',
    data: [_.random(50, 100), _.random(10, 100), _.random(10, 100), _.random(10, 100), _.random(10, 100), _.random(50, 100)],
    itemStyle: {
      color: new Echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: '#0f0f0f',
      }, {
        offset: 1,
        color: '#0f0f0f',
      }]),
    },
  },
})
onMounted(() => {
  number = setInterval(() => {
    option.value.series.data = [_.random(50, 100), _.random(10, 100), _.random(10, 100), _.random(10, 100), _.random(10, 100), _.random(50, 100)]
    option.value.series.type = option.value.series.type === 'bar' ? 'line' : 'bar'
    // eslint-disable-next-line ts/no-use-before-define
    chart1 && chart1.setOption(option.value)
  }, 3000)
})
onBeforeUnmount(() => {
  number && clearInterval(number)
})

const chart1Ref = ref()
let chart1: any

onMounted(() => {
  initChart1()
  window.addEventListener('resize', () => {
    chart1.resize()
  })
})

function initChart1() {
  chart1 = Echarts.init(chart1Ref.value)
  // 传入数据
  chart1.setOption(option.value)
}
</script>

<template>
  <div>
    <div class="echarts vab-chart">
      <div ref="chart1Ref" style="width: 100%; height: 100%;" />
    </div>
  </div>
</template>

<style scoped>
.echarts {
  position: absolute;
  right: 10px;
  bottom: 22px;
  width: calc(100% - 170px) !important;
  height: 60px !important;
}

.vab-chart {
  width: 100%;
  min-width: 170px;
  height: 100%;
  min-height: 90px;
}
</style>
