<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import type { DataConfig } from '#/global'
import crudGenerator from '@/api/modules/tools/genTableColumn'
import type { GeneratorParams } from '@/api/modules/tools/model/generatorModel'
import { deepClone } from '@/util'
import usePagination from '@/util/usePagination'

const props = withDefaults(defineProps<Props>(), {
  id: '',
})
defineOptions({
  name: 'ColumnInfo',
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
const router = useRouter()
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
data.value.dicts.set('isNot', [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
])
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
  const params = getParams<GeneratorParams>({
    ...data.value.search,
  })
  params.model.tableId = props.id
  const res = await crudGenerator.list(params)
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
//       type: 'EntitySuperClassEnum',
//       extendFirst: true,
//     },
//     {
//       type: 'SuperClassEnum',
//       extendFirst: true,
//     },
//     {
//       type: 'GenTypeEnum',
//       extendFirst: true,
//     },
//     {
//       type: 'PopupTypeEnum',
//       extendFirst: true,
//     },
//     {
//       type: 'TplEnum',
//       extendFirst: true,
//     },
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
  crudGenerator.edit(row).then(() => {
    onCancel(row)
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
    crudGenerator.delete(ids).then(() => {
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
    crudGenerator.syncField({ tableId: props.id as string, id: row.id }).then(() => {
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

function formatterIsNot(isNot: boolean) {
  return data.value.dicts?.get('isNot').find((item: any) => item.value === isNot)?.label
}
</script>

<template>
  <page-main v-if="isSingle" class="column-info">
    <search-bar
      :fold="data.searchFold"
      :show-toggle="false"
    >
      <template #default="{ fold }">
        <el-form
          :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
          size="default"
        >
          <el-form-item label="列名称">
            <el-input
              v-model="data.search.name" clearable placeholder="请输入，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </el-form-item>
          <el-form-item label="列描述">
            <el-input
              v-model="data.search.comment" clearable placeholder="请输入，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="currentChange()">
              <template #icon>
                <svg-icon name="ep:search" />
              </template>
              筛选
            </el-button>
            <el-button type="primary" @click="resetQuery(defaultQuery)">
              重置
            </el-button>
            <el-button link type="primary" @click="data.searchFold = !fold">
              <template #icon>
                <svg-icon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
              </template>
              {{ fold ? '展开' : '收起' }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </search-bar>
    <el-divider border-style="dashed" />
    <el-space wrap>
      <el-button :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
        <template #icon>
          <svg-icon name="ep:delete" />
        </template>
        删除
      </el-button>
    </el-space>
    <el-form :model="data">
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%" highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
        <el-table-column align="center" fixed label="#" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column fixed label="列名称" prop="name" width="370" />
        <el-table-column fixed label="列类型" prop="type" width="100" />
        <el-table-column label="列描述" prop="comment" width="800">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.column`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-input v-model="row.comment" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.comment }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文档描述" prop="swaggerComment" width="140">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.swaggerComment`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-input v-model="row.swaggerComment" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.swaggerComment }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="JAVA类型" prop="javaType" width="150">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.javaType`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-autocomplete
                  v-model="row.javaType"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'javaType')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </el-form-item>
              <span v-else>{{ row.javaType }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="JAVA字段名" min-width="150" prop="javaField">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.javaField`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-input v-model="row.javaField" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.javaField }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="TS类型" min-width="100" prop="tsType">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.tsType`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-autocomplete
                  v-model="row.tsType"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'tsType')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </el-form-item>
              <span v-else>{{ row.tsType }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="长度" prop="size" width="100">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.size`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-input-number
                  v-model="row.size"
                  controls-position="right"
                />
              </el-form-item>
              <span v-else>{{ row.size }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="主键" prop="isPk" width="90">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isPk`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isPk"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isPk) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="必填" prop="isRequired" width="90">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isRequired`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isRequired"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isRequired) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="逻辑删除" prop="isLogicDeleteField" width="120">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isLogicDeleteField`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isLogicDeleteField"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isLogicDeleteField) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="乐观锁" prop="isVersionField" width="100">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isVersionField`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isVersionField"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isVersionField) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="自增" prop="isIncrement" width="90">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isIncrement`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isIncrement"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isIncrement) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="填充类型" prop="fill" width="120">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.fill`"
              >
                <el-autocomplete
                  v-model="row.fill"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'fill')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </el-form-item>
              <span v-else>{{ row.fill }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="编辑" prop="isEdit" width="90">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isEdit`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isEdit"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isEdit) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="列表" prop="isList" width="90">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isList`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isList"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isList) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="查询" prop="isQuery" width="90">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.isQuery`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-switch
                  v-model="row.isQuery"
                />
              </el-form-item>
              <span v-else>{{ formatterIsNot(row.isQuery) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="宽度" prop="width" width="100">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.width`"
              >
                <el-input-number
                  v-model="row.width"
                  controls-position="right"
                />
              </el-form-item>
              <span v-else>{{ row.width }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="查询方式" min-width="140" prop="queryType">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.queryType`"
              >
                <el-autocomplete
                  v-model="row.queryType"
                  :fetch-suggestions="(queryString: string, cb: any) => querySearch(queryString, cb, 'queryType')"
                  :select-when-unmatched="true"
                  class="inline-input w-50"
                  clearable
                  highlight-first-item
                  placeholder="Please Input"
                />
              </el-form-item>
              <span v-else>{{ row.queryType }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="组件" min-width="100" prop="component">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.component`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-input v-model="row.component" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.component }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Vxe组组件" min-width="140" prop="vxeComponent">
          <template #header="{ column }">
            <i class="align-middle required-icon" />
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.vxeComponent`" :rules="[{
                  required: true,
                  message: '请输入',
                  trigger: 'blur',
                }]"
              >
                <el-input v-model="row.vxeComponent" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.vxeComponent }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="字典类型" min-width="100" prop="dictType">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.dictType`"
              >
                <el-input v-model="row.dictType" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.dictType }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Echo" min-width="100" prop="echoStr">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.echoStr`"
              >
                <el-input v-model="row.echoStr" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.echoStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="枚举" min-width="100" prop="enumStr">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.enumStr`"
              >
                <el-input v-model="row.enumStr" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.enumStr }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="默认值" min-width="100" prop="editDefValue">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.editDefValue`"
              >
                <el-input v-model="row.editDefValue" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.editDefValue }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="提示信息" min-width="100" prop="editHelpMessage">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.editHelpMessage`"
              >
                <el-input v-model="row.editHelpMessage" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.editHelpMessage }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="主页提示信息" min-width="140" prop="indexHelpMessage">
          <template #header="{ column }">
            <svg-icon class="align-middle mr-1" name="ep:edit" />
            <span>  {{ column.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <div class="edit-column">
              <el-form-item
                v-if="row.id === editData?.id" :prop="`dataList.${$index}.indexHelpMessage`"
              >
                <el-input v-model="row.indexHelpMessage" placeholder="请输入" />
              </el-form-item>
              <span v-else>{{ row.indexHelpMessage }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sortValue" sortable="custom" />
        <el-table-column align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <el-table-column align="center" fixed="right" label="操作" width="186">
          <template #default="scope">
            <el-button
              v-if="editData?.id !== scope.row.id" plain size="small" title="修改" type="primary"
              @click="() => onEdit(scope.row)"
            >
              <svg-icon name="ep:edit" />
            </el-button>
            <el-button
              v-if="editData?.id === scope.row.id" plain size="small" title="取消" type="primary"
              @click="onCancel(scope.row)"
            >
              <svg-icon name="ep:circle-close" />
            </el-button>
            <el-button
              v-if="editData?.id === scope.row.id" plain size="small" title="保存" type="primary"
              @click="onSave(scope.row)"
            >
              <svg-icon name="ep:document-checked" />
            </el-button>
            <el-button plain size="small" title="删除" type="danger" @click="onDel(scope.row)">
              <svg-icon name="ep:delete" />
            </el-button>
            <el-button plain size="small" title="同步" type="primary" @click="onSync(scope.row)">
              <svg-icon name="ant-design:cloud-sync-outlined" />
            </el-button>
          </template>
        </el-table-column>
      </ElTable>
    </el-form>
    <el-pagination
      :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
      :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
      background class="pagination" @size-change="sizeChange" @current-change="currentChange"
    />
  </page-main>
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
    display: inline-block;
    color: var(--vxe-table-validate-error-color);
    width: 0.8em;
    height: 1em;
    line-height: 1em;
    font-family: var(--vxe-icon-font-family);
    font-weight: 400;
    position: relative;

    &::after {
      content: "*";
      position: absolute;
      left: 0;
      top: 0.1em;
      color: var(--el-color-danger);

    }
  }

  .edit-column {
    //display: flex;
    //align-items: center;
    //justify-content: center;
    .el-form-item {
      margin-bottom: 0;
    }

    &.col--dirty:before {
      content: "";
      top: -5px;
      left: -5px;
      position: absolute;
      border-width: 5px;
      border-style: solid;
      border-color: transparent #f56c6c transparent transparent;
      transform: rotate(45deg);
    }

  }

}
</style>
