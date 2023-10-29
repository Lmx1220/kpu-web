<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findEnumListByType } from '@/api/modules/common/dict'
import type { OptLogPageQuery } from '@/api/modules/system/model/optLogModel'
import crudOptLog from '@/api/modules/system/optLog'
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'

defineOptions({
  name: 'SystemOptLogList',
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
  type: '',
  description: '',
  nickName: '',
  classPath: '',
  requestUri: '',
  requestIp: '',
  daterange: [],
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
  formMode: 'drawer',
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
  dicts: new Map<string, Option[]>(),
})

const table = ref<InstanceType<typeof ElTable>>()

onMounted(() => {
  getDict()
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
  const params = getParams<OptLogPageQuery>({
    ...data.value.search,
  },
  {
    type: 'daterange',
    name: 'daterange',
    prop: 'createdTime',
  },
  )
  // if (data.value.daterange) {
  //   params.extra.createdTime_st = data.value.daterange[0]
  //   params.extra.createdTime_ed = data.value.daterange[1]
  // }
  const res = await crudOptLog.list(params)
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

function filterChange(filters: any) {
  const { queryParams } = toValue(data)
  for (const key in filters) {
    if (key.includes('.')) {
      queryParams.model[key.split('.')[0]] = filters[key]
    }
    else {
      queryParams.model[key] = filters[key]
    }
    if (key === 'state') {
      queryParams.model[key] = filters[key][0]
    }
  }

  getDataList(1)
}

function onAdd() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemOptLogCreate',
      query: {
        type: 'add',
      },
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'add'
  }
}

function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemOptLogEdit',
      params: {
        id: row.id,
      },
      query: {
        type: 'edit',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'edit'
  }
}

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemOptLogDetail',
      params: {
        id: row.id,
      },
      query: {
        type: 'view',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'view'
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
    crudOptLog.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

function onCommand(type: number) {
  ElMessageBox.confirm('确认要清理数据吗？').then(() => {
    crudOptLog.clear(type).then(() => {
      getDataList(1)
      ElMessage.success({
        message: '清理成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

async function getDict() {
  const options: DictOption = await findEnumListByType([{
    type: 'LogType',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="登录日志" />
    <page-main>
      <search-bar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <el-form
            :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
            size="default"
          >
            <el-form-item label="日志类型">
              <el-select
                v-model="data.search.type" clearable placeholder="请选择" size="default"
                @change="currentChange()"
              >
                <el-option
                  v-for="item in data.dicts.get('LogType') || []" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="操作描述">
              <el-input
                v-model="data.search.description" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item label="操作人">
              <el-input
                v-model="data.search.nickName" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="类路径">
              <el-input
                v-model="data.search.classPath" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="请求地址">
              <el-input
                v-model="data.search.requestUri" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="操作IP">
              <el-input
                v-model="data.search.requestIp" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item v-show="!fold" label="创建时间">
              <el-date-picker
                v-model="data.search.daterange"
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
        <el-dropdown trigger="click" @command="onCommand">
          <el-button size="default">
            清除日志
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="1">
                保留一个月
              </el-dropdown-item>
              <el-dropdown-item :command="2">
                保留三个月
              </el-dropdown-item>
              <el-dropdown-item :command="3">
                保留六个月
              </el-dropdown-item>
              <el-dropdown-item :command="4">
                保留一年
              </el-dropdown-item>
              <el-dropdown-item :command="5">
                保留一千条
              </el-dropdown-item>
              <el-dropdown-item :command="6">
                保留一万条
              </el-dropdown-item>
              <el-dropdown-item :command="7">
                保留三万条
              </el-dropdown-item>
              <el-dropdown-item :command="8">
                保留十万条
              </el-dropdown-item>
              <el-dropdown-item :command="9">
                清空所有
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%"
        highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
        <el-table-column align="center" label="序号" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作IP" prop="requestIp" width="150" />
        <el-table-column align="center" label="日志类型" prop="type" width="150">
          <template #default="{ row }">
            {{ row.echoMap.type }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作描述" prop="description" show-overflow-tooltip width="150" />
        <el-table-column align="center" label="请求方法" prop="classPath" show-overflow-tooltip width="150">
          <template #default="{ row }">
            {{ `${row.classPath}#${row.actionMethod}` }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="请求地址" prop="requestUri" show-overflow-tooltip width="150" />
        <el-table-column align="center" label="消耗时间" prop="consumingTime" width="120" />
        <el-table-column align="center" label="请求类型" prop="httpMethod" width="120" />
        <el-table-column align="center" label="开始时间" prop="startTime" width="180" />
        <el-table-column align="center" label="完成时间" prop="finishTime" width="180" />
        <el-table-column align="center" label="浏览器" prop="ua" show-overflow-tooltip width="150" />
        <el-table-column align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button size="small" text type="primary" @click="onView(scope.row)">
              <template #icon>
                <svg-icon name="ep:view" />
              </template>
            </el-button>
            <el-divider direction="vertical" />
            <el-button size="small" text type="danger" @click="onDel(scope.row)">
              <template #icon>
                <svg-icon name="ep:delete" />
              </template>
            </el-button>
          </template>
        </el-table-column>
      </ElTable>
      <el-pagination
        :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
        :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
        background class="pagination" @size-change="sizeChange" @current-change="currentChange"
      />
    </page-main>
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

  > .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
