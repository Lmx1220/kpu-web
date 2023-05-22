<script setup lang="ts" name="menuList">
import { ElMessage, ElMessageBox } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import crudMenu from '@/api/modules/system/menu'
import type { HttpRequest, Menu } from '@/types/global'

const auth = useAuth()
interface Data {
  dataList?: Menu.raw[]
  loading: boolean
  tableAutoHeight: boolean
}

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
  crudMenu.list<HttpRequest.responseData<Menu.raw[]>>().then((res) => {
    data.value.dataList = res.data
    data.value.loading = false
  }).catch(() => {
    data.value.loading = false
  })
}
function onCreate(row?: Menu.raw) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'menuCreate',
      query: {
        parentId: row?.id,
      },
    })
  }
  else {
    router.push({
      name: 'menuCreate',
      query: {
        parentId: row?.id,
      },
    })
  }
}
function onEdit(row: Menu.raw) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'menuEdit',
      params: {
        id: row.id,
      },
    })
  }
  else {
    router.push({
      name: 'menuEdit',
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
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="菜单管理" />
    <page-main>
      <el-space>
        <el-button type="primary" @click="onCreate()">
          <template #icon>
            <el-icon>
              <svg-icon name="ep:plus" />
            </el-icon>
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
              {{ scope.row.path }}:: {{ scope.row.id }}
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
              <el-icon v-if="scope.row.icon" style="font-size: 24px;">
                <svg-icon :name="scope.row.icon" />
              </el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="activeIcon" label="激活图标" width="90" align="center">
          <template #default="scope">
            <el-icon v-if="scope.row.activeIcon" style="font-size: 24px;">
              <svg-icon :name="scope.row.activeIcon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="sidebar" label="菜单" width="80" align="center">
          <template #default="scope">
            <ElTag v-if="typeof scope.row.sidebar === 'boolean'" :type="scope.row.sidebar ? 'success' : 'danger'">
              {{ scope.row.sidebar ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </el-table-column>
        <el-table-column prop="breadcrumb" label="面包屑" width="80" align="center">
          <template #default="scope">
            <ElTag v-if="typeof scope.row.breadcrumb === 'boolean'" :type="scope.row.breadcrumb ? 'success' : 'danger'">
              {{ scope.row.breadcrumb ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </el-table-column>
        <el-table-column v-if="auth.auth(['menu:add', 'menu:edit', 'menu:del'])" width="250" align="center" fixed="right" label="操作">
          <template #default="scope">
            <el-button v-show="scope.row.type === 0" v-auth="'menu:add'" type="info" plain size="small" @click="onCreate(scope.row)">
              新增导航
            </el-button>
            <el-button v-auth="'menu:edit'" type="primary" size="small" @click="onEdit(scope.row)">
              编辑
            </el-button>
            <el-button v-auth="'menu:del'" type="danger" size="small" @click="onDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-main>
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
