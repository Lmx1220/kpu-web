<script setup lang="ts">
import { Api } from '@/api/devOperation/system/defDict'
import { getValidateRulesByKpu } from '@/api/modules/common/formValidateServiceKpu.ts'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { useFs } from '@fast-crud/fast-crud'
import { onMounted, ref } from 'vue'
import { createCrudOptions, frontRules } from './data/crud'
import Item from './item/index.vue'

defineOptions({
  name: 'DefDictManager',
  inheritAttrs: false,
})

const itemTableRef = ref<typeof Item>()
const { crudRef, crudBinding, crudExpose, appendCrudOptions } = useFs({
  createCrudOptions,
  context: {
    itemTableRef,
  },
})

// 页面打开后获取列表数据
onMounted(async () => {
  const addFormOptions = await getValidateRulesByKpu({
    Api: Api.Save,
    mode: ActionEnum.ADD,
    customRules: frontRules.addForm.rules(),
    trigger: 'change',
  })
  const editFormOptions = await getValidateRulesByKpu({
    Api: Api.Update,
    mode: ActionEnum.EDIT,
    customRules: frontRules.editForm.rules(crudExpose),
    trigger: 'change',
  })
  appendCrudOptions({ ...addFormOptions, ...editFormOptions })
  crudExpose.doRefresh()
})
</script>

<template>
  <ARow class="absolute h-full w-full" :gutter="0">
    <a-col :span="12">
      <!--      <FsPage> -->
      <FsCrud ref="crudRef" class="p-0" v-bind="crudBinding" />
      <!--      </FsPage> -->
    </a-col>
    <a-col :span="12">
      <Item ref="itemTableRef" class="p-0" />
    </a-col>
  </ARow>
</template>

<style scoped>
/* scss */
</style>
