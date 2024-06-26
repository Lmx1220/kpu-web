<script setup lang="ts">
defineOptions({
  name: 'ComponentExampleSparkline',
})
const data = ref([1, 5, 2, 4, 8, 3, 7])
const data1 = ref([{
  tooltip: '值：1',
  value: 1,
}, {
  tooltip: '值：3',
  value: 3,
}, {
  tooltip: '值：5',
  value: 5,
}, {
  tooltip: '值：8',
  value: 8,
}, {
  tooltip: '值：4',
  value: 4,
}, {
  tooltip: '值：6',
  value: 6,
}, {
  tooltip: '值：9',
  value: 9,
}])
</script>

<template>
  <div>
    <PageHeader title="迷你图" content="Sparkline" />
    <PageMain>
      <Sparkline :value="data" />
      <Sparkline :value="data1" stroke-color="#409eff" fill-color="#b3d8ff" />
      <Sparkline :value="data1" tooltip />
      <Sparkline
        :value="data1" stroke-color="#409eff" fill-color="#b3d8ff"
        cursor-color="#e6a23c"
        spot-color="#909399"
      />
    </PageMain>
  </div>
</template>
