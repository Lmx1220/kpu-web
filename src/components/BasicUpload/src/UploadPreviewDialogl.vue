<script setup lang="ts">
import type { FileResultVO } from '@/api/modules/system/model/fileModel'
import { downloadIds } from '@/api/modules/system/upload'
import { $t } from '@/locales'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { isArray } from '@/utils/is'
import { downloadFile } from '@/utils/kpu/common.ts'
import ThumbUrl from './ThumbUrl.vue'

interface Props {
  value?: FileResultVO[]
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
})
const emits = defineEmits<{
  'listChange': [FileResultVO[]]
  'delete': [string]
  'update:value': [FileResultVO[]]
}>()
const fileListRef = ref<FileResultVO[]>([])
const [BaseDialog, modalApi] = useKpuModal({
  // draggable: true,
  onCancel() {
    modalApi.close()
  },
})
watch(
  () => props.value,
  (value) => {
    isArray(value) || (value = [])
    fileListRef.value = value.filter(item => !!item)
  },
  { immediate: true },
)

function handleRemove(record: FileResultVO) {
  const index = fileListRef.value.findIndex(item => item.id === record.id)
  if (index !== -1) {
    const removed = fileListRef.value.splice(index, 1)
    if (removed[0].id) {
      emits('delete', removed[0].id)
    }
    emits('listChange', fileListRef.value)
  }
}

async function handleDownload(record: FileResultVO) {
  const { id = '' } = record
  const res = await downloadIds([id])
  downloadFile(res)
}
</script>

<template>
  <BaseDialog
    width="800px"
    :title="$t('component.upload.preview')"
    class="upload-preview-modal"
    v-bind="$attrs"
    :show-ok-btn="false"
  >
    <ElTable :data="fileListRef">
      <ElTableColumn type="index" width="50" />
      <ElTableColumn align="center" width="100" :label="$t('component.upload.legend')" prop="url">
        <template #default="{ row }">
          <ThumbUrl v-if="row.fileType === 'IMAGE'" :file-id="row.id" :original-file-name="row.originalFileName" />
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="originalFileName"
        :label="$t('component.upload.fileName')"
        align="left"
      />
      <ElTableColumn width="180" fixed="right" align="center" border :label="$t('component.upload.operating')">
        <template #default="{ row }">
          <ElButton text type="warning" @click="handleRemove(row)">
            {{ $t('component.upload.del') }}
          </ElButton>
          <ElButton text type="danger" @click="handleDownload(row)">
            {{ $t('component.upload.download') }}
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </BaseDialog>
</template>
