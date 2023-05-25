<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudRole from '@/api/modules/system/role'

const props = defineProps({
  id: {
    type: [Number, String],
    default: '',
  },
})

const data = ref({
  loading: false,
  form: {
    id: props.id,
    title: '',
  },
  rules: {
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
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
  crudRole.detail<any>(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form.title = res.data.title
  })
}

defineExpose({
  submit(callback: any) {
    if (data.value.form.id === '') {
      form.value?.validate((valid) => {
        if (valid) {
          crudRole.create<any>(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟新增成功',
              center: true,
            })
            callback && callback()
          })
        }
      })
    }
    else {
      form.value?.validate((valid) => {
        if (valid) {
          crudRole.edit(data.value.form).then(() => {
            ElMessage.success({
              message: '模拟编辑成功',
              center: true,
            })
            callback && callback()
          })
        }
      })
    }
  },
})
</script>

<template>
  <div v-loading="data.loading">
    <el-form ref="form" :model="data.form" :rules="data.rules" label-width="120px" label-suffix="：">
      <el-form-item label="标题" prop="title">
        <el-input v-model="data.form.title" placeholder="请输入标题" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
