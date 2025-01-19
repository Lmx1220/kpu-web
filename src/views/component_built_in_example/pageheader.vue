<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KPageHeader title="页头" description="KPageHeader" />
    <KPageHeader title="页面标题">
      <template #description>
        <p>提供两块插槽：</p>
        <p>一块是 description 区域插槽，一块是右侧区域</p>
      </template>
      <KButton variant="outline">
        <KIcon name="i-ep:arrow-left" />
        返回
      </KButton>
    </KPageHeader>
  </div>
</template>
