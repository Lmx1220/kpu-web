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

const title = computed(() => props.id === '' ? '新增Test' : '编辑Test')

function onSubmit() {
  // submit() 为组件内部方法
  form.value?.submit(() => {
    emits('success')
    onCancel()
  })
}

function onCancel() {
  myVisible.value = false
}

function handleOpen() {
  // handleOpen() 为组件内部方法
  form.value?.open()
}
</script>

<template>
  <div>
    <el-dialog
      v-if="props.mode === 'dialog'" v-model="myVisible" :close-on-click-modal="false" :title="title"
      append-to-body destroy-on-close width="600px" @open="handleOpen"
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
      destroy-on-close size="50%" @open="handleOpen"
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
