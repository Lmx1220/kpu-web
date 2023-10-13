<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findEnumListByType } from '@/api/modules/common/dict'
import crudOptLog from '@/api/modules/system/optLog'

export interface Props {
  id?: string
  type?: 'add' | 'edit' | 'view'
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: 'view',
})

const data = ref({
  loading: false,
  form: {
    id: props.id,
    requestIp: '',
    nickName: '',
    username: '',
    status: '',
    type: '',
    description: '',
    httpMethod: '',
    requestUri: '',
    classPath: '',
    actionMethod: '',
    loginDate: '',
    ua: '',
    params: {},
    result: {},
    browser: '',
    startTime: '',
    finishTime: '',
    consumingTime: '',
    browserVersion: '',
    operatingSystem: '',
    location: '',
    exDetail: '',
  },
  rules: {
    title: [
      {
        required: true,
        message: '',
        trigger: 'blur',
      },
    ],
  },
  dicts: new Map<string, Option[]>(),
})

const form = ref<FormInstance>()

onMounted(() => {
  getDict()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

function getInfo() {
  data.value.loading = true
  crudOptLog.detail(data.value.form.id).then((res: any) => {
    data.value.loading = false
    data.value.form = res
    data.value.form.params = (res.params ? JSON.parse(res.params) : '') as any
    data.value.form.result = res.result ? JSON.parse(res.result) : undefined
  })
}

async function getDict() {
  const options: DictOption = await findEnumListByType([{
    type: 'LogType',
    extendFirst: true,
  },
  {
    type: 'HttpMethod',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (props.type === 'add') {
          crudOptLog.create(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === 'edit') {
          crudOptLog.edit(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟编辑成功',
              center: true,
            })
            callback && callback()
          })
        }
        else {
          callback && callback(false)
        }
      }
    })
  },
})
</script>

<template>
  <div v-loading="data.loading">
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-form-item label="操作IP" prop="requestIp">
        <el-input v-model="data.form.requestIp" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="登录状态" prop="type">
        <el-select
          v-model="data.form.type" :disabled="type === 'view'" clearable placeholder="" size="default"
        >
          <el-option
            v-for="item in data.dicts.get('LogType') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作人" prop="nickName">
        <el-input v-model="data.form.nickName" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="操作描述" prop="description">
        <el-input
          v-model="data.form.description" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === 'view'"
          placeholder="" type="textarea"
        />
      </el-form-item>
      <el-form-item label="请求地址" prop="requestUri">
        <el-input
          v-model="data.form.requestUri" :disabled="type === 'view'" placeholder=""
        />
      </el-form-item>
      <el-form-item label="请求类型" prop="httpMethod">
        <el-select
          v-model="data.form.httpMethod" :disabled="type === 'view'" clearable placeholder="" size="default"
        >
          <el-option
            v-for="item in data.dicts.get('HttpMethod') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类路径" prop="classPath">
        <el-input v-model="data.form.classPath" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="请求方法" prop="actionMethod">
        <el-input v-model="data.form.actionMethod" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <json-preview :data="data.form.params" :disabled="type === 'view'" />
      </el-form-item>
      <el-form-item label="返回结果" prop="result">
        <json-preview v-if="data.form.result" :data="data.form.result" :disabled="type === 'view'" />
      </el-form-item>
      <el-form-item label="异常日志" prop="exDetail">
        <code-edite
          :code="data.form.exDetail" :config="{ disabled: true, height: '200px' }" mode="java"
          theme="oneDark"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-input v-model="data.form.startTime" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="完成时间" prop="finishTime">
        <el-input v-model="data.form.finishTime" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="消耗时间" prop="consumingTime">
        <el-input v-model="data.form.consumingTime" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="浏览器请求头" prop="ua">
        <el-input
          v-model="data.form.ua" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === 'view'" placeholder=""
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
