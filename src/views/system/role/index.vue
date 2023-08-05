<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'
import type { RoleParams } from '@/api/modules/system/model/roleModel'
import crudRole from '@/api/modules/system/role'
import { getCategoryColor } from '@/enums/colorEnum'
import stautsEnum from '@/enums/stautsEnum'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination'
import BindUserMode from '@/views/system/role/components/BindUserMode.vue'
import FormMode from '@/views/system/role/components/FormMode/index.vue'
import MenuTree from '@/views/system/role/components/MenuTree.vue'
import type { DataConfig } from '@/types/global'

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

function getDataList() {
  data.value.loading = true
  const params = getParams<RoleParams>({
    ...data.value.search,
  })

  crudRole.list(params).then((res) => {
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

function onCreate() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'routerName',
      params: {
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
    data.value.formModeProps.type = 'edit'
  }
}

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'routerName',
      params: {
        id: row.id,
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
    crudRole.delete(ids).then(() => {
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
  const options: DictOption = await findDictMapItemListByKey([{
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
    <page-header title="角色管理" />
    <div class="page-main">
      <LayoutContainer right-side-width="50%">
        <search-bar :fold="data.searchFold" :show-toggle="false">
          <template #default="{ fold }">
            <el-form
              :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
              size="default"
            >
              <el-form-item label="名称">
                <el-input
                  v-model="data.search.name" clearable placeholder="请输入名称，支持模糊查询" @clear="currentChange()"
                  @keydown.enter="currentChange()"
                />
              </el-form-item>
              <el-form-item label="角色类别">
                <el-select
                  v-model="data.search.category" clearable placeholder="请选择" size="default"
                  @change="currentChange()"
                >
                  <el-option
                    v-for="item in data.dicts.get('ROLE_CATEGORY') || []" :key="item.value" :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-show="!fold" label="状态">
                <el-select
                  v-model="data.search.state" clearable placeholder="请选择" size="default"
                  @change="currentChange()"
                >
                  <el-option
                    v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
            <template #icon>
              <svg-icon name="ep:delete" />
            </template>
            删除
          </el-button>
        </el-space>
        <ElTable
          ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%"
          highlight-current-row stripe @sort-change="sortChange"
          @current-change="data.current = $event || {}"
          @selection-change="data.batch.selectionDataList = $event"
        >
          <el-table-column v-if="data.batch.enable" align="center" type="selection" />
          <el-table-column label="名称" prop="name">
            <template #default="scope">
              <el-tag :type="getCategoryColor(scope.row.category)">
                {{ scope.row.echoMap.category }}
              </el-tag>
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" prop="state" width="80px">
            <template #default="scope">
              <el-tag v-if="scope.row.state" type="success">
                启用
              </el-tag>
              <el-tag v-else type="danger">
                禁用
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="250">
            <template #default="scope">
              <el-button plain size="small" type="primary" @click="onView(scope.row)">
                <template #icon>
                  <svg-icon name="ep:view" />
                </template>
              </el-button>
              <el-button plain size="small" type="primary" @click="onEdit(scope.row)">
                <template #icon>
                  <svg-icon name="ep:edit" />
                </template>
              </el-button>
              <el-divider direction="vertical" />
              <el-button plain size="small" type="danger" @click="onDel(scope.row)">
                <template #icon>
                  <svg-icon name="ep:delete" />
                </template>
              </el-button>
              <el-divider direction="vertical" />
              <el-button bg plain size="small" text type="primary" @click="onBindUsers(scope.row)">
                绑定用户
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
          <MenuTree :data="data.current" />
        </template>
      </LayoutContainer>
    </div>
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
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

        .empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--el-text-color-placeholder)
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
