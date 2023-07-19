<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import Move from '@/views/system/menu/components/move.vue'
import useSettingsStore from '@/store/modules/settings'
import crudMenu from '@/api/modules/system/menu'
import type { Menu } from '@/types/global'

const auth = useAuth()
interface Data {
  dataList?: Menu.raw[]
  loading: boolean
  tableAutoHeight: boolean
}

defineOptions({
  name: 'MenuList',
})

const router = useRouter()
const tabbar = useTabbar()

const data: Ref<Data> = ref(
  {
    dataList: [],
    loading: false,
    tableAutoHeight: true,
  },
)
const settingsStore = useSettingsStore()

onMounted(() => {
  getDataList()
})
function getDataList() {
  data.value.loading = true
  crudMenu.list<any>().then((res) => {
    data.value.dataList = res
    data.value.loading = false
  }).catch(() => {
    data.value.loading = false
  })
}
function onCreate(row?: Menu.raw) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'SystemMenuCreate',
      query: {
        parentId: row?.id,
        sort: row?.parentId ? row.children?.length ? row.children.length + 1 : 1 : data.value.dataList ? data.value.dataList.length + 1 : 1,
      },
    })
  }
  else {
    router.push({
      name: 'SystemMenuCreate',
      query: {
        parentId: row?.id,
        sort: row?.parentId ? row.children?.length ? row.children.length + 1 : 1 : data.value.dataList ? data.value.dataList.length + 1 : 1,
      },
    })
  }
}
function onEdit(row: Menu.raw) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'SystemMenuEdit',
      params: {
        id: row.id,
      },
    })
  }
  else {
    router.push({
      name: 'SystemMenuEdit',
      params: {
        id: row.id,
      },
    })
  }
}
function onDel(row: Menu.raw) {
  ElMessageBox.confirm(`确认删除「${row.title}」吗？`, '确认信息').then(() => {
    crudMenu.detail(row.id).then(() => {
      getDataList()
      ElMessage.success({
        message: '模拟删除成功',
        center: true,
      })
    })
  }).catch(() => { })
}
function onMoveUp(row: Menu.raw) {
  crudMenu.moveUp(row.id).then(() => {
    getDataList()
    ElMessage.success({
      message: '操作成功',
      center: true,
    })
  })
}
function onMoveDown(row: Menu.raw) {
  crudMenu.moveDown(row.id).then(() => {
    getDataList()
    ElMessage.success({
      message: '操作成功',
      center: true,
    })
  })
}

const moveDialog = ref<{ id?: number | string; visible: boolean; data: object }>({
  id: undefined,
  visible: false,
  data: {},
})
function onMove(row: Menu.raw) {
  // ElMessage.info({
  //   message: '暂未实现',
  //   center: true,
  // })
  moveDialog.value.id = row.id
  moveDialog.value.visible = true
  moveDialog.value.data = row
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="菜单管理" />
    <page-main>
      <el-space>
        <el-button type="primary" @click="onCreate()">
          <template #icon>
            <svg-icon name="ep:plus" />
          </template>
          新增主导航
        </el-button>
      </el-space>
      <el-table
        v-loading="data.loading" class="list-table" :data="data.dataList" row-key="id" default-expand-all border
        stripe highlight-current-row height="100%"
      >
        <el-table-column prop="title" label="标题" min-width="200" fixed="left" />

        <el-table-column prop="path" label="路由" width="200">
          <template #default="scope">
            <span :title="scope.row.path">
              {{ scope.row.path }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="component" label="页面组件" width="200">
          <template #default="scope">
            <ElTag v-if="scope.row.component === 'Layout'">
              {{ scope.row.component }}
            </ElTag>
            <span v-else :title="scope.row.component">
              {{ scope.row.component }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="90" align="center">
          <template #default="scope">
            <div style="display: flex; justify-content: center;">
              <svg-icon v-if="scope.row.icon" :name="scope.row.icon" style="font-size: 24px;" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="activeIcon" label="激活图标" width="90" align="center">
          <template #default="scope">
            <svg-icon v-if="scope.row.activeIcon" :name="scope.row.activeIcon" style="font-size: 24px;" />
          </template>
        </el-table-column>
        <el-table-column prop="sidebar" label="菜单" width="80" align="center">
          <template #default="scope">
            <ElTag
              v-if="typeof scope.row.meta.sidebar === 'boolean'"
              :type="scope.row.meta.sidebar ? 'success' : 'danger'"
            >
              {{ scope.row.meta.sidebar ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </el-table-column>
        <el-table-column prop="breadcrumb" label="面包屑" width="80" align="center">
          <template #default="scope">
            <ElTag
              v-if="typeof scope.row.meta.breadcrumb === 'boolean'"
              :type="scope.row.meta.breadcrumb ? 'success' : 'danger'"
            >
              {{ scope.row.meta.breadcrumb ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="sortValue" label="排序" min-width="80" fixed="right" /> -->
        <el-table-column
          v-if="auth.auth(['authority:menu:add', 'authority:menu:edit', 'authority:menu:delete'])"
          align="center" fixed="right" label="操作" width="350"
        >
          <template #default="scope">
            <el-button
              v-show="scope.row.resourceType === '10'" v-auth="'authority:menu:add'" link plain size="small"
              type="info" @click="onCreate(scope.row)"
            >
              新增导航
            </el-button>
            <el-button v-auth="'authority:menu:edit'" link size="small" type="primary" @click="onEdit(scope.row)">
              编辑
            </el-button>
            <el-button v-auth="'authority:menu:del'" link size="small" type="danger" @click="onDel(scope.row)">
              删除
            </el-button>
            <!--            <el-button v-auth="'authority:menu:edit'" type="danger" size="small"> -->
            <!--              上移 -->
            <!--            </el-button> -->
            <el-popconfirm title="是否上移?" @confirm="onMoveUp(scope.row)">
              <template #reference>
                <el-button v-auth="'authority:menu:edit'" link size="small" type="danger">
                  上移
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm title="是否下移?" @confirm="onMoveDown(scope.row)">
              <template #reference>
                <el-button v-auth="'authority:menu:edit'" link size="small" type="danger">
                  下移
                </el-button>
              </template>
            </el-popconfirm>
            <el-button v-auth="'authority:menu:edit'" link size="small" type="danger" @click="onMove(scope.row)">
              移动
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-main>
    <Move :id="moveDialog.id" v-model="moveDialog.visible" :data="moveDialog.data" @success="getDataList" />
  </div>
</template>

<style lang="scss"  scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-main {
    // 让 page-main 的高度自适应
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .page-header {
    margin-bottom: 0
  }
}

:deep(.el-table td.el-table__cell div) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
