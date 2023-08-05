<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudStation from '@/api/modules/system/station'
import stautsEnum from '@/enums/stautsEnum'
import { treeOrg } from '@/api/modules/system/org'

export interface Props {
  id?: string
  type?: 'add' | 'edit' | 'view'
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: 'view',
  parentCurrent: () => ({}),
})

const data = ref({
  loading: false,
  form: {
    id: props.id,
    name: '',
    orgId: '',
    state: true,
    remarks: '',
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur',
      },
    ],
  },
})
const tree = ref()

const form = ref<FormInstance>()

onMounted(() => {
  getTreeList()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

function getInfo() {
  data.value.loading = true
  crudStation.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form = res as any
  })
}

async function getTreeList() {
  data.value.loading = true
  try {
    tree.value = await treeOrg()
  }
  finally {
    setTimeout(() => {
      data.value.loading = false
    }, 100)
  }
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (props.type === 'add') {
          crudStation.create(data.value.form).then(() => {
            ElMessage.success({
              message: '新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === 'edit') {
          crudStation.edit(data.value.form).then(() => {
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.form.name" :disabled="type === 'view'" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="所属机构" prop="orgId">
        <el-tree-select
          v-model="data.form.orgId"
          :data="tree"
          :disabled="type === 'view'"
          :props="{
            children: 'children',
            label: 'name',
          }"
          :render-after-expand="false"
          check-on-click-node
          check-strictly
          filterable
          show-checkbox
          value-key="id"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="data.form.state" :disabled="type === 'view'">
          <el-radio-button v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="data.form.remarks" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === 'view'"
          :placeholder="type === 'view' ? '' : '请输入备注'" type="textarea"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
