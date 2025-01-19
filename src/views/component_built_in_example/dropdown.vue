<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KPageHeader title="下拉菜单" description="KDropdown" />
    <KPageMain>
      <KDropdown
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
        <KButton>
          下拉菜单
          <KIcon name="i-ep:caret-bottom" />
        </KButton>
      </KDropdown>
    </KPageMain>
  </div>
</template>
