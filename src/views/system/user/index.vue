<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import BindRoleMode from './components/BindRoleMode.vue'
import FormMode from './components/FormMode/index.vue'
import type { UserParams } from '@/api/modules/system/model/userModel'
import crudUser from '@/api/modules/system/user'
import eventBus from '@/util/eventBus'

import usePagination from '@/util/usePagination.js'

defineOptions({
  name: 'SystemUserList',
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
    username: '',
    nickName: '',
    email: '',
    mobile: '',
    createTime_st: '',
    createTime_ed: '',
  },
  daterange: undefined,
  searchFold: true,
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [] as { id: string }[],
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
  const params = getParams<UserParams>({
    ...data.value.search,
  })
  if (data.value.daterange) {
    params.extra.createTime_st = data.value.daterange[0]
    params.extra.createTime_ed = data.value.daterange[1]
  }
  const res = await crudUser.list(params)
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
  onSortChange(prop, order).then(() => {
    getDataList()
  },
  )
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
    crudUser.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

const bindRole = ref({
  visible: false,
  id: '',
})

function onBindRoles(row: any) {
  bindRole.value.id = row.id
  bindRole.value.visible = true
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="用户管理" />
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
            <el-form-item label="用户账号">
              <el-input
                v-model="data.search.username" clearable placeholder="请输入用户账号，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input
                v-model="data.search.nickName" clearable placeholder="请输入昵称，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </el-form-item>
            <!-- <el-form-item label="邮箱">
              <el-input
                v-model="data.search.email" placeholder="请输入邮箱，支持模糊查询" clearable
                @keydown.enter="currentChange()" @clear="currentChange()"
              />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input
                v-model="data.search.mobile" placeholder="请输入手机号，支持模糊查询" clearable
                @keydown.enter="currentChange()" @clear="currentChange()"
              />
            </el-form-item> -->
            <el-form-item v-show="!fold" label="创建时间">
              <el-date-picker
                v-model="data.daterange"
                :default-time="[
                  new Date(2000, 1, 1, 0, 0, 0),
                  new Date(2000, 2, 1, 23, 59, 59),
                ]"
                end-placeholder="结束时间"
                range-separator=":"
                start-placeholder="开始时间"
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
        <el-button size="default" type="primary" @click="onCreate">
          <template #icon>
            <svg-icon name="ep:plus" />
          </template>
          新增
        </el-button>
        <el-button :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
          删除
        </el-button>
      </el-space>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table"
        height="100%"
        highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
        <el-table-column align="center" label="序号" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户账号" prop="username" />
        <el-table-column align="center" label="名称" prop="nickName" />
        <el-table-column align="center" label="邮箱" prop="email" />
        <el-table-column align="center" label="手机号" prop="mobile" />
        <el-table-column align="center" column-key="sex" label="性别" prop="sex" sortable="custom">
          <template #default="{ row }">
            {{ row.echoMap.sex }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="state">
          <template #default="{ row }">
            <el-tag :type="row.state ? 'success' : 'danger'">
              {{ row.state ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime" sortable="custom" />
        <el-table-column align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="onEdit(scope.row)">
              编 辑
            </el-button>
            <el-button plain size="small" type="primary" @click="onBindRoles(scope.row)">
              绑定角色
            </el-button>
            <el-button plain size="small" type="danger" @click="onDel(scope.row)">
              删 除
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
    <BindRoleMode :id="bindRole.id" v-model="bindRole.visible" @success="getDataList" />
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

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
