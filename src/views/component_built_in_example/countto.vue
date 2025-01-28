<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
// import Alert from './components/alert.vue'

const countToRef = ref()
const form = ref({
  startVal: 0,
  endVal: 2017,
  duration: 4000,
  decimals: 0,
  separator: ',',
  prefix: '¥ ',
  suffix: ' 元',
})

function start() {
  countToRef.value.start()
}
function reset() {
  countToRef.value.reset()
}

function onStarted() {
  console.warn('开始')
}
function onFinished() {
  console.warn('结束')
}
</script>

<template>
  <div>
    <KpuPageHeader title="计数到" description="KpuCountTo" />
    <KpuPageMain>
      <KpuCountTo :start-val="0" :end-val="100000" />
    </KpuPageMain>
    <KpuPageMain title="持续10秒">
      <KpuCountTo :start-val="0" :end-val="100000" :duration="10000" />
    </KpuPageMain>
    <KpuPageMain title="保留2位小数">
      <KpuCountTo :start-val="0" :end-val="100000" :decimals="2" />
    </KpuPageMain>
    <KpuPageMain title="带前缀和后缀">
      <KpuCountTo :start-val="0" :end-val="100000" prefix="￥" suffix="元" />
    </KpuPageMain>
    <KpuPageMain title="手动控制">
      <KpuCountTo ref="countToRef" :start-val="form.startVal" :end-val="form.endVal" :autoplay="false" @on-started="onStarted" @on-finished="onFinished" />
      <div>
        <KpuButton @click="start">
          开始
        </KpuButton>
        <KpuButton @click="reset">
          重置
        </KpuButton>
        <KpuButton @click="form.endVal += 10000">
          增加10000
        </KpuButton>
      </div>
    </KpuPageMain>
  </div>
</template>

<style scoped>
.count-to {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 60px;
  color: #f6416c;
}
</style>
