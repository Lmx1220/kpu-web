<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ActionEnum } from '@/enums/commonEnum'
import Vxe from '@/views/vxe.vue'

defineOptions({
  name: 'Home',
})
const { t } = useI18n()

const fileRef = ref<typeof Vxe>()
onMounted(() => {
  fileRef.value?.load(ActionEnum.EDIT, '1681934380567625728')
})

function getFileRef() {
  return unref(fileRef)
}
async function handleSubmit() {
  try {
    const errMap = await getFileRef()?.fullValidate()
    if (errMap) {
      let msgStr = ''
      Object.values(errMap).forEach((errList: any) => {
        errList.forEach((params: any) => {
          const { rowIndex, column, rules } = params
          rules.forEach((rule: any) => {
            msgStr += `第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message} <br/>`
          })
        })
      })
      ElNotification.warning({
        title: '校验失败',
        message: h('div', { innerHTML: msgStr }, []),
        duration: 500,
      })
      return
    }
    const { insertRecords, removeRecords, updateRecords } = getFileRef()?.getRecordset()
  }
  catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div>
    <Vxe ref="fileRef" />
    <ElButton @click="handleSubmit">
      {{ t('common.saveText') }}
    </ElButton>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
