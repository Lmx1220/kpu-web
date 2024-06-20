<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import { isArray } from '@/util/is'
import { findTableList, previewCode } from '@/api/modules/tools/genTable'
import 'highlight.js/styles/github-dark-dimmed.css'

defineOptions({
  name: 'CodePreview',
})
const props = withDefaults(defineProps<Props>(), {
  id: '',
  template: 'BACKEND',
})
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('web', xml)
export interface Props {
  id?: string | string[]
  template?: 'WEB_PLUS' | 'BACKEND'
}

interface Data {
  loading: boolean
  tableList: any[]
  activeName: string
  template: 'BACKEND' | 'WEB_PLUS'
  templateObj: {
    BACKEND?: {
      [key: string]: string
    }
    WEB_PLUS?: {
      [key: string]: string
    }
  }
  activeNameTemplate: string
}
const { t } = useI18n()
const data = ref<Data>({
  loading: false,
  tableList: [],
  activeName: '',
  template: props.template,
  templateObj: {},
  activeNameTemplate: '',
})
async function getDataList() {
  data.value.loading = true
  const id = isArray(props.id) ? props.id : [props.id]
  const res = await findTableList(id) as any
  data.value.tableList = res
  data.value.activeName = res[0]?.id
  getPreviewCode()
  setTimeout(() => {
    data.value.loading = false
  }, 100)
}

onMounted(() => {
  getDataList()
})

function handleChange(val: any) {
  data.value.activeName = val
  getPreviewCode(true)
}

const { copy, copied, isSupported } = useClipboard()
watch(copied, (value) => {
  if (value) {
    ElMessage.success(t('common.tips.copySuccess'))
  }
})
function onCopy(code: string) {
  if (!code) {
    ElMessage.warning('当前页面无内容，无需复制。')
  }
  copy(code)
}

const code = ref('0')

async function onTemplate(val: 'BACKEND' | 'WEB_PLUS') {
  if (data.value.template === val) {
    return
  }

  data.value.template = val

  await getPreviewCode()
  if (Number(code.value) > Object.keys(data.value.templateObj[data.value.template] || {}).length - 1) {
    code.value = `${Object.keys(data.value.templateObj[data.value.template] || {}).length - 1}`
  }
}

function onRefresh() {
  getPreviewCode(true)
}

async function getPreviewCode(reset = false) {
  if (!reset) {
    if (data.value.templateObj[data.value.template]) {
      return
    }
  }
  const res = await previewCode({
    template: data.value.template,
    id: data.value.activeName,
  }) as any
  data.value.templateObj![data.value.template] = res
  // data.value.activeNameTemplate = res
}

function getKey(value: any) {
  const str = value.substring(value.lastIndexOf('/') + 1, value.indexOf('.ftl'))
  return value.startsWith('sub-') ? `${str}(从表)` : str
}

function highlightedCode(code: string, key: any) {
  const str = key.substring(key.lastIndexOf('/') + 1, key.indexOf('.ftl'))
  const language = str.substring(str.indexOf('.') + 1, str.length)
  const html = hljs.highlight(code || '', {
    language,
    ignoreIllegals: true,
  }).value || '&nbsp;'
  return html
}
</script>

<template>
  <div>
    <ElTabs v-model="data.activeName" class="demo-tabs" @tab-change="handleChange">
      <ElTabPane v-for="item in data.tableList" :key="item.id" :label="item.name" :name="item.id" />
    </ElTabs>
    <ElButtonGroup>
      <ElButton :class="{ active: data.template === 'BACKEND' }" @click="onTemplate('BACKEND')">
        后端
      </ElButton>
      <ElButton :class="{ active: data.template === 'WEB_PLUS' }" @click="onTemplate('WEB_PLUS')">
        前端
      </ElButton>
    </ElButtonGroup>
    <ElButton text @click="onRefresh">
      <template #icon>
        <SvgIcon name="ep:refresh" />
      </template>
      {{ t('common.redo') }}
    </ElButton>
    <ElTabs v-model="code" class="demo-tabs min-h-[400px]">
      <ElTabPane v-for="(code, key) in data.templateObj[data.template] || {}" :key="key" :label="getKey(key)">
        <pre>
          <ElButton v-if="isSupported" class="float-left" text @click="onCopy(code)">
            <template #icon>
              <SvgIcon name="ep:document-copy" />
            </template>
            {{ t('common.title.copy') }}
            </ElButton>
          <code class="hljs" v-html="highlightedCode(code, key)" />
        </pre>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped>
pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.4286;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;

  code.hljs {
    display: block;
    padding: 1em;
    overflow-x: auto;
  }
}

.el-button.active {
  color: var(--el-button-active-text-color);
  background-color: var(--el-button-active-bg-color);
  border-color: var(--el-button-active-border-color);
  outline: none;
}
</style>
