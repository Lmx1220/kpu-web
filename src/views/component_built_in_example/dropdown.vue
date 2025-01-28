<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KpuPageHeader title="下拉菜单" description="KpuDropdown" />
    <KpuPageMain>
      <KpuDropdown
        :items="[
          [
            { label: '菜单1-1' },
            { label: '菜单1-2', disabled: true },
            { label: '菜单1-3' },
          ],
          [
            { label: '菜单2' },
          ],
        ]"
      >
        <KpuButton>
          下拉菜单
          <KpuIcon name="i-ep:caret-bottom" />
        </KpuButton>
      </KpuDropdown>
    </KpuPageMain>
  </div>
</template>
