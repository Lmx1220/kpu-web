<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KPageHeader title="按钮" description="KButton" />
    <KPageMain>
      <div class="flex gap-4">
        <KButton>
          按钮
        </KButton>
        <KButton variant="destructive">
          按钮
        </KButton>
        <KButton variant="outline">
          按钮
        </KButton>
        <KButton variant="secondary">
          按钮
        </KButton>
        <KButton variant="ghost">
          按钮
        </KButton>
        <KButton variant="link">
          按钮
        </KButton>
        <KButton disabled>
          按钮
        </KButton>
      </div>
    </KPageMain>
  </div>
</template>
