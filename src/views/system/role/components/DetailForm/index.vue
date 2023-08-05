<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'

import crudRole from '@/api/modules/system/role'
import stautsEnum from '@/enums/stautsEnum'

export interface Props {
  id: string
  type?: 'add' | 'edit' | 'view'

}

const props = withDefaults(defineProps<Props>(), {
  type: 'view',
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
  getDict()
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
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (props.type === 'add') {
          crudRole.create(data.value.form).then(() => {
            ElMessage.success({
              message: '新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === 'edit') {
          crudRole.edit(data.value.form).then(() => {
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-width="120px" label-suffix="：">
      <el-form-item label="编码" prop="code">
        <el-input v-model="data.form.code" :disabled="type === 'view'" placeholder="请输入编码" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.form.name" :disabled="type === 'view'" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="角色类别" prop="category">
        <el-radio-group v-model="data.form.category" :disabled="type === 'view'">
          <el-radio v-for="(item, index) in data.dicts.get('ROLE_CATEGORY')" :key="index" :label="item?.value">
            {{ item?.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="data.form.remarks" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === 'view'"
          :placeholder="type === 'view' ? '' : '请输入备注'" type="textarea"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="data.form.state" :disabled="type === 'view'">
          <el-radio-button v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
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
