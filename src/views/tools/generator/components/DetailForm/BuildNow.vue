<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { DictOption } from '@/api/model/baseModel'
import { findEnumListByType } from '@/api/modules/common/dict'
import { downloadZip, generatorCode, getFieldTemplate, getFileOverrideStrategy } from '@/api/modules/tools/genTable'
import { downloadFile } from '@/util'
import { isArray } from '@/util/is'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'BuildNow',
})
const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
})
interface Props {
  id?: string | string[]
}

interface Data {
  loading: boolean
  form: {
    [key: string]: any
  }
  rules: any
  dicts: Map<string, any>

}

const data = ref<Data>({
  loading: false,
  form: {
    id: props.id,
    title: '',
  },
  // formFileList: [],
  rules: {},
  dicts: new Map(),
})
onMounted(() => {
  getDict()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

async function getDict() {
  const options: DictOption = await findEnumListByType([
    {
      type: 'FileOverrideStrategyEnum',
      extendFirst: true,
    },
  ])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}

const fieldTemplate = ref<{
  [key: string]: string
}>({})

function getInfo() {
  // data.value.loading = true

  getFileOverrideStrategy().then((res) => {
    data.value.form = res
  })
  getFieldTemplate().then((res) => {
    fieldTemplate.value = res
  })
  // setTimeout(() => {
  //   data.value.loading = false
  // }, 100)
}

const btnLoading = ref(false)

async function onDownloadZip(template: 'WEB_PLUS' | 'BACKEND') {
  btnLoading.value = true
  const id = isArray(props.id) ? props.id : [props.id]
  try {
    const res = await downloadZip(id, template)
    if (res) {
      downloadFile(res)
      ElMessage.success('下载成功')
    }
    else {
      ElMessage.error('下载失败，请认真检查【生成信息】是否填写完整并保存成功！')
    }
  }
  catch (e) {
    console.error(e)
    // if (t.response.data) { console.log(e) }
  }
  finally {
    btnLoading.value = false
  }
}

async function onGenerator(template: 'WEB_PLUS' | 'BACKEND') {
  btnLoading.value = true
  const ids = isArray(props.id) ? props.id : [props.id]
  try {
    const newData: {
      [key: string]: string
    } = {}
    for (const key in data.value.form) {
      newData[fieldTemplate.value[key]] = data.value.form[key]
    }
    await generatorCode({ ids, template, fileOverrideConfig: newData })
    ElMessage.success('代码生成成功，请在[生成路径]查看')
  }
  finally {
    btnLoading.value = false
  }
}
</script>

<template>
  <div>
    <ElForm label-width="100">
      <PageHeader title="后端" />
      <ElRow>
        <ElCol :span="8">
          <ElFormItem label="entity" prop="entity">
            <ElRadioGroup v-model="data.form.entity">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="saveVo" prop="saveVo">
            <ElRadioGroup v-model="data.form.saveVo">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="updateVo" prop="updateVo">
            <ElRadioGroup v-model="data.form.updateVo">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="resultVo" prop="resultVo">
            <ElRadioGroup v-model="data.form.resultVo">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="pageQuery" prop="pageQuery">
            <ElRadioGroup v-model="data.form.pageQuery">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Enum" prop="enum">
            <ElRadioGroup v-model="data.form.enum">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="sql" prop="sql">
            <ElRadioGroup v-model="data.form.sql">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="xml" prop="xml">
            <ElRadioGroup v-model="data.form.xml">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="mapper" prop="mapper">
            <ElRadioGroup v-model="data.form.mapper">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="manager" prop="manager">
            <ElRadioGroup v-model="data.form.manager">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="service" prop="service">
            <ElRadioGroup v-model="data.form.service">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="controller" prop="controller">
            <ElRadioGroup v-model="data.form.controller">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <!--        <el-col :span="8"> -->
        <!--          <el-form-item label="Echo常量" prop="echoList"> -->
        <!--            <el-radio-group v-model="data.form.echoList"> -->
        <!--              <el-radio-button v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index" :label="item.value"> -->
        <!--                {{ item.label }} -->
        <!--              </el-radio-button> -->
        <!--            </el-radio-group> -->
        <!--          </el-form-item> -->
        <!--        </el-col> -->
      </ElRow>
      <PageHeader title="前端" />
      <ElRow>
        <ElCol :span="8">
          <ElFormItem label="index" prop="index">
            <ElRadioGroup v-model="data.form.index">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="edit" prop="edit">
            <ElRadioGroup v-model="data.form.edit">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="data" prop="data">
            <ElRadioGroup v-model="data.form.data">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Api" prop="api">
            <ElRadioGroup v-model="data.form.api">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="Model" prop="model">
            <ElRadioGroup v-model="data.form.model">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="langEn" prop="langEn">
            <ElRadioGroup v-model="data.form.langEn">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :span="8">
          <ElFormItem label="langZh" prop="langZh">
            <ElRadioGroup v-model="data.form.langZh">
              <ElRadioButton
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow class="justify-center">
        <ElButton v-loading="btnLoading" @click="onDownloadZip('WEB_PLUS')">
          下载前端
        </ElButton>
        <ElButton v-loading="btnLoading" @click="onDownloadZip('BACKEND')">
          下载后端
        </ElButton>
        <ElButton v-loading="btnLoading" type="primary" @click="onGenerator('WEB_PLUS')">
          生成前端
        </ElButton>
        <ElButton v-loading="btnLoading" type="primary" @click="onGenerator('BACKEND')">
          生成后端
        </ElButton>
      </ElRow>
    </ElForm>
  </div>
</template>

<style scoped lang="scss">
// scss
</style>
