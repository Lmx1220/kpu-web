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
  console.log('开始')
}
function onFinished() {
  console.log('结束')
}
</script>

<template>
  <div>
    <KPageHeader title="计数到" description="KCountTo" />
    <KPageMain>
      <KCountTo :start-val="0" :end-val="100000" />
    </KPageMain>
    <KPageMain title="持续10秒">
      <KCountTo :start-val="0" :end-val="100000" :duration="10000" />
    </KPageMain>
    <KPageMain title="保留2位小数">
      <KCountTo :start-val="0" :end-val="100000" :decimals="2" />
    </KPageMain>
    <KPageMain title="带前缀和后缀">
      <KCountTo :start-val="0" :end-val="100000" prefix="￥" suffix="元" />
    </KPageMain>
    <KPageMain title="手动控制">
      <KCountTo ref="countToRef" :start-val="form.startVal" :end-val="form.endVal" :autoplay="false" @on-started="onStarted" @on-finished="onFinished" />
      <KButton @click="start">
        开始
      </KButton>
      <KButton @click="reset">
        重置
      </KButton>
      <KButton @click="form.endVal += 10000">
        增加10000
      </KButton>
    </KPageMain>
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
