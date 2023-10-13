<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { DictOption } from '@/api/model/baseModel'
import { findEnumListByType } from '@/api/modules/common/dict'
import { downloadZip, generatorCode, getDefFileOverrideStrategy, getFieldTemplate } from '@/api/modules/tools/genTable'
import { downloadFile } from '@/util'
import { isArray } from '@/util/is'

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: 'view',
})
defineOptions({
  name: 'BuildNow',
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

  getDefFileOverrideStrategy().then((res) => {
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
    console.log(e)
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
    <el-form label-width="100">
      <page-header title="后端" />
      <el-row>
        <el-col :span="8">
          <el-form-item label="entity" prop="entity">
            <el-radio-group v-model="data.form.entity">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="saveVo" prop="saveVo">
            <el-radio-group v-model="data.form.saveVo">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="updateVo" prop="updateVo">
            <el-radio-group v-model="data.form.updateVo">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="resultVo" prop="resultVo">
            <el-radio-group v-model="data.form.resultVo">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="pageQuery" prop="pageQuery">
            <el-radio-group v-model="data.form.pageQuery">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Enum" prop="enum">
            <el-radio-group v-model="data.form.enum">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="sql" prop="sql">
            <el-radio-group v-model="data.form.sql">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="xml" prop="xml">
            <el-radio-group v-model="data.form.xml">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="mapper" prop="mapper">
            <el-radio-group v-model="data.form.mapper">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="manager" prop="manager">
            <el-radio-group v-model="data.form.manager">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="service" prop="service">
            <el-radio-group v-model="data.form.service">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="controller" prop="controller">
            <el-radio-group v-model="data.form.controller">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8"> -->
        <!--          <el-form-item label="Echo常量" prop="echoList"> -->
        <!--            <el-radio-group v-model="data.form.echoList"> -->
        <!--              <el-radio-button v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index" :label="item.value"> -->
        <!--                {{ item.label }} -->
        <!--              </el-radio-button> -->
        <!--            </el-radio-group> -->
        <!--          </el-form-item> -->
        <!--        </el-col> -->
      </el-row>
      <page-header title="前端" />
      <el-row>
        <el-col :span="8">
          <el-form-item label="index" prop="index">
            <el-radio-group v-model="data.form.index">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="edit" prop="edit">
            <el-radio-group v-model="data.form.edit">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="updateVo" prop="data">
            <el-radio-group v-model="data.form.data">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Api" prop="api">
            <el-radio-group v-model="data.form.api">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Model" prop="model">
            <el-radio-group v-model="data.form.model">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="langEn" prop="langEn">
            <el-radio-group v-model="data.form.langEn">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="langZh" prop="langZh">
            <el-radio-group v-model="data.form.langZh">
              <el-radio-button
                v-for="(item, index) in data.dicts.get('FileOverrideStrategyEnum') || []" :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="justify-center">
        <el-button v-loading="btnLoading" @click="onDownloadZip('WEB_PLUS')">
          下载前端
        </el-button>
        <el-button v-loading="btnLoading" @click="onDownloadZip('BACKEND')">
          下载后端
        </el-button>
        <el-button v-loading="btnLoading" type="primary" @click="onGenerator('WEB_PLUS')">
          生成前端
        </el-button>
        <el-button v-loading="btnLoading" type="primary" @click="onGenerator('BACKEND')">
          生成后端
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>
