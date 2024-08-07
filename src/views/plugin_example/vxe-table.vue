<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import type { VxeTableInstance } from 'vxe-table'
import VxeUITable from 'vxe-table'
import { ElMessageBox } from 'element-plus'
import Alert from './components/alert.vue'
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()
watch(() => settingsStore.currentColorScheme, () => {
  VxeUITable.setTheme(settingsStore.currentColorScheme!)
}, {
  immediate: true,
})

interface RowVO {
  id: number
  name: string
  nickname: string
}

const tableRef = ref<VxeTableInstance<RowVO>>()

const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', nickname: 'Nickname11' },
  { id: 10002, name: 'Test2', nickname: '' },
])

async function insertEvent() {
  const $table = tableRef.value
  if ($table) {
    const record = {
      flag: false,
    }
    const { row: newRow } = await $table.insert(record)
    $table.setEditRow(newRow)
  }
}

function saveEvent() {
  const $table = tableRef.value
  if ($table) {
    const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
    if (insertRecords.length || removeRecords.length || updateRecords.length) {
      ElMessageBox.alert(`insertRecords=${insertRecords.length}; removeRecords=${removeRecords.length}; updateRecords=${updateRecords.length}`)
    }
    else {
      ElMessageBox.alert('数据未改动！')
    }
  }
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="vxe-table">
      <template #content>
        <p>Element Plus 自带的 el-table 组件大部分时候只能满足简单需求的使用，如果对表格有更加复杂场景需求下的使用，推荐使用 vxe-table 。</p>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add xe-utils vxe-table</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/x-extends/vxe-table')">
        <template #icon>
          <SvgIcon name="i-ep:link" />
        </template>
        访问 vxe-table
      </ElButton>
    </PageHeader>
    <PageMain>
      <vxe-button @click="insertEvent">
        新增
      </vxe-button>
      <vxe-button @click="saveEvent">
        保存
      </vxe-button>

      <vxe-table

        ref="tableRef" show-overflow keep-source
        border
        :edit-config="{ trigger: 'click', mode: 'row' }"
        :data="tableData"
      >
        <vxe-column type="checkbox" width="60" />
        <vxe-column type="seq" title="Number" width="80" />
        <vxe-column title="component.upload.fileName" field="name" min-width="140" :edit-render="{ name: 'ElInput' }" />
        <vxe-column title="输入框" field="nickname" width="200" :edit-render="{ name: 'ElInput' }" />
      </vxe-table>
    </PageMain>
  </div>
</template>
