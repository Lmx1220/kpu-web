<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KPageHeader title="徽章" description="KBadge" />
    <KPageMain>
      <div class="flex gap-8">
        <KBadge :value="true">
          <KIcon name="i-ri:notification-3-line" />
        </KBadge>
        <KBadge :value="99">
          <KIcon name="i-ri:notification-3-line" />
        </KBadge>
        <KBadge value="噢">
          <KIcon name="i-ri:notification-3-line" />
        </KBadge>
        <KBadge value="9" variant="secondary">
          <KIcon name="i-ri:notification-3-line" />
        </KBadge>
        <KBadge value="9" variant="destructive">
          <KIcon name="i-ri:notification-3-line" />
        </KBadge>
      </div>
    </KPageMain>
  </div>
</template>
