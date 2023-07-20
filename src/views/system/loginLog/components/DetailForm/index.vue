<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'
import crudLoginLog from '@/api/modules/system/loginLog'

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
  crudLoginLog.detail(data.value.form.id).then((res) => {
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
        if (props.type === 'add') {
          crudLoginLog.create(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === 'edit') {
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-form-item label="登录IP" prop="requestIp">
        <el-input v-model="data.form.requestIp" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="登录昵称" prop="nickName">
        <el-input v-model="data.form.nickName" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="登录账号" prop="username">
        <el-input v-model="data.form.username" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="登录状态" prop="status">
        <el-select
          v-model="data.form.status" :disabled="type === 'view'" clearable placeholder="" size="default"
        >
          <el-option
            v-for="item in data.dicts.get('LoginStatusEnum') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="登录描述" prop="description">
        <el-input
          v-model="data.form.description" :disabled="type === 'view'" placeholder=""
        />
      </el-form-item>
      <el-form-item label="登录时间" prop="loginDate">
        <el-input v-model="data.form.loginDate" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="浏览器请求头" prop="ua">
        <el-input
          v-model="data.form.ua" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === 'view'"
          placeholder="" type="textarea"
        />
      </el-form-item>
      <el-form-item label="浏览器名称" prop="browser">
        <el-input v-model="data.form.browser" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="浏览器版本" prop="browserVersion">
        <el-input v-model="data.form.browserVersion" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="操作系统" prop="operatingSystem">
        <el-input v-model="data.form.operatingSystem" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
      <el-form-item label="登录地点" prop="location">
        <el-input v-model="data.form.location" :disabled="type === 'view'" placeholder="" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
