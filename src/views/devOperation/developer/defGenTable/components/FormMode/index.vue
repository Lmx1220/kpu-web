<script lang="ts" setup>
import type { Props as DetailFormProps } from '../DetailForm/index.vue'
import DetailForm from '../DetailForm/index.vue'

defineOptions({
  name: 'FormMode',
})

const props = withDefaults(defineProps<Props>(), {
  id: '',
  modelValue: false,
  mode: 'dialog',
})

const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  'success': []
}>()

export interface Props extends DetailFormProps {
  modelValue?: boolean
  mode?: 'dialog' | 'drawer' | string
}

const myVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const form = ref<InstanceType<typeof DetailForm>>()
const { t } = useI18n()
const title = computed(() => {
  switch (props.type) {
    case 'add':
      return `${t(`common.title.${props.type}`)}add`
    case 'edit':
      return '编辑代码生成器'
    case 'view':
      return '查看代码生成器'
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
    <ElDialog
      v-if="props.mode === 'dialog'" v-model="myVisible" :close-on-click-modal="false" :title="title"
      append-to-body destroy-on-close width="600px"
    >
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          {{ t('common.cancelText') }}
        </ElButton>
        <ElButton size="large" type="primary" @click="onSubmit">
          {{ t('common.okText') }}
        </ElButton>
      </template>
    </ElDialog>
    <ElDrawer
      v-else-if="props.mode === 'drawer'" v-model="myVisible" :close-on-click-modal="false" :title="title"
      destroy-on-close size="600px"
    >
      <DetailForm ref="form" v-bind="$props" />
      <template #footer>
        <ElButton size="large" @click="onCancel">
          {{ t('common.cancelText') }}
        </ElButton>
        <ElButton size="large" type="primary" @click="onSubmit">
          {{ t('common.okText') }}
        </ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
