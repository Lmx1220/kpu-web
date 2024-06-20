<script setup lang="ts">
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
  <ElTable :data="dataSource" border>
    <ElTableColumn type="index" />
    <ElTableColumn width="100" prop="thumbUrl" :label="t('component.upload.legend')">
      <template #default="{ row }">
        <ThumbUrl v-if="row.thumbUrl" :file-url="row.thumbUrl" :is-def="true" />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="name" align="left" :label="t('component.upload.fileName')">
      <template #default="{ row, column }">
        <span>
          <p class="mb-1 truncate" :title="column">
            {{ row.name }}
          </p>
          <ElProgress :percentage="row.percent" size="small" :status="formatStatus(row)" />
        </span>
      </template>
    </ElTableColumn>
    <ElTableColumn width="100" prop="size" :label="t('component.upload.fileSize')">
      <template #default="{ row }">
        {{ row.size && `${(row.size / 1024).toFixed(2)}KB` }}
      </template>
    </ElTableColumn>
    <ElTableColumn width="100" prop="status" :label="t('component.upload.fileStatue')">
      <template #default="{ row }">
        <ElTag v-if="row.status === UploadResultStatus.SUCCESS" type="success">
          {{ t('component.upload.uploadSuccess') }}
        </ElTag>
        <ElTag v-if="row.status === UploadResultStatus.ERROR" type="warning">
          {{ t('component.upload.uploadError') }}
        </ElTag>
        <ElTag v-if="row.status === UploadResultStatus.UPLOADING">
          {{ t('component.upload.uploading') }}
        </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn width="120" :label="t('component.upload.operating')">
      <template #default="{ row }">
        <ElButton type="danger" @click="handleRemove(row)">
          删除
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<style lang="less">

</style>
