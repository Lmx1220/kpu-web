<script setup lang="ts" name="menuList">
import useSettingsStore from '@/store/modules/settings'

const router = useRouter()
const tabbar = useTabbar()
const dataList: Ref<any[]> = ref([])
const settingsStore = useSettingsStore()
for (let index = 0; index < 20; index++) {
  dataList.value.push({
    id: index,
  })
}
function handleAdd(row: any) {
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
function handleEdit(row: any) {
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
function handleDelete(row: any) {
}
</script>

<template>
  <div class="absolute-container">
    <page-header title="菜单管理" />
    <page-main>
      <el-space>
        <el-button type="primary" @click="handleAdd">
          <template #icon>
            <el-icon>
              <svg-icon name="ep:plus" />
            </el-icon>
          </template>
          新增主导航
        </el-button>
      </el-space>
      <el-table
        class="list-table"

        :data="dataList" row-key="id" default-expand-all border stripe highlight-current-row height="100%"
      >
        <el-table-column prop="name" label="标题" />
        <el-table-column prop="age" label="路由" />
        <el-table-column prop="address" label="页面组件" />
        <el-table-column prop="address" label="图标" />
        <el-table-column prop="address" label="激活图标" />
        <el-table-column prop="address" label="菜单" />
        <el-table-column prop="address" label="面包屑" />
        <el-table-column prop="address" width="250" align="center" fixed="right" label="操作">
          <template #default="scope">
            <el-button type="info" plain size="small" @click="handleAdd(scope.row)">
              新增导航
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-main>
  </div>
</template>

<styl lang="scss"  scoped>
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
    margin-top: 0;
    display: flex;
    flex-direction: column;
  }
}
</styl>
