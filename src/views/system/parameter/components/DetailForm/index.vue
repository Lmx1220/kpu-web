<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { stateList } from '@/enums/stautsEnum'
import crudParameter from '@/api/modules/system/parameter'

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
          crudParameter.create(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else {
          crudParameter.edit(data.value.form).then(() => {
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-form-item label="参数名称" prop="name">
        <el-input v-model="data.form.name" :disabled="type === 'view'" placeholder="请输入参数名称" />
      </el-form-item>
      <el-form-item label="参数键" prop="key">
        <el-input v-model="data.form.key" :disabled="type === 'view'" placeholder="请输入参数键" />
      </el-form-item>
      <el-form-item label="参数值" prop="value">
        <el-input v-model="data.form.value" :disabled="type === 'view'" placeholder="请输入参数值" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="data.form.remarks" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === 'view'"
          :placeholder="type === 'view' ? '' : '请输入备注'" type="textarea"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="data.form.state" :disabled="type === 'view'">
          <el-radio-button v-for="(item, index) in stateList" :key="index" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
