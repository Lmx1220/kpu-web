<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudStation from '@/api/modules/system/station'
import stautsEnum from '@/enums/stautsEnum'
import { treeOrg } from '@/api/modules/system/org'
import { ActionEnum } from '@/enums/commonEnum.ts'

export interface Props {
  id?: string
  type?: ActionEnum
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.VIEW,
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
        if (props.type === ActionEnum.ADD) {
          crudStation.save(data.value.form).then(() => {
            ElMessage.success({
              message: t('common.tips.addSuccess'),
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudStation.update(data.value.form).then(() => {
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
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <ElFormItem label="名称" prop="name">
        <ElInput v-model="data.form.name" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="所属机构" prop="orgId">
        <ElTreeSelect
          v-model="data.form.orgId"
          :data="tree"
          :disabled="type === ActionEnum.VIEW"
          :props="{
            children: 'children',
            label: 'name',
          }"
          :render-after-expand="false"

          check-strictly show-checkbox filterable check-on-click-node
          value-key="id"
        />
      </ElFormItem>
      <ElFormItem label="状态" prop="state">
        <ElRadioGroup v-model="data.form.state" :disabled="type === ActionEnum.VIEW">
          <ElRadioButton v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
            {{ item.label }}
          </ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="备注" prop="remarks">
        <ElInput
          v-model="data.form.remarks" :autosize="{ minRows: 2, maxRows: 4 }" :disabled="type === ActionEnum.VIEW"
          :placeholder="type === ActionEnum.VIEW ? '' : '请输入备注'" type="textarea"
        />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
