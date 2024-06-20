<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import crudLoginLog, { clear } from '@/api/modules/system/loginLog'
import type { LoginLogPageQuery } from '@/api/modules/system/model/loginLogModel'
import type { DataConfig } from '@/types/global'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { asyncFindDictList } from '@/api/modules/common/general.ts'

defineOptions({
  name: 'SystemLoginLogList',
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
  status: '',
  requestIp: '',
  username: '',
  nickName: '',
  description: '',
  // createdTime_between: [],
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
  dicts: new Map<string, any>(),
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
  const params = getParams<LoginLogPageQuery>({
    ...data.value.search,
  },
  {
    type: 'daterange',
    name: 'daterange',
    prop: 'createdTime',
  },
  )
  const res = await crudLoginLog.page(params)
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

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'SystemLoginLogDetail',
      params: {
        id: row.id,
      },
      query: {
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
    crudLoginLog.remove(ids).then(() => {
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
    clear(type).then(() => {
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
  const options = await asyncFindDictList([{
    type: 'LoginStatusEnum',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="登录日志" />
    <PageMain>
      <SearchBar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <ElForm
            :model="data.search" class="search-form" inline-message inline label-suffix="：" label-width="100px"
            size="default"
          >
            <ElFormItem label="登录状态">
              <ElSelect
                v-model="data.search.status" clearable placeholder="请选择" size="default"
                @change="currentChange()"
              >
                <ElOption
                  v-for="item in data.dicts.get('LoginStatusEnum') || []" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="登录IP">
              <ElInput
                v-model="data.search.requestIp" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem label="登录账号">
              <ElInput
                v-model="data.search.username" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="登录昵称">
              <ElInput
                v-model="data.search.nickName" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="登录描述">
              <ElInput
                v-model="data.search.description" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="创建时间">
              <ElDatePicker
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
                @change="currentChange()"
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
      <ElDivider border-style="dashed" class="my-4" />
      <ElSpace wrap>
        <ElButton :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
          <template #icon>
            <SvgIcon name="ep:delete" />
          </template>
          删除
        </ElButton>
        <ElDropdown trigger="click" @command="onCommand">
          <ElButton size="default">
            清除日志
          </ElButton>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem :command="1">
                保留一个月
              </ElDropdownItem>
              <ElDropdownItem :command="2">
                保留三个月
              </ElDropdownItem>
              <ElDropdownItem :command="3">
                保留六个月
              </ElDropdownItem>
              <ElDropdownItem :command="4">
                保留一年
              </ElDropdownItem>
              <ElDropdownItem :command="5">
                保留一千条
              </ElDropdownItem>
              <ElDropdownItem :command="6">
                保留一万条
              </ElDropdownItem>
              <ElDropdownItem :command="7">
                保留三万条
              </ElDropdownItem>
              <ElDropdownItem :command="8">
                保留十万条
              </ElDropdownItem>
              <ElDropdownItem :command="9">
                清空所有
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </ElSpace>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" class="my-4" height="100%"

        highlight-current-row stripe border @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />
        <ElTableColumn align="center" label="序号" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </ElTableColumn>
        <ElTableColumn align="center" label="登录IP" prop="requestIp" width="150" />
        <ElTableColumn align="center" label="登录人昵称" prop="nickName" width="150" />
        <ElTableColumn align="center" label="登录人账号" prop="username" width="150" />
        <ElTableColumn align="center" label="登录描述" prop="description" width="150" />
        <ElTableColumn align="center" label="登录时间" prop="loginDate" width="120" />
        <ElTableColumn align="center" label="浏览器名称" prop="browser" width="120" />
        <ElTableColumn align="center" label="浏览器版本" prop="browserVersion" width="120" />
        <ElTableColumn align="center" label="操作系统" prop="operatingSystem" width="100" />
        <ElTableColumn align="center" label="登录地点" prop="location" width="150" />
        <ElTableColumn align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <ElTableColumn align="center" fixed="right" label="操作" width="150">
          <template #default="scope">
            <ElButton size="small" text type="primary" @click="onView(scope.row)">
              <template #icon>
                <SvgIcon name="ep:view" />
              </template>
            </ElButton>
            <ElDivider direction="vertical" />
            <ElButton size="small" text type="danger" @click="onDel(scope.row)">
              <template #icon>
                <SvgIcon name="ep:delete" />
              </template>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
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
}
</style>
