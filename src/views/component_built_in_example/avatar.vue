<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KpuPageHeader title="头像" description="KpuAvatar" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KpuAvatar src="https://kpu-web.github.io/logo.png" />
        <KpuAvatar src="https://kpu-web.github.io/logo.png" shape="square" />
        <KpuAvatar src="" fallback="lmx" />
      </div>
    </KpuPageMain>
  </div>
</template>
