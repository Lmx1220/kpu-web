<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudDict from '@/api/modules/devOperation/system/dict'
import crudDictItem from '@/api//modules/devOperation/system/dictItem'
import stautsEnum from '@/enums/stautsEnum'

export interface Props {
  id?: string
  parentId?: string
  currentData?: { [key: string]: any }
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  currentData: () => ({
    key: '',
    name: '',
  }),
})
const pData = computed(
  () => {
    if (!props.currentData) {
      return {
        key: '',
        name: '',
      }
    }
    return props.currentData
  },
)
const data = ref({
  loading: false,
  form: {
    id: props.id,
    parentId: props.parentId,
    key: '',
    name: '',
    state: true,
    remark: '',
    sortValue: 1,
    icon: '',
    cssStyle: '',
    cssClass: '',
  },
  rules: {
    key: [
      {
        required: true,
        message: '请输入标识',
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
  if (props.parentId) {
    crudDictItem.detail(data.value.form.id).then((res) => {
      data.value.loading = false
      data.value.form = res as any
    })
  }
  else {
    crudDict.detail(data.value.form.id).then((res) => {
      data.value.loading = false
      data.value.form = res as any
    })
  }
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (data.value.form.id === '') {
          if (props.parentId) {
            crudDictItem.save(data.value.form).then(() => {
              ElMessage.success({
                message: '模拟新增成功',
                center: true,
              })
              callback && callback()
            })
          }
          else {
            crudDict.save(data.value.form).then(() => {
              ElMessage.success({
                message: '模拟新增成功',
                center: true,
              })
              callback && callback()
            })
          }
        }
        else {
          if (props.parentId) {
            crudDictItem.update(data.value.form).then(() => {
              ElMessage.success({
                message: '模拟编辑成功',
                center: true,
              })
              callback && callback()
            })
          }
          else {
            crudDict.update(data.value.form).then(() => {
              ElMessage.success({
                message: '模拟编辑成功',
                center: true,
              })
              callback && callback()
            })
          }
        }
      }
    })
  },
})
</script>

<template>
  <div v-loading="data.loading">
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <ElFormItem v-show="parentId" label="父标识" prop="key">
        <ElInput v-model="pData.key" disabled placeholder="请输入标题" />
      </ElFormItem>
      <ElFormItem v-show="parentId" label="父名称" prop="name">
        <ElInput v-model="pData.name" disabled placeholder="请输入标题" />
      </ElFormItem>
      <ElFormItem label="标识" prop="key">
        <ElInput v-model="data.form.key" :disabled="!!id && !parentId" placeholder="请输入标识" />
      </ElFormItem>
      <ElFormItem label="名称" prop="name">
        <ElInput v-model="data.form.name" placeholder="请输入名称" />
      </ElFormItem>
      <ElFormItem label="状态" prop="state">
        <ElRadioGroup v-model="data.form.state">
          <ElRadioButton v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
            {{ item.label }}
          </ElRadioButton>
        </ElRadioGroup>
      </ElFormItem>
      <ElFormItem label="备注" prop="remark">
        <ElInput
          v-model="data.form.remark" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入备注"
          type="textarea"
        />
      </ElFormItem>
      <ElFormItem v-show="parentId" label="排序" prop="sortValue">
        <ElInputNumber
          v-model="data.form.sortValue"
          controls-position="right"
        />
      </ElFormItem>
      <ElFormItem v-show="parentId" label="图标" prop="icon">
        <IconPicker v-model="data.form.icon" />
      </ElFormItem>
      <ElFormItem v-show="parentId" label="css样式" prop="cssStyle">
        <ElInput v-model="data.form.cssStyle" placeholder="请输入css样式" />
      </ElFormItem>
      <ElFormItem v-show="parentId" label="css类元素" prop="cssClass">
        <ElInput v-model="data.form.cssClass" placeholder="请输入css类元素" />
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
