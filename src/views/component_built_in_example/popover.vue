<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KpuPageHeader title="浮动面板" description="KpuPopover" />
    <KpuPageMain>
      <KpuPopover>
        <KpuButton>
          浮动面板
          <KpuIcon name="i-ep:caret-bottom" />
        </KpuButton>
        <template #panel>
          <div class="h-30 w-60 flex items-center justify-center">
            面板内容
          </div>
        </template>
      </KpuPopover>
    </KpuPageMain>
  </div>
</template>
