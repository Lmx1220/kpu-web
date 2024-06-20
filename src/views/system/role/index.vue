<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import type { RolePageQuery } from '@/api/modules/system/model/roleModel'
import crudRole from '@/api/modules/system/role'
import { getCategoryColor } from '@/enums/colorEnum'
import stautsEnum from '@/enums/stautsEnum'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination'
import BindUserMode from '@/views/system/role/components/BindUserMode.vue'
import FormMode from '@/views/system/role/components/FormMode/index.vue'
import MenuTree from '@/views/system/role/components/MenuTree.vue'
import type { DataConfig } from '@/types/global'
import { ActionEnum } from '@/enums/commonEnum.ts'
import { asyncFindDictList } from '@/api/modules/common/general.ts'

defineOptions({
  name: 'SystemRoleList',
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
  formMode: 'dialog',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search: {
    name: '',
    category: '',
  },
  searchFold: false,
  current: {},
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

function getDataList() {
  data.value.loading = true
  const params = getParams<RolePageQuery>({
    ...data.value.search,
  })

  crudRole.page(params).then((res) => {
    // data.value.loading = false
    data.value.dataList = get(res, 'records', [])
    pagination.value.total = Number(res.total)
    pagination.value.page = Number(get(res, 'current', 1))
    // pagination.value.size = res.size
  }).finally(() => {
    data.value.loading = false
  })
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
    crudRole.remove(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

const bindUser = ref({
  visible: false,
  id: '',
})

function onBindUsers(row: any) {
  bindUser.value.id = row.id
  bindUser.value.visible = true
}

async function getDict() {
  const options = await asyncFindDictList([{
    type: 'ROLE_CATEGORY',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="角色管理" />
    <div class="page-main">
      <LayoutContainer right-side-width="50%">
        <SearchBar :fold="data.searchFold" :show-toggle="false">
          <template #default="{ fold }">
            <ElForm
              :model="data.search" class="search-form" inline-message inline label-suffix="：" label-width="100px"
              size="default"
            >
              <ElFormItem label="名称">
                <ElInput
                  v-model="data.search.name" clearable placeholder="请输入名称，支持模糊查询" @clear="currentChange()"
                  @keydown.enter="currentChange()"
                />
              </ElFormItem>
              <ElFormItem label="角色类别">
                <ElSelect
                  v-model="data.search.category" clearable placeholder="请选择" size="default"
                  @change="currentChange()"
                >
                  <ElOption
                    v-for="item in data.dicts.get('ROLE_CATEGORY') || []" :key="item.value" :label="item.label"
                    :value="item.value"
                  />
                </ElSelect>
              </ElFormItem>
              <ElFormItem v-show="!fold" label="状态">
                <ElSelect
                  v-model="data.search.state" clearable placeholder="请选择" size="default"
                  @change="currentChange()"
                >
                  <ElOption
                    v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.label"
                    :value="item.value"
                  />
                </ElSelect>
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
          ref="table" v-loading="data.loading" :data="data.dataList" class="my-4" height="100%"
          highlight-current-row stripe border @sort-change="sortChange"
          @current-change="data.current = $event || {}"
          @selection-change="data.batch.selectionDataList = $event"
        >
          <ElTableColumn v-if="data.batch.enable" align="center" type="selection" />
          <ElTableColumn label="名称" prop="name">
            <template #default="scope">
              <ElTag :type="getCategoryColor(scope.row.category)">
                {{ scope.row.echoMap.category }}
              </ElTag>
              {{ scope.row.name }}
            </template>
          </ElTableColumn>
          <ElTableColumn align="center" label="状态" prop="state" width="80px">
            <template #default="scope">
              <ElTag v-if="scope.row.state" type="success">
                启用
              </ElTag>
              <ElTag v-else type="danger">
                禁用
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn align="center" fixed="right" label="操作" width="250">
            <template #default="scope">
              <ElButton plain size="small" type="primary" @click="onView(scope.row)">
                <template #icon>
                  <SvgIcon name="ep:view" />
                </template>
              </ElButton>
              <ElButton plain size="small" type="primary" @click="onEdit(scope.row)">
                <template #icon>
                  <SvgIcon name="ep:edit" />
                </template>
              </ElButton>
              <ElDivider direction="vertical" />
              <ElButton plain size="small" type="danger" @click="onDel(scope.row)">
                <template #icon>
                  <SvgIcon name="ep:delete" />
                </template>
              </ElButton>
              <ElDivider direction="vertical" />
              <ElButton size="small" plain text bg type="primary" @click="onBindUsers(scope.row)">
                绑定用户
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
        <ElPagination
          :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
          :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total" background
          class="pagination" @size-change="sizeChange" @current-change="currentChange"
        />
        <template #rightSide>
          <MenuTree :data="data.current" />
        </template>
      </LayoutContainer>
    </div>
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id || ''"
      v-model="data.formModeProps.visible"
      :mode="data.formMode" :type="data.formModeProps.type" @success="getDataList"
    />
    <BindUserMode :id="bindUser.id" v-model="bindUser.visible" @success="getDataList" />
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

    .flex-container {
      position: static;

      :deep(.main-container) {
        display: flex;
        flex-direction: column;
        overflow: auto;
      }

      :deep(.right-side) {
        display: flex;
        flex-direction: column;
        height: 100%;

        .empty {
          display: flex;
          flex: 1;
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

  // .el-divider {
  // margin-inline:-20px;width: calc(100% + 40px);
  // }
}
</style>
