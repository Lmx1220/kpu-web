<script setup lang="ts">
const checkList = ref(1)
const dialog = ref(false)
const input = ref('')
const select = ref('1')
const slideover = ref(false)
const tabList = ref(1)
const toggle = ref(false)
</script>

<template>
  <div>
    <KPageHeader title="内建组件" content="内建组件仅服务于框架自身，不建议在业务页面内使用，业务页面内请使用专业的 UI 组件库。" />
    <div class="flex flex-col flex-wrap gap-4 px-4 lg-flex-row">
      <KPageMain title="Badge">
        <KBadge :value="true">
          <SvgIcon name="i-ri:notification-3-line" />
        </KBadge>

        <KBadge :value="99">
          <SvgIcon name="i-ri:notification-3-line" />
        </KBadge>

        <KBadge value="噢">
          <SvgIcon name="i-ri:notification-3-line" />
        </KBadge>
      </KPageMain>
      <KPageMain title="Button">
        <KButton>
          按钮
        </KButton>
        <KButton outline>
          按钮
        </KButton>
        <KButton disabled>
          按钮
        </KButton>
        <KButton disabled outline>
          按钮
        </KButton>
      </KPageMain>
      <KPageMain title="CheckList">
        <KTabs
          v-model="checkList" :list="[
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
            { label: '选项3', value: '3' },
          ]"
        />
      </KPageMain>
      <KPageMain title="Dialog">
        <KButton @click="dialog = true">
          打开
        </KButton>
        <KModal v-model="dialog" title="标题">
          这里是 dialog 内容
        </KModal>
      </KPageMain>
      <KPageMain title="Dropdown">
        <KPopover>
          <div class="flex-center">
            下拉面板
            <SvgIcon name="i-ep:caret-bottom" />
          </div>
          <template #panel>
            <div class="h-30 w-60 flex items-center justify-center">
              下拉内容
            </div>
          </template>
        </KPopover>
      </KPageMain>
      <KPageMain title="DropdownMenu">
        <KDropdown
          :items="[
            [
              { label: '菜单1-1' },
              { label: '菜单1-2' },
              { label: '菜单1-3' },
            ],
            [
              { label: '菜单2' },
            ],
          ]"
        >
          <div class="flex-center">
            下拉菜单
            <SvgIcon name="i-ep:caret-bottom" />
          </div>
        </KDropdown>
      </KPageMain>
      <KPageMain title="Input">
        <KInput v-model="input" />
      </KPageMain>
      <KPageMain title="Kbd">
        <KKbd>Ctrl</KKbd>
        <KKbd>⌘ K</KKbd>
      </KPageMain>
      <KPageMain title="Select">
        <KSelect
          v-model="select" :options="[
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2', disabled: true },
            { label: '选项3', value: '3' },
          ]"
        />
      </KPageMain>
      <KPageMain title="Slideover">
        <HButton @click="slideover = true">
          打开
        </HButton>
        <HSlideover v-model="slideover" title="标题" :overlay="false">
          这里是 slideover 内容
        </HSlideover>
      </KPageMain>
      <KPageMain title="TabList">
        <HTabList
          v-model="tabList"
          :options="[
            { label: '标签1', value: 1 },
            { label: '标签2', value: 2 },
            { label: '标签3', value: 3 },
          ]"
        />
      </KPageMain>
      <KPageMain title="Toggle">
        <HToggle v-model="toggle" />
        <HToggle v-model="toggle" on-icon="ri:sun-line" off-icon="ri:moon-line" />
      </KPageMain>
      <PageMain title="Tooltip">
        <HTooltip text="注意噢！">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </PageMain>
    </div>
  </div>
</template>

<style scoped>
.page-main {
  --uno: flex-grow-1 flex-shrink-1 flex-basis-400px m-0 min-h-50;

  :deep(.main-container) {
    --uno: flex items-center justify-center flex-1 gap-4;
  }
}
</style>
