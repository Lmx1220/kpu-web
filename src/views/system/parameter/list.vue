<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import type { ParameterPageQuery } from '@/api/modules/system/model/parameterModel'
import crudParameter from '@/api/modules/system/parameter'
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'SystemParameterList',
})
const {
  pagination,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
} = usePagination()
const router = useRouter()
// const route = useRoute()

const data = ref<DataConfig>({
  loading: false,
  tableAutoHeight: true,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'drawer',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search: {
    name: '',
    key: '',
    value: '',
  },
  daterange: [],
  searchFold: false,
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
})

const table = ref<InstanceType<typeof ElTable>>()

onMounted(() => {
  getDataList()
  if (data.value.formMode === 'router') {
    eventBus.on('get-data-list', () => {
      getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (data.value.formMode === 'router') {
    eventBus.off('get-data-list')
  }
})

async function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  const params = getParams<ParameterPageQuery>({
    ...data.value.search,
  })
  if (data.value.daterange) {
    params.extra.createdTime_st = data.value.daterange[0]
    params.extra.createdTime_ed = data.value.daterange[1]
  }
  const res = await crudParameter.page(params)
  data.value.dataList = get(res, 'records', [])
  pagination.value.total = Number(res.total)
  pagination.value.page = Number(get(res, 'current', 1))
  // pagination.value.size = res.size
  setTimeout(() => {
    data.value.loading = false
  }, 100)
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange({
  prop,
  order,
}: any) {
  onSortChange(prop, order).then(() => getDataList())
}

function onAdd() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'routerName',
      params: {
        type: ActionEnum.ADD,
      },
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.ADD
  }
}

function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'routerName',
      params: {
        id: row.id,
        type: 'edit',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.EDIT
  }
}

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'routerName',
      params: {
        id: row.id,
        type: ActionEnum.VIEW,
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.VIEW
  }
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
    crudParameter.remove(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="参数配置" />
    <PageMain>
      <SearchBar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <ElForm
            :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
            size="default"
          >
            <ElFormItem label="参数名称">
              <ElInput
                v-model="data.search.name" clearable placeholder="请输入参数名称，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="参数键">
              <ElInput
                v-model="data.search.key" clearable placeholder="请输入参数键，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="参数值">
              <ElInput
                v-model="data.search.value" clearable placeholder="请输入参数值，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="创建时间">
              <ElDatePicker
                v-model="data.daterange"
                :default-time="[
                  new Date(2000, 1, 1, 0, 0, 0),
                  new Date(2000, 2, 1, 23, 59, 59),
                ]"
                end-placeholder="结束时间"
                range-separator=":"
                start-placeholder="开始时间"
                style="width: 250px;"
                type="daterange"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="ep:search" />
                </template>
                筛选
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
      <ElDivider border-style="dashed" class="my-4" />
      <ElSpace wrap>
        <ElButton size="default" type="primary" @click="onAdd">
          <template #icon>
            <SvgIcon name="ep:plus" />
          </template>
          新增
        </ElButton>
        <ElButton :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
          <template #icon>
            <SvgIcon name="ep:delete" />
          </template>
          删除
        </ElButton>
      </ElSpace>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="my-4" height="100%" highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />
        <ElTableColumn align="center" label="参数名称" prop="name" />
        <ElTableColumn align="center" label="参数键" prop="key" />
        <ElTableColumn align="center" label="参数值" prop="value" />
        <ElTableColumn align="center" label="状态" prop="state" width="80">
          <template #default="{ row }">
            <ElTag :type="row.state ? 'success' : 'danger'">
              {{ row.state ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn align="center" label="备注" prop="remarks" show-overflow-tooltip width="250" />
        <ElTableColumn align="center" label="创建时间" prop="createdTime" sortable="custom" />
        <ElTableColumn align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <ElButton plain size="small" type="primary" @click="onView(scope.row)">
              查 看
            </ElButton>
            <ElButton plain size="small" type="primary" @click="onEdit(scope.row)">
              编 辑
            </ElButton>
            <ElButton plain size="small" type="danger" @click="onDel(scope.row)">
              删 除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination
        :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
        :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
        background class="pagination" @size-change="sizeChange" @current-change="currentChange"
      />
    </PageMain>
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList"
    />
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

    .search-container {
      margin-bottom: 0;
    }
  }
}

.page-main {
  .search-form {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -18px;

    :deep(.el-form-item) {
      flex: 1 1 300px;

      &:last-child {
        margin-left: auto;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
