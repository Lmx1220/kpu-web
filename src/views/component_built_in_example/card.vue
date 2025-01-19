<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KPageHeader title="卡片" description="KCard" />
    <KPageMain>
      <div class="flex gap-4">
        <KCard title="卡片标题" description="卡片描述" class="w-80">
          卡片内容
          <template #footer>
            卡片底部
          </template>
        </KCard>
      </div>
    </KPageMain>
  </div>
</template>
