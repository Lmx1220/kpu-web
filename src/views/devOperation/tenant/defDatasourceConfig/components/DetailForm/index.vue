<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

import type { FormConfig } from '#/global'
import crudDatasourceConfig from '@/api/modules/devOperation/tenant/datasourceConfig'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'DetailForm',
})
const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
})
export interface Props {
  id?: string
  type?: ActionEnum
}

const { t } = useI18n()
const data = ref<FormConfig>({
  loading: false,
  form: {
    id: props.id,
    name: '',
    username: 'root',
    password: '',
    url: 'jdbc:mysql://127.0.0.1:3306/kpu_du?serverTimezone=Asia/Shanghai&characterEncoding=utf8&useUnicode=true&useSSL=false&autoReconnect=true&zeroDateTimeBehavior=convertToNull&allowMultiQueries=true&nullCatalogMeansCurrent=true',
    driverClassName: 'com.mysql.cj.jdbc.Driver',
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    username: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    url: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    driverClassName: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
  },
  dicts: new Map(),
})
data.value.dicts?.set('driverClassName', [{
  label: 'mysql6',
  value: 'com.mysql.cj.jdbc.Driver',
  key: 'mysql6',
}, {
  label: 'mysql5',
  value: 'com.mysql.jdbc.Driver',
  key: 'mysql5',
}, {
  label: 'oracle',
  value: 'oracle.jdbc.driver.OracleDriver',
  key: 'oracle',
}, {
  label: 'sqlserver',
  value: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
  key: 'sqlserver',
}])
const form = ref<FormInstance>()

onMounted(() => {
  if (data.value.form.id !== '') {
    getInfo()
  }
})

function getInfo() {
  data.value.loading = true
  crudDatasourceConfig.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form = res
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate(async (valid) => {
      if (valid) {
        if (props.type !== ActionEnum.VIEW) {
          if (props.type === ActionEnum.EDIT) {
            await crudDatasourceConfig.update(data.value.form)
          }
          else {
            await crudDatasourceConfig.save(data.value.form)
          }
          ElMessage.success({
            message: t(`common.tips.${props.type}Success`),
            center: true,
          })
          callback && callback()
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
      <ElFormItem label="名称" prop="name">
        <ElInput v-model="data.form.name" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="账号" prop="username">
        <ElInput v-model="data.form.username" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput v-model="data.form.password" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="链接" prop="url">
        <ElInput v-model="data.form.url" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="驱动" prop="driverClassName">
        <ElSelect
          v-model="data.form.driverClassName" clearable
          :disabled="type === ActionEnum.VIEW"
          placeholder="请选择"
        >
          <ElOption
            v-for="item in data.dicts?.get('driverClassName') || []" :key="item.value" :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
