<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KpuPageHeader title="页头" description="KpuPageHeader" />
    <KpuPageHeader title="页面标题">
      <template #description>
        <p>提供两块插槽：</p>
        <p>一块是 description 区域插槽，一块是右侧区域</p>
      </template>
      <KpuButton variant="outline">
        <KpuIcon name="i-ep:arrow-left" />
        返回
      </KpuButton>
    </KpuPageHeader>
  </div>
</template>
