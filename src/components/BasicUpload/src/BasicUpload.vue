<script lang="ts" setup>
import { omit } from 'lodash-es'
import { useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'
import UploadDialog from './UploadDialog.vue'
import type { UploadApiResult } from '@/api/modules/system/model/uploadModel'
import { useDialog } from '@/components/Dialog/hooks/useDialog'
import type { PromiseFn } from '#/global'

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
  api: PromiseFn
  name?: string
  filename?: string | null
}

export interface UploadContainerProps extends BasicProps {
  value?: UploadApiResult[]
  showPreviewNumber?: boolean
  emptyHidePreview?: boolean
  showPreviewButton?: boolean
}

const props = withDefaults(defineProps<UploadContainerProps>(), {
  name: 'file',
  filename: null,
  value: () => [],
  showPreviewNumber: true,
  showPreviewButton: true,
  emptyHidePreview: false,
  helpText: '',
  maxSize: 2,
  maxNumber: Infinity,
  accept: () => [],
  multiple: true,
  uploadParams: () => ({}),
})
const emits = defineEmits<{
  'change': [UploadApiResult[]]
  'delete': [Recordable<any>]
  'previewDelete': [Recordable<any>]
  'update:value': [UploadApiResult[]]
}>()
defineOptions({
  name: 'BasicUpload',
})
const { t } = useI18n()

const fileList = ref<UploadApiResult[]>([])
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

function handleChange(urls: UploadApiResult[]) {
  fileList.value = [...unref(fileList), ...(urls || [])]
  emits('update:value', fileList.value)
  emits('change', fileList.value)
}

function handlePreviewChange(urls: UploadApiResult[]) {
  fileList.value = [...(urls || [])]
  emits('update:value', fileList.value)
  emits('change', fileList.value)
}

function handleDelete(record: Recordable<any>) {
  emits('delete', record)
}

function handlePreviewDelete(url: Recordable<any>) {
  emits('previewDelete', url)
}

const [registerUploadDialog, { openDialog: openUploadDialog }] = useDialog()
const [registerPreviewDialog, { openDialog: openPreviewDialog }] = useDialog()
</script>

<template>
  <div>
    <el-button-group>
      <el-button @click="openUploadDialog()">
        {{ t('component.upload.upload') }}
      </el-button>
      <el-tooltip v-if="showPreview && showPreviewButton" placement="bottom">
        <template #content>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <el-button @click="openPreviewDialog()">
          <svg-icon name="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </el-button>
      </el-tooltip>
    </el-button-group>
    <UploadDialog
      v-bind="bindValue"
      :preview-file-list="fileList"
      @register="registerUploadDialog"
      @change="handleChange"
      @delete="handleDelete"
    />
    <UploadPreviewDialogl
      :value="fileList"
      @register="registerPreviewDialog"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
