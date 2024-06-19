<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

import crudRole from '@/api/modules/system/role'
import stautsEnum from '@/enums/stautsEnum'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { asyncFindDictList } from '@/api/modules/common/general.ts'

export interface Props {
  id: string
  type?: ActionEnum

}

const props = withDefaults(defineProps<Props>(), {
  type: ActionEnum.ADD,
})

const data = ref({
  loading: false,
  form: {
    id: props.id,
    code: '',
    name: '',
    category: '10',
    remarks: '',
    state: true,

  },
  dicts: new Map<string, any>(),
  rules: {
    code: [
      {
        required: true,
        message: '请输入编码',
        trigger: 'blur',
      },
    ],
    name: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur',
      },
    ],
    category: [
      {
        required: true,
        message: '请选择角色类别',
        trigger: 'change',
      },
    ],
  },
})

const form = ref<FormInstance>()

onMounted(() => {
  getDict()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

async function getDict() {
  const options = await asyncFindDictList([{
    type: 'ROLE_CATEGORY',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}

function getInfo() {
  data.value.loading = true
  crudRole.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    Object.assign(data.value.form, res)
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (props.type === ActionEnum.ADD) {
          crudRole.save(data.value.form).then(() => {
            ElMessage.success({
              message: t('common.tips.addSuccess'),
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudRole.update(data.value.form).then(() => {
            ElMessage.success({
              message: t('common.tips.editSuccess'),
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
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-width="120px" label-suffix="：">
      <ElFormItem label="编码" prop="code">
        <ElInput v-model="data.form.code" :disabled="type === ActionEnum.VIEW" placeholder="请输入编码" />
      </ElFormItem>
      <ElFormItem label="名称" prop="name">
        <ElInput v-model="data.form.name" :disabled="type === ActionEnum.VIEW" placeholder="请输入名称" />
      </ElFormItem>
      <ElFormItem label="角色类别" prop="category">
        <ElRadioGroup v-model="data.form.category" :disabled="type === ActionEnum.VIEW">
          <ElRadio v-for="(item, index) in data.dicts.get('ROLE_CATEGORY')" :key="index" :label="item?.value">
            {{ item?.label }}
          </ElRadio>
        </ElRadioGroup>
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
