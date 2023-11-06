<script setup lang="ts">
import { ElMessage } from 'element-plus'

import Move from './components/move.vue'
import crudResource, { moveDown, moveUp, treeResourceAndView } from '@/api/modules/system/resource'
import useSettingsStore from '@/store/modules/settings'
import type { DataConfig, Menu } from '@/types/global'
import type { ResourceResultVO } from '@/api/modules/system/model/ResourceModel.ts'
import eventBus from '@/util/eventBus.ts'
import { useKeepAlive } from '@/hooks/useA.ts'
import { forEach } from '@/util/helper/treeHelper'

defineOptions({
  name: 'SystemResourceList',
})

const auth = useAuth()

const router = useRouter()
const tabbar = useTabbar()
const { t } = useI18n()

const data: Ref<DataConfig<any, ResourceResultVO>> = ref(
  {
    dataList: [],
    loading: false,
    tableAutoHeight: true,
    /**
     * 详情展示模式
     * router 路由跳转
     * dialog 对话框
     * drawer 抽屉
     */
    formMode: 'router',
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
  },
)
const settingsStore = useSettingsStore()

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

if (data.value.formMode === 'router') {
  useKeepAlive(() => eventBus.off('get-data-list'))
}

function getDataList() {
  data.value.loading = true
  treeResourceAndView().then((res) => {
    forEach(res, (item) => {
      if (!item.children) {
        item.children = []
      }
    })
    data.value.dataList = res
    data.value.loading = false
  }).catch(() => {
    data.value.loading = false
  })
}

function onAdd(row?: ResourceResultVO) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'SystemResourceCreate',
      query: {
        parentId: row?.id,
        sort: row?.parentId ? row.children?.length ? row.children.length + 1 : 1 : data.value.dataList ? data.value.dataList.length + 1 : 1,
      },
    })
  }
  else {
    router.push({
      name: 'SystemResourceCreate',
      query: {
        parentId: row?.id,
        sort: row?.parentId ? row.children?.length ? row.children.length + 1 : 1 : data.value.dataList ? data.value.dataList.length + 1 : 1,
      },
    })
  }
}

function onEdit(row: ResourceResultVO) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'SystemResourcedit',
      params: {
        id: row.id,
      },
    })
  }
  else {
    router.push({
      name: 'SystemResourceEdit',
      params: {
        id: row.id,
      },
    })
  }
}

function onDel(row: ResourceResultVO) {
  if (row.id) {
    crudResource.remove([row.id]).then(() => {
      getDataList()
      ElMessage.success({
        message: t('common.tips.deleteSuccess'),
        center: true,
      })
    })
  }
}

function onMoveUp(row: Menu.raw) {
  moveUp(row.id).then(() => {
    getDataList()
    ElMessage.success({
      message: t('sys.api.operationSuccess'),
      center: true,
    })
  })
}

function onMoveDown(row: Menu.raw) {
  moveDown(row.id).then(() => {
    getDataList()
    ElMessage.success({
      message: t('sys.api.operationSuccess'),
      center: true,
    })
  })
}

const moveDialog = ref<{ id?: string; visible: boolean; data: object }>({
  id: undefined,
  visible: false,
  data: {},
})

function onMove(row: Menu.raw) {
  moveDialog.value.id = row.id
  moveDialog.value.visible = true
  moveDialog.value.data = row
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader :title="t('system.resource.table.title')" />
    <PageMain>
      <ElSpace>
        <ElButton type="primary" @click="onAdd()">
          <template #icon>
            <SvgIcon name="ep:plus" />
          </template>
          {{ t('common.title.addRoot') }}
        </ElButton>
      </ElSpace>
      <ElTable
        v-loading="data.loading" class="my-4" :data="data.dataList" row-key="id" default-expand-all border
        stripe highlight-current-row height="100%"
      >
        <ElTableColumn prop="title" :label="t('system.resource.title')" min-width="200" fixed="left" />

        <ElTableColumn prop="path" :label="t('system.resource.path')" width="200">
          <template #default="scope">
            <span :title="scope.row.path">
              {{ scope.row.path }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="component" :label="t('system.resource.component')" width="200">
          <template #default="scope">
            <ElTag v-if="scope.row.component === 'Layout'">
              {{ scope.row.component }}
            </ElTag>
            <span v-else :title="scope.row.component">
              {{ scope.row.component }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="icon" :label="t('system.resource.icon')" width="90" align="center">
          <template #default="scope">
            <div style="display: flex; justify-content: center;">
              <SvgIcon v-if="scope.row.icon" :name="scope.row.icon" style="font-size: 24px;" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="activeIcon" :label="t('system.resource.activeIcon')" width="90" align="center">
          <template #default="scope">
            <SvgIcon v-if="scope.row.activeIcon" :name="scope.row.activeIcon" style="font-size: 24px;" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="sidebar" :label="t('system.resource.meta.sidebar')" width="80" align="center">
          <template #default="scope">
            <ElTag
              v-if="typeof scope.row.meta.sidebar === 'boolean'"
              :type="scope.row.meta.sidebar ? 'success' : 'danger'"
            >
              {{ scope.row.meta.sidebar ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="breadcrumb" :label="t('system.resource.meta.breadcrumb')" width="80" align="center">
          <template #default="scope">
            <ElTag
              v-if="typeof scope.row.meta.breadcrumb === 'boolean'"
              :type="scope.row.meta.breadcrumb ? 'success' : 'danger'"
            >
              {{ scope.row.meta.breadcrumb ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <!-- <el-table-column prop="sortValue" label="排序" min-width="80" fixed="right" /> -->
        <ElTableColumn
          v-if="auth.auth(['system:resource:add', 'system:resource:edit', 'system:resource:delete'])"
          align="center" fixed="right" label="操作" width="350"
        >
          <template #default="scope">
            <ElButton
              v-show="scope.row.resourceType === '10'" v-auth="'system:resource:add'" link plain size="small"
              type="info" @click="onAdd(scope.row)"
            >
              {{ t('common.title.addChildren') }}
            </ElButton>
            <ElButton v-auth="'system:resource:edit'" link size="small" type="primary" @click="onEdit(scope.row)">
              {{ t('common.title.edit') }}
            </ElButton>
            <ElPopconfirm v-if="auth.auth('system:resource:del')" :title="t('common.tips.confirmDelete')" @confirm="onDel(scope.row)">
              <ElButton link size="small" type="danger">
                {{ t('common.title.delete') }}
              </ElButton>
            </ElPopconfirm>
            <ElPopconfirm v-if="auth.auth('system:resource:edit')" :title="t('common.tips.confirmMove')" @confirm="onMoveUp(scope.row)">
              <template #reference>
                <ElButton link size="small" type="danger">
                  {{ t('common.title.moveUp') }}
                </ElButton>
              </template>
            </ElPopconfirm>
            <ElPopconfirm v-if="auth.auth('system:resource:edit')" :title="t('common.tips.confirmMove')" @confirm="onMoveDown(scope.row)">
              <template #reference>
                <ElButton link size="small" type="danger">
                  {{ t('common.title.moveDown') }}
                </ElButton>
              </template>
            </ElPopconfirm>
            <ElButton v-auth="'system:resource:edit'" link size="small" type="danger" @click="onMove(scope.row)">
              {{ t('common.title.move') }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </PageMain>
    <Move :id="moveDialog.id" v-model="moveDialog.visible" :data="moveDialog.data" @success="getDataList" />
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }
  }

  .page-header {
    margin-bottom: 0;
  }
}
</style>
