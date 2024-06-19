<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudOptLog from '@/api/modules/system/optLog'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { findEnumListByType } from '@/api/modules/common/general.ts'

export interface Props {
  id?: string
  type?: ActionEnum
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
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
  dicts: new Map<string, any>(),
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
  const options = await findEnumListByType([{
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
        if (props.type === ActionEnum.ADD) {
          crudOptLog.save(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudOptLog.update(data.value.form).then(() => {
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
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <ElFormItem label="操作IP" prop="requestIp">
        <ElInput v-model="data.form.requestIp" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="登录状态" prop="type">
        <ElSelect
          v-model="data.form.type" :disabled="type === ActionEnum.VIEW" clearable placeholder="" size="default"
        >
          <ElOption
            v-for="item in data.dicts.get('LogType') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="操作人" prop="nickName">
        <ElInput v-model="data.form.nickName" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="操作描述" prop="description">
        <ElInput
          v-model="data.form.description" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === ActionEnum.VIEW"
          placeholder="" type="textarea"
        />
      </ElFormItem>
      <ElFormItem label="请求地址" prop="requestUri">
        <ElInput
          v-model="data.form.requestUri" :disabled="type === ActionEnum.VIEW" placeholder=""
        />
      </ElFormItem>
      <ElFormItem label="请求类型" prop="httpMethod">
        <ElSelect
          v-model="data.form.httpMethod" :disabled="type === ActionEnum.VIEW" clearable placeholder="" size="default"
        >
          <ElOption
            v-for="item in data.dicts.get('HttpMethod') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="类路径" prop="classPath">
        <ElInput v-model="data.form.classPath" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="请求方法" prop="actionMethod">
        <ElInput v-model="data.form.actionMethod" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="参数" prop="params">
        <JsonPreview :data="data.form.params" :disabled="type === ActionEnum.VIEW" />
      </ElFormItem>
      <ElFormItem label="返回结果" prop="result">
        <JsonPreview v-if="data.form.result" :data="data.form.result" :disabled="type === ActionEnum.VIEW" />
      </ElFormItem>
      <ElFormItem label="异常日志" prop="exDetail">
        <CodeEdite
          :code="data.form.exDetail" :config="{ disabled: true, height: '200px' }" mode="java"
          theme="oneDark"
        />
      </ElFormItem>
      <ElFormItem label="开始时间" prop="startTime">
        <ElInput v-model="data.form.startTime" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="完成时间" prop="finishTime">
        <ElInput v-model="data.form.finishTime" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="消耗时间" prop="consumingTime">
        <ElInput v-model="data.form.consumingTime" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="浏览器请求头" prop="ua">
        <ElInput
          v-model="data.form.ua" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === ActionEnum.VIEW" placeholder=""
          type="textarea"
        />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
