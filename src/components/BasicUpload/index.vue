<script lang="ts" setup>
import { omit } from 'lodash-es'
import { useI18n } from 'vue-i18n'
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
}

export interface uploadContainerProps extends BasicProps {
  value?: string[]
  showPreviewNumber?: boolean
  emptyHidePreview?: boolean
}

const props = withDefaults(defineProps<uploadContainerProps>(), {
  value: () => [],
  showPreviewNumber: true,
  emptyHidePreview: false,
  helpText: '',
  maxSize: 2,
  maxNumber: Infinity,
  accept: () => [],
  multiple: true,
  uploadParams: () => ({}),
})
defineOptions({
  name: 'BasicUpload',
})
const { t } = useI18n()

const fileListRef = ref<string[]>([])
const showPreview = computed(() => {
  const { emptyHidePreview } = props
  if (!emptyHidePreview) {
    return true
  }
  return emptyHidePreview ? fileListRef.value.length > 0 : true
})
const bindValue = computed(() => {
  const { attrs } = props
  const value = { ...attrs, ...props }
  return omit(value, 'onChange')
})

function onPreview() {

}
</script>

<template>
  <div>
    <el-button-group>
      <el-button>
        {{ t('component.upload.upload') }}
      </el-button>
      <el-tooltip v-if="showPreview" placement="bottom">
        <template #content>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileListRef.length">
            {{ fileListRef.length }}
          </template>
        </template>
        <el-button @click="onPreview">
          <svg-icon name="bi:eye" />
          <template v-if="fileListRef.length && showPreviewNumber">
            {{ fileListRef.length }}
          </template>
        </el-button>
      </el-tooltip>
    </el-button-group>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>

<i18n global>
{
  "en": {
    "component": {
      "upload": {
        "upload": "Upload",
        "uploaded": "Upload"
      }
    }
  },
  "ja": {
    "component": {
      "upload": {
        "upload": "アップロード",
        "uploaded": "アップロード"
      }
    }
  },
  "zh-cn": {
    "component": {
      "upload": {
        "upload": "上传",
        "uploaded": "已上传"
      }
    }
  },
  "zh-tw": {
    "component": {
      "upload": {
        "upload": "上傳",
        "uploaded": "已上傳"
      }
    }
  }
}
</i18n>
