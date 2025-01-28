<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KpuPageHeader title="按钮" description="KpuButton" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KpuButton>
          按钮
        </KpuButton>
        <KpuButton variant="destructive">
          按钮
        </KpuButton>
        <KpuButton variant="outline">
          按钮
        </KpuButton>
        <KpuButton variant="secondary">
          按钮
        </KpuButton>
        <KpuButton variant="ghost">
          按钮
        </KpuButton>
        <KpuButton variant="link">
          按钮
        </KpuButton>
        <KpuButton disabled>
          按钮
        </KpuButton>
      </div>
    </KpuPageMain>
  </div>
</template>
