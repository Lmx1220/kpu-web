<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { asyncFindUrlById } from '@/api/modules/file/upload'
import { defaultBase64Img } from '@/utils/file/base64Conver'
import { encode } from 'js-base64'

interface Props {
  fileUrl?: string
  fileId?: string
  width?: string | number
  height?: string | number
  fileType?: string
  imageStyle?: CSSProperties
  originalFileName?: string
  fallback?: string
  placeholder?: string
  isDef?: boolean
  api?: Function | null
}

const props = withDefaults(defineProps<Props>(), {
  fileUrl: '',
  fileId: '',
  width: 104,
  height: 104,
  fileType: 'IMAGE',
  imageStyle: () => ({
    width: '104px',
    height: '104px',
  }),
  originalFileName: '未知文件',
  fallback: defaultBase64Img,
  isDef: false,
  api: null,
})
const realSrc = ref('')
watch(
  () => props.fileUrl,
  () => {
    realSrc.value = props.fileUrl
  },
  { immediate: true },
)
watch(
  () => props.fileId,
  () => {
    if (props.fileId) {
      realSrc.value = ''
      findRealSrc()
    }
  },
  { immediate: true },
)

function findRealSrc() {
  if (props.api) {
    props.api(props.fileId).then((res: any) => {
      if (res && res.data) {
        realSrc.value = res.data
      }
    })
  }
  else {
    asyncFindUrlById(props.fileId).then((res) => {
      if (res && res.code === 0) {
        realSrc.value = res.data as string
      }
    })
  }
}

function onView(url: string, e: Event) {
  e?.preventDefault()
  e?.stopPropagation()
  url && window.open(`https://file.kkview.cn/onlinePreview?url=${encodeURIComponent(encode(url))}`)
}
</script>

<template>
  <span class="thumb">
    <ElImage v-if="fileType === 'IMAGE'" :src="realSrc" :preview-src-list="[realSrc]" preview-teleported>
      <template #error>
        <ElImage :src="fallback" :style="imageStyle" />
      </template>
    </ElImage>
    <a v-else style="color: var(--el-color-primary);" class="cursor-pointer" @click="(event) => onView(realSrc, event)">
      {{ originalFileName }}
    </a>
  </span>
</template>
