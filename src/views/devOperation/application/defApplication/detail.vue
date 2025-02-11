<script lang="ts" setup>
import type { DescriptionProps } from '@/components/Description/typing.ts'
import { listByBizId } from '@/api/modules/file/upload.ts'
import { viewForm } from '@/components/Description/description'
import { FileBizTypeEnum } from '@/enums/commonEnum.ts'
import { useKpuModal } from '@/ui/components/KpuModal/use-modal.ts'
import { formEdit } from './defApplication.data.tsx'

const data = ref<Record<string, any>>({
})
const forms = ref<DescriptionProps[]>([])
const [Modal, modalApi] = useKpuModal({
  async onOpenChange(open) {
    const newData = modalApi?.getData().record
    data.value = open ? newData : {}
    if (open) {
      const appendixIcons = await listByBizId({
        bizId: data.value.id,
        bizType: FileBizTypeEnum.DEF_APPLICATION_LOGO,
      })
      data.value.appendixIcon = appendixIcons?.[0]?.id
      newData.appendixIcon = appendixIcons?.[0]?.id
      forms.value = viewForm(formEdit, newData)
    }
  },
})
defineExpose({
  ...modalApi,
})
</script>

<template>
  <div>
    <Modal
      title="查看"
      class="w-[60%]"
    >
      <div class="desc-wrap">
        <div v-for="item in forms" :key="item.field" class="desc-card">
          <Description :data="data" :schema="item.children" :title="forms.length === 1 ? undefined : item.label" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
/* scss */
</style>
