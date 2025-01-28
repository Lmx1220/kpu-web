<script lang="ts" setup>
import type { AnyFunction } from '#/index'
import type { FileResultVO } from '@/api/modules/system/model/fileModel'
import { $t } from '@/locales'

import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { omit } from 'lodash-es'
import { useAttrs } from 'vue'
import UploadDialog from './UploadDialog.vue'
import UploadPreviewDialogl from './UploadPreviewDialogl.vue'

export interface BasicProps {
  helpText?: string
  // 文件最大多少MB
  maxSize?: number
  // 最大数量的文件，Infinity不限制
  maxNumber?: number
  // 根据后缀，或者其他
  accept?: string[]
  multiple?: boolean
  uploadParams?: any
  api: AnyFunction
  name?: string
  filename?: string | null
}

export interface UploadContainerProps extends BasicProps {
  value?: FileResultVO[]
  showPreviewNumber?: boolean
  emptyHidePreview?: boolean
  showPreviewButton?: boolean
}

defineOptions({
  name: 'BasicUpload',
})
const props = withDefaults(defineProps<UploadContainerProps>(), {
  name: 'file',
  filename: null,
  value: () => [],
  showPreviewNumber: true,
  showPreviewButton: true,
  emptyHidePreview: false,
  helpText: '',
  maxSize: 2,
  maxNumber: Number.POSITIVE_INFINITY,
  accept: () => [],
  multiple: true,
  uploadParams: () => ({}),
})
const emits = defineEmits<{
  'change': [FileResultVO[]]
  'delete': [Recordable<any>]
  'previewDelete': [Recordable<any>]
  'update:value': [FileResultVO[]]
}>()

const fileList = ref<FileResultVO[]>([])
const showPreview = computed(() => {
  const { emptyHidePreview } = props
  if (!emptyHidePreview) {
    return true
  }
  return emptyHidePreview ? fileList.value.length > 0 : true
})
const attrs = useAttrs()
const bindValue = computed(() => {
  const value = { ...attrs, ...props }
  return omit(value, 'onChange')
})

function handleChange(urls: FileResultVO[]) {
  fileList.value = [...unref(fileList), ...(urls || [])]
  emits('update:value', fileList.value)
  emits('change', fileList.value)
}

function handlePreviewChange(urls: FileResultVO[]) {
  fileList.value = [...(urls || [])]
  emits('update:value', fileList.value)
  emits('change', fileList.value)
}

function handleDelete(record: Recordable<any>) {
  emits('delete', record)
}

function handlePreviewDelete(url: any) {
  emits('previewDelete', url)
}
const [UploadDialogModal, uploadDialogModalApi] = useKpuModal({
  connectedComponent: UploadDialog,
})
const [UploadPreviewDialoglModal, uploadPreviewDialoglApi] = useKpuModal({
  connectedComponent: UploadPreviewDialogl,
})
// const [registerUploadDialog, { openDialog: openUploadDialog }] = useDialog()
// const [registerPreviewDialog, { openDialog: openPreviewDialog }] = useDialog()
</script>

<template>
  <div>
    <ElButtonGroup>
      <ElButton @click="uploadDialogModalApi.open()">
        {{ $t('component.upload.upload') }}
      </ElButton>
      <ElTooltip v-if="showPreview && showPreviewButton" placement="bottom">
        <template #content>
          {{ $t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <ElButton @click="uploadPreviewDialoglApi.open()">
          <KpuIcon name="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </ElButton>
      </ElTooltip>
    </ElButtonGroup>
    <UploadDialogModal
      v-bind="bindValue"
      :preview-file-list="fileList"
      @change="handleChange"
      @delete="handleDelete"
    />
    <UploadPreviewDialoglModal
      :value="fileList"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
