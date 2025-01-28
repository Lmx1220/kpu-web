<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const tabs = ref(1)
</script>

<template>
  <div>
    <KpuPageHeader title="可阅读时间" description="KpuTimeAgo" />
    <KpuPageMain>
      <KpuTimeAgo :datetime="new Date()" :tabs="tabs" />
    </KpuPageMain>
    <KpuPageMain title="距离 2020/10/17">
      <KpuTimeAgo :datetime="new Date()" :tabs="tabs" />
    </KpuPageMain>
    <KpuPageMain title="显示秒，且更新间隔为1秒">
      <KpuTimeAgo :datetime="new Date()" :tabs="tabs" />
    </KpuPageMain>
  </div>
</template>
