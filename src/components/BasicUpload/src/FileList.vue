<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { FileItem } from './types'
import { UploadResultStatus } from './types'

interface Props {
  dataSource?: FileItem[]
}

const props = withDefaults(defineProps<Props>(), {
  dataSource: () => [] as FileItem[],
})
const emits = defineEmits<{
  'delete': [FileItem]
  'update:dataSource': [FileItem[]]
}>()

function handleRemove(record: FileItem) {
  const { dataSource } = props
  const index = dataSource.findIndex(item => item.uuid === record.uuid)
  if (index !== -1) {
    dataSource.splice(index, 1)
    emits('update:dataSource', props.dataSource)
  }
  emits('delete', record)
}

function formatStatus(record: FileItem) {
  const { status: uploadStatus } = record
  let status: 'normal' | 'exception' | 'active' | 'success' = 'normal'
  if (uploadStatus === UploadResultStatus.ERROR) {
    status = 'exception'
  }
  else if (uploadStatus === UploadResultStatus.UPLOADING) {
    status = 'active'
  }
  else if (uploadStatus === UploadResultStatus.SUCCESS) {
    status = 'success'
  }
  return status as any
}

const { t } = useI18n()
</script>

<template>
  <el-table :data="dataSource" border>
    <el-table-column type="index" />
    <el-table-column width="100" prop="thumbUrl" :label="t('component.upload.legend')">
      <template #default="{ row }">
        <ThumbUrl v-if="row.thumbUrl" :file-url="row.thumbUrl" :is-def="true" />
      </template>
    </el-table-column>
    <el-table-column prop="name" align="left" :label="t('component.upload.fileName')">
      <template #default="{ row, column }">
        <span>
          <p class="truncate mb-1" :title="column">
            {{ row.name }}
          </p>
          <el-progress :percentage="row.percent" size="small" :status="formatStatus(row)" />
        </span>
      </template>
    </el-table-column>
    <el-table-column width="100" prop="size" :label="t('component.upload.fileSize')">
      <template #default="{ row }">
        {{ row.size && `${(row.size / 1024).toFixed(2)}KB` }}
      </template>
    </el-table-column>
    <el-table-column width="100" prop="status" :label="t('component.upload.fileStatue')">
      <template #default="{ row }">
        <el-tag v-if="row.status === UploadResultStatus.SUCCESS" type="success">
          {{ t('component.upload.uploadSuccess') }}
        </el-tag>
        <el-tag v-if="row.status === UploadResultStatus.ERROR" type="warning">
          {{ t('component.upload.uploadError') }}
        </el-tag>
        <el-tag v-if="row.status === UploadResultStatus.UPLOADING">
          {{ t('component.upload.uploading') }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column width="120" :label="t('component.upload.operating')">
      <template #default="{ row }">
        <el-button type="danger" @click="handleRemove(row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="less">

</style>
