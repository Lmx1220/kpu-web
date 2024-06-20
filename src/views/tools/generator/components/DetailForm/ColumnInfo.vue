<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import type { DataConfig } from '#/global'
import crudGenTableColumn, { syncFieldGenTableColumn } from '@/api/modules/tools/genTableColumn'
import type { GenTableColumnPageQuery } from '@/api/modules/tools/model/genTableColumnModel'
import { deepClone } from '@/util'
import usePagination from '@/util/usePagination'
import yesOrNoEnum from '@/enums/common/yesOrNoEnum'

defineOptions({
  name: 'ColumnInfo',
})
const props = withDefaults(defineProps<Props>(), {
  id: '',
})
export interface Props {
  id?: string | string[]
}

const isSingle = computed(() => {
  return !Array.isArray(props.id)
})
const {
  pagination,
  search,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
  resetQuery,
} = usePagination()
// const router = useRouter()
// const route = useRoute()
const defaultQuery = {
  name: '',
  comment: '',
  tableId: props.id,
}
const data = ref<DataConfig>({
  loading: false,
  tableAutoHeight: true,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'router',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search,
  searchFold: false,
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
  dicts: new Map(),

})
data.value.dicts.set('YesOrNoEnum', yesOrNoEnum.enum())
data.value.dicts.set('javaType', [
  {
    value: 'String',
  },
  {
    value: 'Long',
  },
  {
    value: 'Integer',
  },
  {
    value: 'Boolean',
  },
  {
    value: 'Double',
  },
  {
    value: 'BigDecimal',
  },
  {
    value: 'LocalDateTime',
  },
  {
    value: 'LocalDate',
  },
  {
    value: 'LocalTime',
  },
])
data.value.dicts.set('tsType', [
  {
    value: 'string',
  },
  {
    value: 'number',
  },
  {
    value: 'boolean',
  },
  {
    value: 'string[]',
  },
  {
    value: 'number[]',
  },
  {
    value: 'any',
  },
  {
    value: 'tuple',
  },
  {
    value: 'enum',
  },
])
data.value.dicts.set('queryType', [
  {
    value: 'EQUAL',
  },
  {
    value: 'NOT_EQUAL',
  },
  {
    value: 'LIKE',
  },
  {
    value: 'ORACLE_LIKE',
  },
  {
    value: 'LIKE_LEFT',
  },
  {
    value: 'LIKE_RIGHT',
  },
])
data.value.dicts.set('fill', [
  {
    value: 'DEFAULT',
  },
  {
    value: 'INSERT',
  },
  {
    value: 'UPDATE',
  },
  {
    value: 'INSERT_UPDATE',
  },

])
const table = ref<InstanceType<typeof ElTable>>()

async function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  const params = getParams<GenTableColumnPageQuery>({
    ...data.value.search,
  })
  params.model.tableId = props.id
  const res = await crudGenTableColumn.page(params)
  data.value.dataList = get(res, 'records', [])
  pagination.value.total = Number(res.total)
  pagination.value.page = Number(get(res, 'current', 1))
  // pagination.value.size = res.size
  setTimeout(() => {
    data.value.loading = false
  }, 100)
}

onMounted(() => {
  isSingle.value && getDataList()
})
// async function getDict() {
//   const options: DictOption = await findEnumListByType([
//     {
//       type: 'FileOverrideStrategyEnum',
//       extendFirst: true,
//     },
//   ])
//   Object.entries(options).forEach(([key, value]) => {
//     data.value.dicts.set(key, value)
//   })
// }
// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange({ prop, order }: any) {
  onSortChange(prop, order).then(() => getDataList())
}

const editData = ref<any>()

function onEdit(row: any) {
  if (editData.value) {
    onCancel(editData.value)
  }
  row.oldData = deepClone(row)
  editData.value = row
}

/**
 * 取消编辑
 */
function onCancel(row: any) {
  Object.assign(row, row.oldData)
  editData.value = null
}

function onSave(row: any) {
  crudGenTableColumn.update(row).then((res) => {
    Object.assign(row, res)
    editData.value = null
    ElMessage.success({
      message: '编辑成功',
      center: true,
    })
  })
}

