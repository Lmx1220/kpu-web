<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import crudDict from '@/api/modules/system/dict'
import crudDictItem from '@/api/modules/system/dictItem'
import { stateList } from '@/enums/stautsEnum'

export interface Props {
  id?: string
  parentId?: string
  currentData?: { [key: string]: any }
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  currentData: {},
})

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
      data.value.form = res
    })
  }
  else {
    crudDict.detail(data.value.form.id).then((res) => {
      data.value.loading = false
      data.value.form = res
    })
  }
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (data.value.form.id === '') {
          if (props.parentId) {
            crudDictItem.create(data.value.form).then(() => {
              ElMessage.success({
                message: '模拟新增成功',
                center: true,
              })
              callback && callback()
            })
          }
          else {
            crudDict.create(data.value.form).then(() => {
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
            crudDictItem.edit(data.value.form).then(() => {
              ElMessage.success({
                message: '模拟编辑成功',
                center: true,
              })
              callback && callback()
            })
          }
          else {
            crudDict.edit(data.value.form).then(() => {
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-form-item v-show="parentId" label="父标识" prop="key">
        <el-input v-model="currentData.key" disabled placeholder="请输入标题" />
      </el-form-item>
      <el-form-item v-show="parentId" label="父名称" prop="name">
        <el-input v-model="currentData.name" disabled placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="标识" prop="key">
        <el-input v-model="data.form.key" :disabled="!!id && !parentId" placeholder="请输入标识" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="data.form.state" size="large">
          <el-radio-button v-for="(item, index) in stateList" :key="index" :label="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="data.form.remark" :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入备注" type="textarea"
        />
      </el-form-item>
      <el-form-item v-show="parentId" label="排序" prop="remark">
        <el-input-number
          v-model="data.form.sortValue"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item v-show="parentId" label="图标" prop="icon">
        <IconPicker v-model="data.form.icon" />
      </el-form-item>
      <el-form-item v-show="parentId" label="css样式" prop="cssStyle">
        <el-input v-model="data.form.cssStyle" placeholder="请输入css样式" />
      </el-form-item>
      <el-form-item v-show="parentId" label="css类元素" prop="cssClass">
        <el-input v-model="data.form.cssClass" placeholder="请输入css类元素" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
