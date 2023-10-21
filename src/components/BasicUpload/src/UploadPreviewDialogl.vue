<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { FileResultVO } from '@/api/modules/system/model/fileModel'
import { downloadIds } from '@/api/modules/system/upload'
import { useDialogInner } from '@/components/Dialog/hooks/useDialog'
import type { DialogMethods } from '@/components/Dialog/typing'
import { downloadFile } from '@/util'
import { isArray } from '@/util/is'

interface Props {
  value?: FileResultVO[]
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
})
const emits = defineEmits<{
  'listChange': [FileResultVO[]]
  'delete': [string]
  'register': [DialogMethods, string]
  'update:value': [FileResultVO[]]
}>()
const { t } = useI18n()
const [register, { closeDialog }] = useDialogInner()
const fileListRef = ref<FileResultVO[]>([])

watch(
  () => props.value,
  (value) => {
    isArray(value) || (value = [])
    fileListRef.value = value.filter(item => !!item)
  },
  { immediate: true })

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
    :title="t('component.upload.preview')"
    class="upload-preview-modal"
    v-bind="$attrs"
    :show-ok-btn="false"
    @register="register"
  >
    <el-table :data="fileListRef">
      <el-table-column type="index" width="50" />
      <el-table-column align="center" width="100" :label="t('component.upload.legend')" prop="url">
        <template #default="{ row }">
          <ThumbUrl v-if="row.fileType === 'IMAGE'" :file-id="row.id" :original-file-name="row.originalFileName" />
        </template>
      </el-table-column>
      <el-table-column
        prop="originalFileName"
        :label="t('component.upload.fileName')"
        align="left"
      />
      <el-table-column width="180" fixed="right" align="center" border :label="t('component.upload.operating')">
        <template #default="{ row }">
          <el-button text type="warning" @click="handleRemove(row)">
            {{ t('component.upload.del') }}
          </el-button>
          <el-button text type="danger" @click="handleDownload(row)">
            {{ t('component.upload.download') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </BaseDialog>
</template>

<style scoped lang="scss">

</style>
