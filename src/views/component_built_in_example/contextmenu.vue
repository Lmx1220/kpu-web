<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KPageHeader title="右键菜单" description="KContextMenu" />
    <KPageMain>
      <KContextMenu
        :items="[
          [
            { label: '菜单1-1' },
            { label: '菜单1-2', disabled: true },
            { label: '菜单1-3', icon: 'i-ep:edit' },
          ],
          [
            { label: '菜单2' },
          ],
        ]"
      >
        <div class="h-[150px] w-[300px] flex items-center justify-center border rounded-md border-dashed text-sm">
          在这右键
        </div>
      </KContextMenu>
    </KPageMain>
  </div>
</template>
