<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Ref } from 'vue'
import type { FileResultVO } from '@/api/modules/system/model/fileModel'
import type { FormConfig } from '#/global'
import crudFile from '@/api/modules/system/file'
import { ActionEnum } from '@/enums/commonEnum.ts'

export interface Props {
  id?: string
  type?: ActionEnum
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
})

const data: Ref<FormConfig<FileResultVO>> = ref({
  loading: false,
  form: {
    id: props.id,
    // originalFileName: '',
  },
  rules: {
    title: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
  },
})

const form = ref<FormInstance>()

onMounted(() => {
  if (data.value.form.id) {
    getInfo(data.value.form.id)
  }
})

function getInfo(id: string) {
  data.value.loading = true
  crudFile.detail(id).then((res) => {
    data.value.loading = false
    data.value.form = res
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        const { form } = toValue(data)
        if (props.type === ActionEnum.ADD) {
          crudFile.create(data.value.form).then(() => {
            ElMessage.success({
              message: '新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT && form.id) {
          crudFile.edit({ ...form, id: form.id }).then(() => {
            ElMessage.success({
              message: '编辑成功',
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
      <ElFormItem label="标题" prop="title">
        <ElInput v-model="data.form.originalFileName" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
