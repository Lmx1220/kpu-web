<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import type { DataConfig } from '#/global'
import crudDictItem from '@/api/modules/system/dictItem'
import type { DictItemPageQuery } from '@/api/modules/system/model/dictItemModel'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'

interface Props {
  id?: string
  currentData?: { [key: string]: any }
}

defineOptions({
  name: 'SystemDictItemList',
})

const props = withDefaults(defineProps<Props>(), {
  id: '',
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
    parentId: '',
    classify: '',
    key: '',
    name: '',
    remark: '',
  },
  searchFold: true,
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],
})
// 监听id
watch(() => props.id, () => {
  if (props.id) {
    data.value.search.parentId = props.id
    getDataList(1)
  }
})

const table = ref<InstanceType<typeof ElTable>>()

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
  const params = getParams<DictItemPageQuery>({
    ...data.value.search,
  })
  if (!params.sort) {
    params.sort = 'sortValue'
    params.order = 'ascend'
  }
  const res = await crudDictItem.page(params)
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
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
  }
}

function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'routerName',
      params: {
        id: row.id,
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
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
    crudDictItem.remove(ids).then(() => {
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
  <template v-if="id">
    <SearchBar :fold="data.searchFold" :show-toggle="false">
      <template #default>
        <ElForm
          :model="data.search" class="search-form" inline-message inline label-suffix="：" label-width="100px"
          size="default"
        >
          <ElFormItem label="标识">
            <ElInput
              v-model="data.search.key" clearable placeholder="请输入标识，支持模糊查询"
              @clear="currentChange()"
              @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput
              v-model="data.search.name" clearable placeholder="请输入名称，支持模糊查询"
              @clear="currentChange()"
              @keydown.enter="currentChange()"
            />
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" @click="currentChange()">
              <template #icon>
                <SvgIcon name="ep:search" />
              </template>
              筛选
            </ElButton>
          </ElFormItem>
        </ElForm>
      </template>
    </SearchBar>
    <ElDivider border-style="dashed" />
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
      ref="table" v-loading="data.loading" :data="data.dataList" class="list-table" height="100%"
      stripe highlight-current-row border @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
    >
      <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />
      <ElTableColumn align="center" label="序号" width="100">
        <template #default="{ $index }">
          {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
        </template>
      </ElTableColumn>
      <ElTableColumn align="center" label="标识" prop="key" />
      <ElTableColumn align="center" label="名称" prop="name" />
      <ElTableColumn align="center" label="状态" prop="state" width="80">
        <template #default="{ row }">
          <ElTag :type="row.state ? 'success' : 'danger'">
            {{ row.state ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn align="center" label="排序" prop="sortValue" sortable="custom" width="100" />
      <ElTableColumn align="center" fixed="right" label="操作" width="150">
        <template #default="scope">
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
      :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total" background
      class="pagination" @size-change="sizeChange" @current-change="currentChange"
    />
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible"
      :current-data="currentData"
      :mode="data.formMode" :parent-id="id" @success="getDataList"
    />
  </template>
  <div v-else class="empty">
    请在左侧点击一行表格
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

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
</style>
