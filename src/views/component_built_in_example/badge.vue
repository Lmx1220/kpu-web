<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KpuPageHeader title="徽章" description="KpuBadge" />
    <KpuPageMain>
      <div class="flex gap-8">
        <KpuBadge :value="true">
          <KpuIcon name="i-ri:notification-3-line" />
        </KpuBadge>
        <KpuBadge :value="99">
          <KpuIcon name="i-ri:notification-3-line" />
        </KpuBadge>
        <KpuBadge value="噢">
          <KpuIcon name="i-ri:notification-3-line" />
        </KpuBadge>
        <KpuBadge value="9" variant="secondary">
          <KpuIcon name="i-ri:notification-3-line" />
        </KpuBadge>
        <KpuBadge value="9" variant="destructive">
          <KpuIcon name="i-ri:notification-3-line" />
        </KpuBadge>
      </div>
    </KpuPageMain>
  </div>
</template>
