<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import crudMenu from '@/api/modules/system/menu'

defineOptions({
  name: 'MenuList',
})

const router = useRouter()
const tabbar = useTabbar()
const data = ref(
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
function onCreate(row: any) {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.open({
      name: 'menuCreate',
      query: {
        parentId: row.id,
      },
    })
  }
  else {
    router.push({
      name: 'menuCreate',
      query: {
        parentId: row.id,
      },
    })
  }
}
function onEdit(row: any) {
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
function onDel(row: any) {
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
        <el-button type="primary" @click="onCreate">
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
        <el-table-column prop="meta.title" label="标题" min-width="200" fixed="left" />
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
        <el-table-column prop="meta.icon" label="图标" width="90" align="center">
          <template #default="scope">
            <div style="display: flex; justify-content: center;">
              <el-icon v-if="scope.row.meta.icon" style="font-size: 24px;">
                <svg-icon :name="scope.row.meta.icon" />
              </el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="meta.activeIcon" label="激活图标" width="90" align="center">
          <template #default="scope">
            <el-icon v-if="scope.row.meta.activeIcon" style="font-size: 24px;">
              <svg-icon :name="scope.row.meta.activeIcon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="sidebar" label="菜单" width="80" align="center">
          <template #default="scope">
            <ElTag v-if="typeof scope.row.meta.sidebar === 'boolean'" :type="scope.row.meta.sidebar ? 'success' : 'danger'">
              {{ scope.row.meta.sidebar ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </el-table-column>
        <el-table-column prop="meta.breadcrumb" label="面包屑" width="80" align="center">
          <template #default="scope">
            <ElTag v-if="typeof scope.row.meta.breadcrumb === 'boolean'" :type="scope.row.meta.breadcrumb ? 'success' : 'danger'">
              {{ scope.row.meta.breadcrumb ? '显示' : '隐藏' }}
            </ElTag>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="250" align="center" fixed="right" label="操作">
          <template #default="scope">
            <el-button type="info" plain size="small" @click="onCreate(scope.row)">
              新增导航
            </el-button>
            <el-button type="primary" size="small" @click="onEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="onDel(scope.row)">
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
