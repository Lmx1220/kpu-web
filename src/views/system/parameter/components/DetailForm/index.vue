<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { FormConfig } from '#/global'
import stautsEnum from '@/enums/stautsEnum'
import crudParameter from '@/api/modules/system/parameter'
import { ActionEnum } from '@/enums/commonEnum.ts'

export interface Props {
  id?: string
  type?: ActionEnum
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
})

const data = ref<FormConfig>({
  loading: false,
  form: {
    id: props.id,
    name: '',
    key: '',
    value: '',
    remarks: '',
    state: true,
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入参数名称',
        trigger: 'blur',
      },
    ],
    key: [
      {
        required: true,
        message: '请输入参数键',
        trigger: 'blur',
      },
    ],
    value: [
      {
        required: true,
        message: '请输入参数值',
        trigger: 'blur',
      },
    ],
  },
})

const form = ref<FormInstance>()

onMounted(() => {
  if (data.value.form.id !== '') {
    getInfo()
  }
})

function getInfo() {
  data.value.loading = true
  crudParameter.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form = res
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (data.value.form.id === '') {
          crudParameter.save(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else {
          crudParameter.update(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟编辑成功',
              center: true,
            })
            callback && callback()
          })
        }
      }
    })
  },
})
</script>

<template>
  <div v-loading="data.loading">
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <ElFormItem label="参数名称" prop="name">
        <ElInput v-model="data.form.name" :disabled="type === ActionEnum.VIEW" placeholder="请输入参数名称" />
      </ElFormItem>
      <ElFormItem label="参数键" prop="key">
        <ElInput v-model="data.form.key" :disabled="type === ActionEnum.VIEW" placeholder="请输入参数键" />
      </ElFormItem>
      <ElFormItem label="参数值" prop="value">
        <ElInput v-model="data.form.value" :disabled="type === ActionEnum.VIEW" placeholder="请输入参数值" />
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput
          v-model="data.form.remarks" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === ActionEnum.VIEW"
          :placeholder="type === ActionEnum.VIEW ? '' : '请输入备注'" type="textarea"
        />
      </ElFormItem>
      <ElFormItem label="状态" prop="state">
        <ElRadioGroup v-model="data.form.state" :disabled="type === ActionEnum.VIEW">
          <ElRadioButton v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
            {{ item.label }}
          </ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
