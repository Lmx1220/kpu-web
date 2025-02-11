<script lang="ts" setup>
import type { ExtendedVxeGridApi } from '@/ui/vxe-table/types.ts'
import type { AxiosRequestConfig } from 'axios'
import { useKpuForm } from '@/adapter/form.ts'
import api, { Api } from '@/api/devOperation/application/defApplication'
import { getValidateRuleObj } from '@/api/modules/common/formValidateService.ts'
import { listByBizId } from '@/api/modules/file/upload.ts'
import { ActionEnum, FileBizTypeEnum } from '@/enums/commonEnum.ts'
import { $t } from '@/locales'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { formEdit } from '@/views/devOperation/application/defApplication/defApplication.data.tsx'

const type = ref<ActionEnum>(ActionEnum.ADD)
const [Form, formApi] = useKpuForm({
  showDefaultActions: false,
  ...formEdit,
})
const data = reactive<Record<string, any>>({
})
async function frontRules(api: AxiosRequestConfig, customRules: any) {
  const schema = await getValidateRuleObj({
    Api: api,
    customRules,
  })
  formApi.updateSchema(schema)
}
const gridApi = ref<ExtendedVxeGridApi>()
const [Modal, modalApi] = useKpuModal({
  async onOpenChange(open) {
    type.value = modalApi?.getData().type ?? false
    data.value = open ? modalApi?.getData().record ?? {} : {}
    gridApi.value = open ? modalApi?.getData().gridApi : null

    if (open && type.value) {
      const record = { ...data.value }

      if (type.value !== ActionEnum.ADD) {
        const appendixIcons = await listByBizId({
          bizId: data.value.id,
          bizType: FileBizTypeEnum.DEF_APPLICATION_LOGO,
        })
        record.appendixIcon = appendixIcons?.[0]?.id
      }
      formApi.setValues(record)
      switch (type.value) {
        case ActionEnum.EDIT:
          frontRules(Api.Update, [])
          break
        default:
          frontRules(Api.Save, [])
          break
      }
    }
  },
  async onConfirm() {
    const { valid } = await formApi.validate()
    if (valid) {
      const data: any = await formApi.getValues()
      formApi.setState({
        // loading: true,
        confirmLoading: true,
      })
      try {
        switch (type.value) {
          case ActionEnum.EDIT: {
            await api.update(data)
            break
          }
          default: {
            data.id = null
            await api.save(data)
            break
          }
        }
        // u.success('保存成功'),
        gridApi.value?.reload()
        modalApi.close()
      }
      finally {
        formApi.setState({
          // loading: true,
          confirmLoading: true,
        })
      }
    }
  },
})
defineExpose({
  ...modalApi,
})
</script>

<template>
  <Modal
    :title="$t(`common.title.${type}`)"
    class="w-[60%]"
  >
    <div class="common-form">
      <Form />
    </div>
  </Modal>
</template>

<style scoped>
.m-table-action {
  display: flex;
  align-items: center;

  .action-divider {
    display: table;
  }

  &.left {
    justify-content: flex-start;
  }

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  button {
    display: flex;
    align-items: center;

    span {
      margin-left: 0 !important;
    }
  }

  button.ant-btn-circle {
    span {
      margin: auto !important;
    }
  }

  .ant-divider,
  .ant-divider-vertical {
    margin: 0 2px;
  }

  .icon-more {
    transform: rotate(90deg);

    svg {
      font-size: 1.1em;
      font-weight: 700;
    }
  }
}
</style>
