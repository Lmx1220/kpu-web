<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
const tabs = ref(1)
</script>

<template>
  <div>
    <KPageHeader title="可阅读时间" description="KTimeAgo" />
    <KPageMain>
      <KTimeAgo :datetime="new Date()" :tabs="tabs" />
    </KPageMain>
    <KPageMain title="距离 2020/10/17">
      <KTimeAgo :datetime="new Date()" :tabs="tabs" />
    </KPageMain>
    <KPageMain title="显示秒，且更新间隔为1秒">
      <KTimeAgo :datetime="new Date()" :tabs="tabs" />
    </KPageMain>
  </div>
</template>
