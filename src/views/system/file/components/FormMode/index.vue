<script lang="ts" setup>
import type { Props as DetailFormProps } from '../DetailForm/index.vue'
import DetailForm from '../DetailForm/index.vue'

export interface Props extends DetailFormProps {
  modelValue?: boolean
  mode?: 'dialog' | 'drawer' | string
}

const props = withDefaults(defineProps<Props>(),
  {
    id: '',
    modelValue: false,
    mode: 'dialog',
  })

const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  success: []
}>()

const myVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const form = ref<InstanceType<typeof DetailForm>>()

const title = computed(() => {
  switch (props.type) {
    case 'add':
      return '新增文件管理'
    case 'edit':
      return '编辑文件管理'
    case 'view':
      return '查看文件管理'
    default:
      return '查看角色'
  }
})

function onSubmit() {
  // submit() 为组件内部方法
  form.value?.submit((success = true) => {
    if (success) {
      emits('success')
    }
    onCancel()
  })
}

function onCancel() {
  myVisible.value = false
}
</script>

<template>
  <div>
    <el-dialog
      v-if="props.mode === 'dialog'" v-model="myVisible" :close-on-click-modal="false" :title="title"
      append-to-body destroy-on-close width="600px"
    >
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <el-button size="large" @click="onCancel">
          取 消
        </el-button>
        <el-button size="large" type="primary" @click="onSubmit">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <el-drawer
      v-else-if="props.mode === 'drawer'" v-model="myVisible" :close-on-click-modal="false" :title="title"
      destroy-on-close size="600px"
    >
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <el-button size="large" @click="onCancel">
          取 消
        </el-button>
        <el-button size="large" type="primary" @click="onSubmit">
          确 定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>
