<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted } from 'vue'
import { findNodeByKey } from '@/util/helper/treeHelper'
import type { DataConfig } from '#/global'
import crudOrg from '@/api/modules/system/org'

const emits = defineEmits<{
  create: [any]
  edit: [any]
  delete: [any]
  change: [string]
  select: [any]
}>()

defineOptions({
  name: 'OrgBloksTree',
})

const data = ref<DataConfig>({
  loading: false,
  formMode: 'dialog',
  tableAutoHeight: true,
  // 详情
  formModeProps: {
    visible: false,
    id: '',

  },
  // 搜索
  search: {
    title: '',
  },
  searchFold: false,

  current: {},
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  dataList: [],
  // 列表数据
  dataTree: {
    name: '机构(单位/部门)树',
    key: 0,
    expand: false,
    children: [],
  },
})
onMounted(() => {
  getDataList()
})

async function getDataList() {
  data.value.loading = true
  try {
    data.value.dataTree.children = []
    data.value.dataTree.children = await crudOrg.tree(data.value.search)
  }
  finally {
    setTimeout(() => {
      data.value.loading = false
    }, 100)
  }
}

function onChange() {
  emits('change', '1')
}

function onAdd() {
  if (data.value.current?.id) {
    emits('create', {
      parentId: data.value.current.id,
      parentName: data.value.current.name,
      id: '',
      name: '',
    })
  }
  else {
    emits('create', {
      id: '',
      name: '',
      parentId: '',
      parentName: '根节点',
    })
  }
}

function onEdit(row: any) {
  emits('edit', row)
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
    crudOrg.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

function onNodeClick(event: any, node: any) {
  event && event.stopPropagation()
  if (node && node.id) {
    data.value.current = node
    const parent = findNodeByKey(node.parentId, data.value.dataTree.children)
    if (parent) {
      data.value.current!.parentId = parent.id
      data.value.current!.parentName = parent.name
    }
  }
  else {
    data.value.current = {
      id: '',
      name: '',
      parentId: '0',
      parentName: '根节点',
    }
  }
  emits('select', data.value.current)
}

defineExpose({
  getDataList,
})
</script>

<template>
  <blocks-tree
    v-loading="data.loading" :data="data.dataTree"
    :tree-props="{ label: 'name', expand: 'expand', children: 'children', key: 'id' }"
    @node-click="onNodeClick"
  >
    <template #operation>
      <el-button type="primary" @click="onChange">
        切换
      </el-button>
      <el-button :disabled="data.current?.id === undefined" type="primary" @click="onAdd">
        新增
      </el-button>
      <el-button :disabled="data.current?.id === '' || data.current?.id === undefined" @click="onEdit(data.current)">
        编辑
      </el-button>
      <el-button
        :disabled="data.current?.id === '' || data.current?.id === undefined" class="mr-2"
        @click="onDel(data.current)"
      >
        删除
      </el-button>
    </template>
  </blocks-tree>
</template>

<style lang="scss" scoped>
// scss
</style>
