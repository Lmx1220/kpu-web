<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'

import crudRole from '@/api/modules/system/role'
import { stateList } from '@/enums/stautsEnum'

export interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {})

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
  stateList,
  dicts: new Map<string, Option[]>(),
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
  if (data.value.form.id !== '') {
    getInfo()
  }
})

async function getDict() {
  const options: DictOption = await findDictMapItemListByKey([{
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
  open() {
    getDict()
  },
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (data.value.form.id === '') {
          crudRole.create(data.value.form).then(() => {
            ElMessage.success({
              message: '新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else {
          crudRole.edit(data.value.form).then(() => {
            ElMessage.success({
              message: '编辑成功',
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-width="120px" label-suffix="：">
      <el-form-item label="编码" prop="code">
        <el-input v-model="data.form.code" placeholder="请输入编码" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="角色类别" prop="category">
        <el-radio-group v-model="data.form.category">
          <el-radio v-for="(item, index) in data.dicts.get('ROLE_CATEGORY')" :key="index" :label="item?.value">
            {{ item?.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="data.form.remarks" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="data.form.state" size="large">
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
