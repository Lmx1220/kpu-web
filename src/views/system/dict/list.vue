<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import DictItem from './DictItem.vue'
import crudDict from '@/api/modules/system/dict'
import type { DictParams } from '@/api/modules/system/model/dictModel'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'

defineOptions({
  name: 'SystemDictList',
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

const data = ref({
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
    classify: '',
    key: '',
    name: '',
    remark: '',
  },
  searchFold: true,
  // 批量操作
  batch: {
    enable: true,
    selectionData: {} as { id?: string },
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
  const params = getParams<DictParams>({
    ...data.value.search,
  })
  const res = await crudDict.list(params)
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

function onCreate() {
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
    ids = data.value.batch.selectionDataList.map(item => item.id) as string[]
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudDict.delete(ids).then(() => {
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
    <page-header title="字典管理" />
    <div class="page-main">
      <LayoutContainer right-side-width="60%">
        <search-bar :fold="data.searchFold" :show-toggle="false">
          <template #default>
            <el-form
              :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
              size="default"
            >
              <el-form-item label="标识">
                <el-input
                  v-model="data.search.key" clearable placeholder="请输入标识，支持模糊查询"
                  @clear="currentChange()"
                  @keydown.enter="currentChange()"
                />
              </el-form-item>
              <el-form-item label="名称">
                <el-input
                  v-model="data.search.name" clearable placeholder="请输入名称，支持模糊查询"
                  @clear="currentChange()"
                  @keydown.enter="currentChange()"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="currentChange()">
                  <template #icon>
                    <el-icon>
                      <svg-icon name="ep:search" />
                    </el-icon>
                  </template>
                  筛选
                </el-button>
              </el-form-item>
            </el-form>
          </template>
        </search-bar>
        <el-divider border-style="dashed" />
        <el-space wrap>
          <el-button size="default" type="primary" @click="onCreate">
            <template #icon>
              <el-icon>
                <svg-icon name="ep:plus" />
              </el-icon>
            </template>
            新增
          </el-button>
          <el-button :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
            <template #icon>
              <el-icon>
                <svg-icon name="ep:delete" />
              </el-icon>
            </template>
            删除
          </el-button>
        </el-space>
        <ElTable
          ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%" highlight-current-row
          stripe @sort-change="sortChange"
          @current-change="data.batch.selectionData = $event || {}"
          @selection-change="data.batch.selectionDataList = $event"
        >
          <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
          <el-table-column align="center" label="序号" width="100">
            <template #default="{ $index }">
              {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="状态" prop="state" width="80">
            <template #default="{ row }">
              <el-tag :type="row.state ? 'success' : 'danger'">
                {{ row.state ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button plain size="small" type="primary" @click.stop="onEdit(scope.row)">
                编 辑
              </el-button>
              <el-button plain size="small" type="danger" @click.stop="onDel(scope.row)">
                删 除
              </el-button>
            </template>
          </el-table-column>
        </ElTable>
        <el-pagination
          :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
          :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total" background
          class="pagination" @size-change="sizeChange" @current-change="currentChange"
        />
        <template #rightSide>
          <DictItem :id="data.batch.selectionData.id" :current-data="data.batch.selectionData" />
        </template>
      </LayoutContainer>
    </div>
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
    display: flex;
    flex-direction: column;

    .flex-container {
      position: static;

      :deep(.main-container) {
        overflow: auto;
        display: flex;
        flex-direction: column;
      }

      :deep(.right-side) {
        height: 100%;
        display: flex;
        flex-direction: column;

        > .empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--el-text-color-placeholder);
        }
      }
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

}
</style>
