<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useDialogInner } from '@/components/Dialog/hooks/useDialog.ts'
// import { findOnlineService } from '@/api/modules/common/gateway.ts'
import type { DefResourceApiVO } from '@/api/modules/devOperation/application/model/defResourceModel.ts'
import { enumComponentProps } from '@/util/common.ts'
import { EnumEnum } from '@/enums/commonEnum.ts'

const emits = defineEmits<{
  success: [DefResourceApiVO]
  register: any
}>()

const { t } = useI18n()

const formData = ref<DefResourceApiVO>({
  resourceId: '',
  name: '',
  uri: '',
  controller: '',
  springApplicationName: '',
  requestMethod: '',
  isInput: true,
})
const [registerDialog, { setDialogProps, closeDialog }] = useDialogInner((data) => {
  setDialogProps({ confirmLoading: false, minHeight: 300 })
  data && onDataReceive(data)
})

function onDataReceive(data: any) {
  formData.value = { ...data.record }
}
const formRef = ref<FormInstance>()
function onOk() {
  try {
    setDialogProps({ confirmLoading: true })
    formRef.value?.resetFields()
    closeDialog()
    emits('success', unref(formData))
  }
  finally {
    setDialogProps({ confirmLoading: false })
  }
}
</script>

<template>
  <BaseDialog
    v-bind="$attrs"
    loading-tip="加载"
    title="录入接口" width="80%"
    class="resourceApiSelect"
    @ok="onOk"
    @register="registerDialog"
  >
    <div class="ml-4 mr-4">
      <ElForm ref="formRef" :model="formData">
        <ElFormItem prop="service" :label="t('system.resourceApi.controller')">
          <template #label>
            {{ t('system.resourceApi.controller') }}
            <ElTooltip placement="top">
              <template #content>
                kpu-cloud: 自动查询后台已经正常启动并注册到nacos中的服务 <br>
                kpu-boot: 后台写死lamp-boot-server返回即可
              </template>
              <SvgIcon name="i-ri:question-line" />
            </ElTooltip>
          </template>
          <ApiSelect v-model="formData.springApplicationName" :api="findOnlineService" clearable show-search />
        </ElFormItem>
        <ElFormItem prop="controller" :label="t('system.resourceApi.controller')">
          <ElInput v-model="formData.controller" clearable />
        </ElFormItem>
        <ElFormItem prop="uri" :label="t('system.resourceApi.uri')">
          <ElInput v-model="formData.uri" clearable />
        </ElFormItem>
        <ElFormItem prop="requestMethod" :label="t('system.resourceApi.requestMethod')">
          <ApiSelect v-model="formData.requestMethod" v-bind="enumComponentProps(EnumEnum.HttpMethod)" clearable />
        </ElFormItem>
        <ElFormItem prop="name" :label="t('system.resourceApi.name')">
          <ElInput v-model="formData.name" clearable />
        </ElFormItem>
      </ElForm>
    </div>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.resourceApiSelect {
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-meta-title {
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    color: rgb(0 0 0 / 85%);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cardDesc {
    max-width: 100%;
    overflow: hidden;
    font-size: 14px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: rgb(97 175 254 / 10%);
  }
}

:deep(.el-card) {
  .el-card__header {
    --at-apply: p-x-2 p-y-3;
  }

  .el-card__body {
    --at-apply: p-4;

    > div:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .el-card__footer {
    --at-apply: p0 border-t-0;
  }
}
</style>
