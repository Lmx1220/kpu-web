<script setup lang="ts">
import { Api } from '@/api/devOperation/system/defDictItem'
import { getValidateRulesByKpu } from '@/api/modules/common/formValidateServiceKpu.ts'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { useFs } from '@fast-crud/fast-crud'
import { onMounted, ref } from 'vue'
import { createCrudOptions, frontRules } from './data/crud'

defineOptions({
  name: 'SystemDictItem',
  inheritAttrs: false,
})
const parentIdRef = ref()
const { crudRef, crudBinding, crudExpose, appendCrudOptions } = useFs({
  createCrudOptions,
  context: {
    parentIdRef,
  },
})

// 页面打开后获取列表数据
onMounted(async () => {
  const addFormOptions = await getValidateRulesByKpu({
    Api: Api.Save,
    mode: ActionEnum.ADD,
    customRules: frontRules.addForm.rules(crudExpose),
    trigger: 'change',
  })
  const editFormOptions = await getValidateRulesByKpu({
    Api: Api.Update,
    mode: ActionEnum.EDIT,
    customRules: frontRules.editForm.rules(crudExpose),
    trigger: 'change',
  })
  appendCrudOptions({ ...addFormOptions, ...editFormOptions })
})
async function setData(data: any) {
  parentIdRef.value = data.parentId
}
// vue3 setup 导出方法

defineExpose({
  setData,
  doRefresh: crudExpose.doRefresh,
})
</script>

<template>
  <FsCrud ref="crudRef" v-bind="crudBinding" />
</template>

<style scoped>
/* scss */
</style>
