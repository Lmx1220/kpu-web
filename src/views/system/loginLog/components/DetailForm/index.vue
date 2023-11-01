<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'
import crudLoginLog from '@/api/modules/system/loginLog'
import { ActionEnum } from '@/enums/commonEnum.ts'

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
    description: '',
    loginDate: '',
    ua: '',
    browser: '',
    browserVersion: '',
    operatingSystem: '',
    location: '',
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
  crudLoginLog.detail(data.value.form.id).then((res: any) => {
    data.value.loading = false
    data.value.form = res
  })
}

async function getDict() {
  const options: DictOption = await findDictMapItemListByKey([{
    type: 'LoginStatusEnum',
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
          crudLoginLog.create(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudLoginLog.edit(data.value.form).then(() => {
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
      <ElFormItem label="登录IP" prop="requestIp">
        <ElInput v-model="data.form.requestIp" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="登录昵称" prop="nickName">
        <ElInput v-model="data.form.nickName" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="登录账号" prop="username">
        <ElInput v-model="data.form.username" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="登录状态" prop="status">
        <ElSelect
          v-model="data.form.status" :disabled="type === ActionEnum.VIEW" clearable placeholder="" size="default"
        >
          <ElOption
            v-for="item in data.dicts.get('LoginStatusEnum') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="登录描述" prop="description">
        <ElInput
          v-model="data.form.description" :disabled="type === ActionEnum.VIEW" placeholder=""
        />
      </ElFormItem>
      <ElFormItem label="登录时间" prop="loginDate">
        <ElInput v-model="data.form.loginDate" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="浏览器请求头" prop="ua">
        <ElInput
          v-model="data.form.ua" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === ActionEnum.VIEW"
          placeholder="" type="textarea"
        />
      </ElFormItem>
      <ElFormItem label="浏览器名称" prop="browser">
        <ElInput v-model="data.form.browser" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="浏览器版本" prop="browserVersion">
        <ElInput v-model="data.form.browserVersion" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="操作系统" prop="operatingSystem">
        <ElInput v-model="data.form.operatingSystem" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
      <ElFormItem label="登录地点" prop="location">
        <ElInput v-model="data.form.location" :disabled="type === ActionEnum.VIEW" placeholder="" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
