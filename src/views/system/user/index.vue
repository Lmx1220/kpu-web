<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import BindRoleMode from './components/BindRoleMode.vue'
import FormMode from './components/FormMode/index.vue'
import type { DataConfig } from '#/global'
import type { UserPageQuery } from '@/api/modules/system/model/userModel'
import crudUser from '@/api/modules/system/user'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'
import { ActionEnum } from '@/enums/commonEnum.ts'

defineOptions({
  name: 'SystemUserList',
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
  searchFold: true,
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
  const params = getParams<UserPageQuery>({
    ...data.value.search,
  },
  {
    type: 'daterange',
    name: 'daterange',
    prop: 'createdTime',
  },
  )
  const res = await crudUser.page(params)
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
        type: ActionEnum.EDIT,
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
    crudUser.remove(ids).then(() => {
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

function onResetPassword(row: any) {
  // console.log(row)
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="用户管理" />
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
            <ElFormItem label="用户账号">
              <ElInput
                v-model="data.search.username" clearable placeholder="请输入用户账号，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem label="昵称">
              <ElInput
                v-model="data.search.nickName" clearable placeholder="请输入昵称，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
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
              <ElButton type="primary" @click="resetQuery()">
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
        <ElButton size="default" type="primary" @click="onAdd">
          <template #icon>
            <SvgIcon name="ep:plus" />
          </template>
          新增
        </ElButton>
        <ElButton :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
          删除
        </ElButton>
      </ElSpace>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" class="my-4"
        height="100%"

        highlight-current-row stripe border @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />
        <ElTableColumn align="center" label="序号" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </ElTableColumn>
        <ElTableColumn align="center" label="用户账号" prop="username" />
        <ElTableColumn align="center" label="名称" prop="nickName" />
        <ElTableColumn align="center" label="邮箱" prop="email" />
        <ElTableColumn align="center" label="手机号" prop="mobile" />
        <ElTableColumn align="center" column-key="sex" label="性别" prop="sex" sortable="custom">
          <template #default="{ row }">
            {{ row.echoMap.sex }}
          </template>
        </ElTableColumn>
        <ElTableColumn align="center" label="状态" prop="state">
          <template #default="{ row }">
            <ElTag :type="row.state ? 'success' : 'danger'">
              {{ row.state ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <ElTableColumn align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <ElButton plain size="small" type="primary" @click="onView(scope.row)">
              查 看
            </ElButton>
            <ElButton plain size="small" type="primary" @click="onBindRoles(scope.row)">
              绑定角色
            </ElButton>
            <ElDropdown>
              <SvgIcon class="ml-1 mr-1" flip="both" name="ep:more-filled" />
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem command="edit" @click.stop="onEdit(scope.row)">
                    编辑
                  </ElDropdownItem>
                  <ElDropdownItem command="resetPassword" divided @click.stop="onResetPassword(scope.row)">
                    重置密码
                  </ElDropdownItem>
                  <ElDropdownItem command="del" divided @click.stop="onDel(scope.row)">
                    删除
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
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
      v-model="data.formModeProps.visible" :mode="data.formMode" :type="data.formModeProps.type"
      @success="getDataList"
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

  .el-divider {
    width: calc(100% + 40px);
    margin-inline: -20px;
  }

  .el-dropdown {
    vertical-align: middle;
  }
}
</style>