function onDel(row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id)
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudGenTableColumn.remove(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

function onSync(row?: any) {
  ElMessageBox.confirm('确认同步吗？', '确认信息').then(() => {
    syncFieldGenTableColumn({ tableId: props.id as string, id: row.id }).then(() => {
      getDataList()
      ElMessage.success({
        message: '同步成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

function querySearch(queryString: string, cb: any, key: string) {
  const results = queryString
    ? data.value.dicts?.get(key).filter(createFilter(queryString))
    : data.value.dicts?.get(key) ? data.value.dicts?.get(key) : []
  // call callback function to return suggestions
  cb(results)
}

function createFilter(queryString: string) {
  return (restaurant: any) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

function formatterIsNot(yesOrNo: boolean) {
  return data.value.dicts?.get('YesOrNoEnum').find((item: any) => item.value === yesOrNo)?.label
}
</script>

<template>
  <PageMain v-if="isSingle" class="column-info">
    <SearchBar
      :fold="data.searchFold"
      :show-toggle="false"
    >
      <template #default="{ fold }">
        <ElForm
          :model="data.search" class="search-form" inline-message inline label-suffix="：" label-width="100px"
          size="default"
        >
          <ElFormItem label="列名称">
            <ElInput
              v-model="data.search.name" clearable placeholder="请输入，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem label="列描述">
            <ElInput
              v-model="data.search.comment" clearable placeholder="请输入，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" @click="currentChange()">
              <template #icon>
                <SvgIcon name="ep:search" />
              </template>
              筛选
            </ElButton>
            <ElButton type="primary" @click="resetQuery(defaultQuery)">
              重置
            </ElButton>
            <ElButton link type="primary" @click="data.searchFold = !fold">
              <template #icon>
                <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
              </template>
              {{ fold ? '展开' : '收起' }}
            </ElButton>
          </ElFormItem>
        </ElForm>
      </template>
    </SearchBar>
    <ElDivider border-style="dashed" />
    <ElSpace wrap>
      <ElButton :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
        <template #icon>
          <SvgIcon name="ep:delete" />
        </template>
        删除
      </ElButton>
    </ElSpace>
    <ElForm :model="data">
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" class="list-table" height="100%"
        highlight-current-row stripe border @sort-change="sortChange"
        @selection-change="data.batch.selectionDataList = $event"
      >
        <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />
        <ElTableColumn align="center" fixed label="#" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </ElTableColumn>
        <ElTableColumn fixed label="列名称" prop="name" width="370" />
        <ElTableColumn fixed label="列类型" prop="type" width="100" />
        <ElTableColumn label="列描述" prop="comment" width="800" show-overflow-tooltip>
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.column`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElInput v-model="row.comment" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.comment }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="文档描述" prop="swaggerComment" width="140" show-overflow-tooltip>
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.swaggerComment`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElInput v-model="row.swaggerComment" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.swaggerComment }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="JAVA类型" prop="javaType" width="150">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.javaType`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElAutocomplete
                  v-model="row.javaType"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'javaType')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </ElFormItem>
              <span v-else>{{ row.javaType }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="JAVA字段名" min-width="150" prop="javaField">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.javaField`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElInput v-model="row.javaField" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.javaField }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="TS类型" min-width="100" prop="tsType">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.tsType`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElAutocomplete
                  v-model="row.tsType"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'tsType')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </ElFormItem>
              <span v-else>{{ row.tsType }}</span>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="长度" prop="size" width="100">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.size`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElInputNumber
                  v-model="row.size"
                  controls-position="right"
                />
              </ElFormItem>
              <span v-else>{{ row.size }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="主键" prop="isPk" width="90">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isPk`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isPk"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isPk) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="必填" prop="isRequired" width="90">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isRequired`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isRequired"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isRequired) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="逻辑删除" prop="isLogicDeleteField" width="120">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isLogicDeleteField`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isLogicDeleteField"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isLogicDeleteField) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="乐观锁" prop="isVersionField" width="100">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isVersionField`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isVersionField"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isVersionField) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="自增" prop="isIncrement" width="90">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isIncrement`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isIncrement"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isIncrement) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="填充类型" prop="fill" width="120">
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.fill`"
              >
                <ElAutocomplete
                  v-model="row.fill"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'fill')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </ElFormItem>
              <span v-else>{{ row.fill }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="编辑" prop="isEdit" width="90">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isEdit`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isEdit"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isEdit) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="列表" prop="isList" width="90">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isList`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isList"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isList) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="查询" prop="isQuery" width="90">
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isQuery`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElSwitch
                  v-model="row.isQuery"
                />
              </ElFormItem>
              <span v-else>{{ formatterIsNot(row.isQuery) }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="宽度" prop="width" width="100">
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.width`"
              >
                <ElInputNumber
                  v-model="row.width"
                  controls-position="right"
                />
              </ElFormItem>
              <span v-else>{{ row.width }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="查询方式" min-width="140" prop="queryType">
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.queryType`"
              >
                <ElAutocomplete
                  v-model="row.queryType"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'queryType')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </ElFormItem>
              <span v-else>{{ row.queryType }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="组件" min-width="140" prop="component" show-overflow-tooltip>
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.component`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElInput v-model="row.component" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.component }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Vxe组组件" min-width="140" prop="vxeComponent" show-overflow-tooltip>
          <template #header="{ column }">
            <i class="required-icon align-middle" />
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.vxeComponent`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <ElInput v-model="row.vxeComponent" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.vxeComponent }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="字典类型" min-width="140" prop="dictType" show-overflow-tooltip>
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.dictType`"
              >
                <ElInput v-model="row.dictType" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.dictType }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Echo" min-width="100" prop="echoStr" show-overflow-tooltip>
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.echoStr`"
              >
                <ElInput v-model="row.echoStr" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.echoStr }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="枚举" min-width="100" prop="enumStr" show-overflow-tooltip>
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.enumStr`"
              >
                <ElInput v-model="row.enumStr" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.enumStr }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="默认值" min-width="100" prop="editDefValue">
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.editDefValue`"
              >
                <ElInput v-model="row.editDefValue" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.editDefValue }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="提示信息" min-width="100" prop="editHelpMessage" show-overflow-tooltip>
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.editHelpMessage`"
              >
                <ElInput v-model="row.editHelpMessage" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.editHelpMessage }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="主页提示信息" min-width="140" prop="indexHelpMessage" show-overflow-tooltip>
          <template #header="{ column }">
            <SvgIcon class="mr-1 align-middle" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <ElFormItem
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.indexHelpMessage`"
              >
                <ElInput v-model="row.indexHelpMessage" placeholder="请输入" />
              </ElFormItem>
              <span v-else>{{ row.indexHelpMessage }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="排序" prop="sortValue" sortable="custom" />
        <ElTableColumn align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <ElTableColumn align="center" fixed="right" label="操作" width="186">
          <template #default="scope">
            <ElButton
              v-if="editData?.id !== scope.row.id" plain size="small" title="修改" type="primary"
              @click="() => onEdit(scope.row)"
            >
              <SvgIcon name="ep:edit" />
            </ElButton>
            <ElButton
              v-if="editData?.id === scope.row.id" plain size="small" title="取消" type="primary"
              @click="onCancel(scope.row)"
            >
              <SvgIcon name="ep:circle-close" />
            </ElButton>
            <ElButton
              v-if="editData?.id === scope.row.id" plain size="small" title="保存" type="primary"
              @click="onSave(scope.row)"
            >
              <SvgIcon name="ep:document-checked" />
            </ElButton>
            <ElButton plain size="small" title="删除" type="danger" @click="onDel(scope.row)">
              <SvgIcon name="ep:delete" />
            </ElButton>
            <ElButton plain size="small" title="同步" type="primary" @click="onSync(scope.row)">
              <SvgIcon name="ant-design:cloud-sync-outlined" />
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElForm>
    <ElPagination
      :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
      :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
      background class="pagination" @size-change="sizeChange" @current-change="currentChange"
    />
  </PageMain>
  <template v-else>
    <span>批量操作暂不支持修改字段，如果确实需要个性化修改字典配置，请单个修改后在生成！</span>
  </template>
</template>

<style lang="scss" scoped>
.column-info {
  .el-button + .el-button {
    margin-left: 4px;
  }

  .required-icon {
    position: relative;
    display: inline-block;
    width: 0.8em;
    height: 1em;
    font-family: var(--vxe-icon-font-family);
    font-weight: 400;
    line-height: 1em;
    color: var(--vxe-table-validate-error-color);

    &::after {
      position: absolute;
      top: 0.1em;
      left: 0;
      color: var(--el-color-danger);
      content: "*";
    }
  }

  .edit-column {
    .el-form-item {
      margin-bottom: 0;
    }

    &.col--dirty::before {
      position: absolute;
      top: -5px;
      left: -5px;
      content: "";
      border-color: transparent #f56c6c transparent transparent;
      border-style: solid;
      border-width: 5px;
      transform: rotate(45deg);
    }
  }
}
</style>
