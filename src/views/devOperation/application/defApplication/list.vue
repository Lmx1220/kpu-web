<script lang="ts" setup>
import type { Ref } from 'vue'
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import { useI18n } from 'vue-i18n'
import FormMode from './components/FormMode/index.vue'
import { ActionEnum } from '@/enums/commonEnum'
import { dictComponentProps } from '@/util/common'
import type { DefApplicationPageQuery, DefApplicationResultVO } from '@/api/modules/devOperation/application/model/defApplicationModel'
import crudDefApplication from '@/api/modules/devOperation/application/defApplication'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'
import type { DataConfig } from '@/types/global'

defineOptions({
  name: 'DevoperationApplicationDefApplication',
})
const {
  pagination,
  search,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
  resetQuery,
} = usePagination<DefApplicationPageQuery>()
const router = useRouter()
const { t } = useI18n()
// const route = useRoute()
// const defaultQuery = {
//   daterange: [],
// }
const data: Ref<DataConfig<DefApplicationPageQuery, DefApplicationResultVO>> = ref({
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
    enable: false,
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
  const params = getParams<DefApplicationPageQuery>({
    ...data.value.search,
  }, {
    type: 'daterange',
    name: 'daterange',
    prop: 'createdTime',
  })
  const res = await crudDefApplication.page(params)
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
function sortChange({ prop, order }: any) {
  onSortChange(prop, order).then(() => getDataList())
}

function onAdd() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'DevoperationApplicationDefApplicationAdd',
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
      name: 'DevoperationApplicationDefApplicationEdit',
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
      name: 'DevoperationApplicationDefApplicationDetail',
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
    ids = data.value.batch.selectionDataList.map(item => item.id ?? '')
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudDefApplication.remove(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: t('common.tips.deleteSuccess'),
        center: true,
      })
    })
  }).catch(() => {
  })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header :title="t('devOperation.application.defApplication.table.title')" />
    <page-main>
      <search-bar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <el-form class="search-form" :model="data.search" size="default" inline-message label-width="120" label-suffix="：">
            <el-row>
              <el-col :span="6">
                <el-form-item class="el-row" :label="t('devOperation.application.defApplication.appKey')">
                  <ElInput
                    v-model="data.search.appKey"
                    :placeholder="t('common.inputText')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="el-row" :label="t('devOperation.application.defApplication.name')">
                  <ElInput
                    v-model="data.search.name"
                    :placeholder="t('common.inputText')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item class="el-row" :label="t('devOperation.application.defApplication.type')">
                  <ApiRadioGroup
                    v-model="data.search.type"
                    v-bind="dictComponentProps('APPLICATION_TYPE')"
                    :placeholder="t('common.chooseText')"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item v-show="!fold" :label="t('kpu.common.createdTime')">
                  <el-date-picker
                    v-model="data.search.daterange"
                    :default-time="[
                      new Date(2000, 1, 1, 0, 0, 0),
                      new Date(2000, 2, 1, 23, 59, 59),
                    ]"
                    size="default"
                    range-separator=":"
                    style="width: 250px;"
                    type="daterange"
                    value-format="YYYY-MM-DD HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="currentChange()">
                    <template #icon>
                      <svg-icon name="ep:search" />
                    </template>
                    {{ t('common.queryText') }}
                  </el-button>
                  <el-button type="primary" @click="resetQuery()">
                    {{ t('common.resetText') }}
                  </el-button>
                  <el-button type="primary" link @click="data.searchFold = !fold">
                    <template #icon>
                      <svg-icon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                    </template>
                    {{ fold ? t('component.form.unfold') : t('component.form.putAway') }}
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </search-bar>
      <el-divider border-style="dashed" class="my-4" />
      <el-space wrap>
        <el-button type="primary" size="default" @click="onAdd">
          <template #icon>
            <svg-icon name="ep:plus" />
          </template>
          {{ t('common.title.add') }}
        </el-button>
        <el-button size="default" :disabled="!data.batch.selectionDataList.length" type="danger" @click="onDel()">
          <template #icon>
            <svg-icon name="ep:delete" />
          </template>
          {{ t('common.title.delete') }}
        </el-button>
      </el-space>
      <ElTable
        ref="table" v-loading="data.loading" class="my-4" height="100%" :data="data.dataList"
        stripe highlight-current-row border @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" type="selection" align="center" fixed />
        <el-table-column :label="t('component.table.index')" align="center" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column key="appKey" :label="t('devOperation.application.defApplication.appKey')" prop="appKey" align="center" />
        <el-table-column key="name" :label="t('devOperation.application.defApplication.name')" prop="name" align="center" />
        <el-table-column key="version" :label="t('devOperation.application.defApplication.version')" prop="version" align="center" />
        <el-table-column key="type" :label="t('devOperation.application.defApplication.type')" prop="echoMap.type" align="center" />
        <el-table-column key="isGeneral" :label="t('devOperation.application.defApplication.isGeneral')" prop="isGeneral" align="center" />
        <el-table-column key="isVisible" :label="t('devOperation.application.defApplication.isVisible')" prop="isVisible" align="center" />
        <el-table-column key="sortValue" :label="t('devOperation.application.defApplication.sortValue')" prop="sortValue" align="center" />
        <el-table-column :label="t('kpu.common.createdTime')" prop="createdTime" width="180" sortable="custom" align="center" />
        <el-table-column :label="t('common.column.action')" width="250" align="center" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              plain
              @click="onView(scope.row)"
            >
              {{ t('common.title.view') }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              plain
              @click="onEdit(scope.row)"
            >
              {{ t('common.title.edit') }}
            </el-button>
            <el-button
              type="danger" size="small" plain @click="onDel(scope.row)"
            >
              {{ t('common.title.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </ElTable>
      <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
    </page-main>
    <FormMode v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id" v-model="data.formModeProps.visible" :type="data.formModeProps.type" :mode="data.formMode" @success="getDataList" />
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

      :deep(.el-col) {
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
  }
</style>
