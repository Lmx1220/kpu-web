<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { VxeGridInstance, VxeGridListeners, VxeGridProps, VxeTablePropTypes } from 'vxe-table'
import { columns, customFormSchemaRules, formItems } from './file.data'
import { ActionEnum, VALIDATE_API } from '@/enums/commonEnum'
import { getValidateRuleObj } from '@/api/modules/common/formValidateService'
import { Api, page as pageRequest } from '@/api/modules/system/dictItem'

const { t } = useI18n()
const parentId = ref<string>('')

const typeRef = ref<ActionEnum>(ActionEnum.ADD)
const xGrid: Ref<VxeGridInstance> = ref({} as VxeGridInstance)
const validRules = ref<VxeTablePropTypes.EditRules>({})

const gridOptions = reactive<VxeGridProps>({
  id: 'ComFile',
  height: 600,
  rowConfig: {
    // 自定义行数据唯一主键的字段名（默认自动生成）
    keyField: 'id',
    // 当鼠标移到行时，是否要高亮当前行
    isHover: true,
  },
  // 自定义列配置项
  customConfig: {
    // 是否启用 localStorage 本地保存，会将列操作状态保留在本地（需要有 id）
    storage: true,
  },
  formConfig: {
    items: formItems(),
  },
  toolbarConfig: {
    perfect: true,
    buttons: [
      { code: 'myInsert', name: '新增' },
      {
        code: 'delete',
        name: '删除',
        status: 'danger',
      },
    ],
  },
  // 分页配置项
  pagerConfig: {
    // pageSize: 10,
  },
  // 数据代理配置项（基于 Promise API）
  proxyConfig: {
    // 只接收Promise，具体实现自由发挥
    ajax: {
      // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
      query: ({ page, sorts, filters, form }) => {
        const queryParams: any = { model: { ...form } }

        if (!parentId.value) {
          ElMessage.warning('请先保存数据')
          return Promise.reject(new Error('请先保存数据'))
        }
        // 处理排序条件
        const firstSort = sorts[0]
        if (firstSort) {
          queryParams.sort = firstSort.property
          queryParams.order = firstSort.order
        }
        queryParams.size = page.pageSize
        queryParams.current = page.currentPage
        queryParams.model.parentId = parentId.value
        // 处理筛选条件
        filters.forEach(({ property, values }) => {
          queryParams[property] = values.join(',')
        })
        return pageRequest(queryParams).then((r) => {
          r.total = Number(r.total)
          return r
        })
      },
    },
  },
  columns: columns(),
  editRules: validRules.value,
  editConfig: {
    trigger: 'click',
    mode: 'row',
    showStatus: true,
    autoClear: true,
  },
})

const gridEvents: VxeGridListeners = {
  toolbarButtonClick({ code }) {
    const $grid = xGrid.value
    switch (code) {
      case 'myInsert': {
        $grid?.insert({
          parentId: parentId.value,
        })
        break
      }
    }
  },
}

function getRecordset() {
  const $grid = xGrid.value
  const recordset = $grid?.getRecordset()
  if (typeRef.value === ActionEnum.COPY) {
    return { insertRecords: $grid?.getData() }
  }
  return recordset
}

function fullValidate() {
  const $grid = xGrid.value
  return $grid?.fullValidate()
}

async function load(type: ActionEnum, tId?: string) {
  parentId.value = ''
  typeRef.value = type
  if (type !== ActionEnum.ADD) {
    parentId.value = tId || ''
    reload()
  }

  if (type !== ActionEnum.VIEW) {
    const validateApi = Api[VALIDATE_API[type]]
    const rules: any = await getValidateRuleObj(validateApi, customFormSchemaRules())
    const $grid = xGrid.value
    $grid && rules && (validRules.value = rules)
  }
}

async function insertEvent(row: any) {
  const $grid = xGrid.value
  const record = {
    parentId: parentId.value,
  }
  const { row: newRow } = await $grid?.insertAt(record, row) as any
  await $grid?.setActiveCell(newRow, 'key')
}

async function removeRowEvent(row: any) {
  const $grid = xGrid.value
  if ($grid) {
    $grid.remove(row)
    ElMessage.success(t('common.tips.deleteSuccess'))
  }
}

function reload() {
  const $grid = xGrid.value
  $grid?.commitProxy('query')
}

async function reset() {
  const $grid = xGrid.value
  await $grid?.revertData()
  await $grid?.clearAll()
  await $grid?.clearData()
  await $grid?.remove()
  $grid?.getRefMaps().refForm.value.reset()
}

defineExpose({
  load,
  reset,
  insertEvent,
  removeRowEvent,
  getRecordset,
  fullValidate,
})
</script>

<template>
  <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
    <template #operate="{ row }">
      <el-popconfirm
        icon-color="#626AEF"
        title="确认删除吗?"
        @confirm="removeRowEvent(row)"
      >
        <template #reference>
          <el-button
            circle
          >
            <svg-icon name="ep:delete" />
          </el-button>
        </template>
      </el-popconfirm>
    </template>
  </vxe-grid>
</template>
