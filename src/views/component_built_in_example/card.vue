<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KpuPageHeader title="卡片" description="KCard" />
    <KpuPageMain>
      <div class="flex gap-4">
        <KpuCard title="卡片标题" description="卡片描述" class="w-80">
          卡片内容
          <template #footer>
            卡片底部
          </template>
        </KpuCard>
      </div>
    </KpuPageMain>
  </div>
</template>
