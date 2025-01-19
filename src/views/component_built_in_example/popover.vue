<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KPageHeader title="浮动面板" description="KPopover" />
    <KPageMain>
      <KPopover>
        <KButton>
          浮动面板
          <KIcon name="i-ep:caret-bottom" />
        </KButton>
        <template #panel>
          <div class="h-30 w-60 flex items-center justify-center">
            面板内容
          </div>
        </template>
      </KPopover>
    </KPageMain>
  </div>
</template>
