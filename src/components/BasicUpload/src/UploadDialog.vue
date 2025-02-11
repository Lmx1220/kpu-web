<script lang="ts" setup>
import type { FileResultVO } from '@/api/modules/file/model/fileModel'
import type { BasicProps } from '@/components/BasicUpload/src/BasicUpload.vue'
import type { FileItem } from '@/components/BasicUpload/src/types'

import type { UploadRawFile } from 'element-plus'
import { UploadResultStatus } from '@/components/BasicUpload/src/types'
import { $t } from '@/locales'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { buildUUID } from '@/utils/uuid'
import { ElMessage } from 'element-plus'
import { isFunction } from 'lodash-es'
import FileList from './FileList.vue'
import { checkImgType, getBase64WithFile } from './helper'
import { useUploadType } from './useUpload'

interface Props extends BasicProps {
  previewFileList?: FileResultVO[]
}

const props = withDefaults(defineProps<Props>(), {
  previewFileList: () => [],
  maxNumber: Number.POSITIVE_INFINITY,
  accept: () => [],
  helpText: '',
  maxSize: 2,
})
const emits = defineEmits<{
  change: [FileResultVO[]]
  // register: [DialogMethods, string]
  delete: [FileItem]
}>()
const isUploadingRef = ref(false)
const fileListRef = ref<FileItem[]>([])
const {
  accept,
  helpText,
  maxNumber,
  maxSize,
} = toRefs(props)
const [BaseDialog, modalApi] = useKpuModal({
  // draggable: true,
  onCancel() {
    modalApi.close()
  },
})
async function handleCloseFunc() {
  if (!isUploadingRef.value) {
    fileListRef.value = []
    return true
  }
  else {
    ElMessage.warning($t('component.upload.uploadWait'))
    return false
  }
}

const getIsSelectFile = computed(() => {
  return (
    fileListRef.value.length > 0
    && !fileListRef.value.every(item => item.status === UploadResultStatus.SUCCESS)
  )
})
const getOkButtonProps = computed(() => {
  const someSuccess = fileListRef.value.some(
    item => item.status === UploadResultStatus.SUCCESS,
  )
  return {
    disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
  }
})

function handleOk() {
  const { maxNumber } = props

  if (fileListRef.value.length > maxNumber) {
    return ElMessage.warning($t('component.upload.maxNumber', [maxNumber]))
  }
  if (isUploadingRef.value) {
    return ElMessage.warning($t('component.upload.saveWarn'))
  }
  const fileList: FileResultVO[] = []

  for (const item of fileListRef.value) {
    const {
      status,
      responseData,
    } = item
    if (status === UploadResultStatus.SUCCESS && responseData) {
      fileList.push(responseData)
    }
  }
  // 存在一个上传成功的即可保存
  if (fileList.length <= 0) {
    return ElMessage.warning($t('component.upload.saveError'))
  }
  fileListRef.value = []
  modalApi.close()
  emits('change', fileList)
}

async function uploadApiByItem(item: FileItem) {
  const { api } = props
  if (!api || !isFunction(api)) {
    return console.error('upload api must exist and be a function')
  }
  try {
    item.status = UploadResultStatus.UPLOADING
    const ret: any = await props.api?.(
      {
        data: {
          ...(props.uploadParams || {}),
        },
        file: item.file,
        name: props.name,
        filename: props.filename,
      },
      (progressEvent: ProgressEvent) => {
        item.percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0
      },
    )
    const { data } = ret
    item.status = UploadResultStatus.SUCCESS
    item.responseData = data.data
    return {
      success: true,
      error: null,
    }
  }
  catch (e) {
    console.error(e)
    item.status = UploadResultStatus.ERROR
    return {
      success: false,
      error: e,
    }
  }
}

async function handleStartUpload() {
  const { maxNumber } = props
  if ((fileListRef.value.length + (props.previewFileList?.length || 0)) > maxNumber) {
    return ElMessage.warning($t('component.upload.maxNumber', [maxNumber]))
  }
  try {
    isUploadingRef.value = true
    // 只上传不是成功状态的
    const uploadFileList
        = fileListRef.value.filter(item => item.status !== UploadResultStatus.SUCCESS) || []
    const data = await Promise.all(
      uploadFileList.map((item) => {
        return uploadApiByItem(item)
      }),
    )
    isUploadingRef.value = false
    // 生产环境:抛出错误
    const errorList = data.filter((item: any) => !item.success)
    if (errorList.length > 0) {
      throw errorList
    }
  }
  catch (e) {
    isUploadingRef.value = false
    throw e
  }
}

const getUploadBtnText = computed(() => {
  const someError = fileListRef.value.some(
    item => item.status === UploadResultStatus.ERROR,
  )
  return isUploadingRef.value
    ? $t('component.upload.uploading')
    : someError
      ? $t('component.upload.reUploadFailed')
      : $t('component.upload.startUpload')
})

const {
  getStringAccept,
  getHelpText,
} = useUploadType({
  acceptRef: accept,
  helpTextRef: helpText,
  maxNumberRef: maxNumber,
  maxSizeRef: maxSize,
})

function beforeUpload(file: UploadRawFile) {
  const {
    size,
    name,
  } = file
  const { maxSize } = props
  // 设置最大值，则判断
  if (maxSize && file.size / 1024 / 1024 >= maxSize) {
    ElMessage.error($t('component.upload.maxSizeMultiple', [maxSize]))
    return false
  }

  const commonItem = {
    uuid: buildUUID(),
    file,
    size,
    name,
    percent: 0,
    type: name.split('.').pop(),
  }
  // 生成图片缩略图
  if (checkImgType(file)) {
    // beforeUpload，如果异步会调用自带上传方法
    // file.thumbUrl = await getBase64(file);
    getBase64WithFile(file).then(({ result: thumbUrl }) => {
      fileListRef.value = [
        ...unref(fileListRef),
        {
          thumbUrl,
          ...commonItem,
        },
      ]
    })
  }
  else {
    fileListRef.value = [...unref(fileListRef), commonItem]
  }
  return false
}

function handleRemove(record: FileItem) {
  emits('delete', record)
}
</script>

<template>
  <BaseDialog
    width="800px"
    :title="$t('component.upload.upload')"
    :ok-text="$t('component.upload.save')"
    v-bind="$attrs"
    :close-func="handleCloseFunc"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="upload-modal"
    :ok-button-props="getOkButtonProps"
    :cancel-button-props="{ disabled: isUploadingRef }"
    @ok="handleOk"
  >
    <template #centerFooter>
      <ElButton
        type="success"
        :disabled="!getIsSelectFile"
        :loading="isUploadingRef"
        @click="handleStartUpload"
      >
        {{ getUploadBtnText }}
      </ElButton>
    </template>
    <div class="upload-dialog-toolbar">
      <ElAlert :title="getHelpText" type="info" class="upload-dialog-toolbar__text" show-icon :closable="false" />
      <ElUpload
        :accept="getStringAccept"
        :multiple="multiple"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        class="upload-dialog-toolbar__btn"
      >
        <ElButton type="primary">
          {{ $t('component.upload.choose') }}
        </ElButton>
      </ElUpload>
    </div>
    <FileList v-model:data-source="fileListRef" @delete="handleRemove" />
  </BaseDialog>
</template>

<style scoped>
.upload-dialog {
  &-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &__text {
      flex: 1;
    }

    &__btn {
      flex: 1;
      margin-left: 8px;
      text-align: right;
    }
  }
}
</style>
