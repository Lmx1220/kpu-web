<script setup lang="ts" name="HotkeysIntro">
import eventBus from '@/util/eventBus'
import useSettingsStore from '@/store/modules/settings'

const isShow = ref(false)

const settingsStore = useSettingsStore()

onMounted(() => {
  eventBus.on('global-hotkeys-intro-toggle', () => {
    isShow.value = !isShow.value
  })
})
</script>

<template>
  <div>
    <el-drawer v-model="isShow" title="快捷键介绍" direction="rtl" :size="360">
      <el-descriptions title="全局" :column="1" border>
        <el-descriptions-item label="查看系统信息">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + I
        </el-descriptions-item>
        <el-descriptions-item v-if="settingsStore.settings.navSearch.enable && settingsStore.settings.navSearch.enableHotkeys" label="唤起导航搜索">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + S
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.menuMode)" title="主导航" :column="1" border>
        <el-descriptions-item label="激活下一个主导航">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + `
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="settingsStore.settings.tabbar.enableHotkeys" title="标签栏" :column="1" border>
        <el-descriptions-item label="切换到上一个标签页">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + Q
        </el-descriptions-item>
        <el-descriptions-item label="切换到下一个标签页">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + E
        </el-descriptions-item>
        <el-descriptions-item label="关闭当前标签页">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + W
        </el-descriptions-item>
        <el-descriptions-item label="切换到第 1-9 个标签页">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + 数字 1-9
        </el-descriptions-item>
        <el-descriptions-item label="切换到最后一个标签页">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + 数字 0
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="页面" :column="1" border>
        <el-descriptions-item label="最大化">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + ↑
        </el-descriptions-item>
        <el-descriptions-item label="退出最大化">
          {{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} + ↓
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
  margin-bottom: initial;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
  transition: var(--el-transition-border);
}

:deep(.el-descriptions) {
  margin-bottom: 20px;

  .el-descriptions__label {
    width: 200px;
  }
}
</style>
