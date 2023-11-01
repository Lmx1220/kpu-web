<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudOrg from '@/api/modules/system/org'
import stautsEnum from '@/enums/stautsEnum'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'
import { ActionEnum } from '@/enums/commonEnum.ts'

export interface Props {
  id?: string
  type?: ActionEnum
  currentData: { [key: string]: any }
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  type: ActionEnum.ADD,
  currentData: () => ({
    id: '',
    label: '',
    type: '02',
    state: true,
  }),
})
const emits = defineEmits<{
  'update:type': [
    value?: ActionEnum,
  ]
}>()
const current = computed(() => props.currentData)
const defaultForm = {
  parentId: '',
  parentName: '',
  id: '',
  name: '',
  type: '02',
  abbreviation: '',
  state: true,
  sortValue: 1,
  remarks: '',
}
const data = ref({
  loading: false,
  form: {
    ...defaultForm,
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入名称',
        trigger: 'blur',
      },
    ],
    type: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
  },
  dicts: new Map<string, Option[]>(),
})

const form = ref<FormInstance>()

onMounted(() => {
  getDict()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

watch(() => [props.id, props.type, props.currentData.id], () => {
  form.value?.resetFields()
  Object.assign(data.value.form, current.value)
}, { immediate: true })

function getInfo() {
  data.value.loading = true
  crudOrg.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form = res as any
  })
}

async function getDict() {
  const options: DictOption = await findDictMapItemListByKey([{
    type: 'ORG_TYPE',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}

defineExpose({
  reset() {
    form.value?.resetFields()
    Object.assign(data.value.form, props.currentData)
  },
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (props.type === ActionEnum.ADD) {
          crudOrg.create(data.value.form).then(() => {
            ElMessage.success({
              message: '新增成功',
              center: true,
            })
            emits('update:type', undefined)
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudOrg.edit(data.value.form).then(() => {
            ElMessage.success({
              message: '编辑成功',
              center: true,
            })
            emits('update:type', undefined)
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
      <ElFormItem label="父机构" prop="parentName">
        <ElInput v-model="data.form.parentName" disabled placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="名称" prop="name">
        <ElInput v-model="data.form.name" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="类型" prop="type">
        <ElRadioGroup v-model="data.form.type" :disabled="type === ActionEnum.VIEW">
          <ElRadioButton v-for="(item, index) in data.dicts.get('ORG_TYPE') || []" :key="index" :label="item.value">
            {{ item.label }}
          </ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="简称" prop="abbreviation">
        <ElInput v-model="data.form.abbreviation" :disabled="type === ActionEnum.VIEW" placeholder="请输入" />
      </ElFormItem>
      <ElFormItem label="状态" prop="state">
        <ElRadioGroup v-model="data.form.state" :disabled="type === ActionEnum.VIEW">
          <ElRadioButton v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
            {{ item.label }}
          </ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="排序" prop="sortValue">
        <ElInputNumber
          v-model="data.form.sortValue"
          :disabled="type === ActionEnum.VIEW"
          controls-position="right"
        />
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
