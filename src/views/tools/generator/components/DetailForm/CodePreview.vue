<script lang="ts" setup>
// eslint-disable-next-line import/order
import { findTableList, previewCode } from '@/api/modules/tools/genTable'

// eslint-disable-next-line import/order
import { isArray } from '@/util/is'

import { useClipboard } from '@vueuse/core'

import { ElMessage } from 'element-plus'

import hljs from 'highlight.js'

import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark-dimmed.css'

const props = withDefaults(defineProps<Props>(), {
  id: '',
  template: 'BACKEND',
})
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('html', xml)
// hljs.registerLanguage('xml', xml)
hljs.registerLanguage('web', xml)
defineOptions({
  name: 'CodePreview',
})

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

const { text, isSupported, copy } = useClipboard()

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
    <el-tabs v-model="data.activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane v-for="item in data.tableList" :key="item.id" :label="item.name" :name="item.id" />
    </el-tabs>
    <el-button-group>
      <el-button :class="{ active: data.template === 'BACKEND' }" @click="onTemplate('BACKEND')">
        后端
      </el-button>
      <el-button :class="{ active: data.template === 'WEB_PLUS' }" @click="onTemplate('WEB_PLUS')">
        前端
      </el-button>
    </el-button-group>
    <el-button text @click="onRefresh">
      <template #icon>
        <svg-icon name="ep:refresh" />
      </template>
      刷新
    </el-button>
    <el-tabs v-model="code" class="demo-tabs min-h-[400px]">
      <el-tab-pane v-for="(code, key) in data.templateObj[data.template] || {}" :key="key" :label="getKey(key)">
        <pre>
          <el-button v-if="isSupported" class="float-left" text @click="onCopy(code)">
            <template #icon>
              <svg-icon name="ep:document-copy" />
            </template>
            复制
            </el-button>
          <code class="hljs" v-html="highlightedCode(code, key)" />
        </pre>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;

  code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }

}

.el-button.active {
  color: var(--el-button-active-text-color);
  border-color: var(--el-button-active-border-color);
  background-color: var(--el-button-active-bg-color);
  outline: none;
}
</style>
