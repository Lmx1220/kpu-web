<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import { onMounted } from 'vue'
import { findNodeByKey } from '@/util/helper/treeHelper'
import crudOrg, { treeOrg } from '@/api/modules/system/org'
import BindRoleMode from '@/views/system/org/components/BindRoleMode.vue'

interface Props {
  query?: boolean
}

withDefaults(defineProps<Props>(), {
  query: false,
})
const emits = defineEmits<{
  select: [any, any[]]
  create: [any]
  edit: [any]
  change: [string]
  reset: []
}>()

const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'name',
}

function expandHandle(isExpand: boolean) {
  const nodes = treeRef?.value?.store.nodesMap
  for (const node in nodes) {
    nodes[node].expanded = isExpand
  }
}

const dataTree = ref({
  search: {
    isChild: false,
  },
  loading: false,
  // 列表数据
  tree: [] as any[],
  current: {} as { [key: string]: any },
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [] as { [key: string]: any }[],
  },
})
onMounted(() => {
  getTreeList()
})

async function getTreeList() {
  dataTree.value.loading = true
  try {
    dataTree.value.tree = await treeOrg()
  }
  finally {
    setTimeout(() => {
      dataTree.value.loading = false
    }, 100)
  }
}

function onNodeClick(node: any) {
  dataTree.value.current = node
  const parent = findNodeByKey(node.parentId, dataTree.value.tree)
  if (parent) {
    dataTree.value.current!.parentId = parent.id
    dataTree.value.current!.parentName = parent.name
  }
  const ids = dataTree.value.search.isChild ? getAllChildIds(dataTree.value.current) : [dataTree.value.current.id]
  emits('select', node, ids)
}

function getAllChildIds(node: any, result: string[] = []) {
  result.push(node.id)
  if (node.children) {
    for (const child of node.children) {
      getAllChildIds(child, result)
    }
  }
  return result
}

function onCheckChange() {
  dataTree.value.batch.selectionDataList = treeRef.value?.getCheckedNodes() as any[]
}

function onReset() {
  treeRef.value?.setCurrentKey()
  emits('reset')
}

const filterText = ref('')

function filterNode(value: string, data: any) {
  if (!value) {
    return true
  }
  return data.name.includes(value)
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

function handleCommand(command: string) {
  switch (command) {
    case 'expand':
      expandHandle(true)
      break
    case 'fold':
      expandHandle(false)
      break
    default:
      break
  }
}

function onChange() {
  emits('change', '2')
}

function onAdd(row?: any) {
  if (row) {
    emits('create', {
      parentId: dataTree.value.current.id,
      parentName: dataTree.value.current.name,
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

function onEdit(row?: any) {
  if (row) {
    const parent = findNodeByKey(row.parentId, dataTree.value.tree)
    emits('edit', {
      parentId: parent?.id,
      parentName: parent?.name,
      id: row.id,
      name: row.name,
    })
  }
}

const bindRole = ref({
  visible: false,
  id: '',
})

function onBindRoles(row: any) {
  bindRole.value.id = row.id
  bindRole.value.visible = true
}

function onDel(row?: any) {
  let ids: string[]
  if (row) {
    ids = [row.id]
  }
  else {
    ids = treeRef.value?.getCheckedKeys() as any
  }

  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudOrg.remove(ids).then(() => {
      getTreeList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

defineExpose({
  getDataList: getTreeList,
})
</script>

<template>
  <ElSpace alignment="center" style="margin-bottom: 8px;" wrap>
    <template v-if="query">
      <ElButton @click="onReset">
        重置
      </ElButton>
      <ElCheckbox v-model="dataTree.search.isChild" label="本级及子级" @change="getTreeList()" />
    </template>
    <template v-else>
      <ElButton type="primary" @click="onChange">
        切换
      </ElButton>
      <ElButton type="primary" @click="onAdd">
        新增根节点
      </ElButton>
      <ElButton :disabled="!dataTree.batch.selectionDataList.length" type="primary" @click="onDel">
        删除
      </ElButton>
    </template>
  </ElSpace>
  <div class="title flex items-center">
    <div class="flex flex-1 cursor-pointer items-center">
      <ElInput v-model="filterText" class="ml-5 mr-1" placeholder="搜素">
        <template #append>
          <SvgIcon name="i-ep:search" />
        </template>
      </ElInput>
      <ElDropdown class="inline" @command="handleCommand">
        <SvgIcon :size="26" class="ml-1 mr-1" name="i-ant-design:more-outlined" />
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem command="expand">
              展开全部
            </ElDropdownItem>
            <ElDropdownItem command="fold">
              折叠全部
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
  <ElDivider />
  <ElScrollbar v-loading="dataTree.loading">
    <ElTree
      ref="treeRef" :data="dataTree.tree" :expand-on-click-node="false" :filter-node-method="filterNode"
      :props="defaultProps" :show-checkbox="!query" class="filter-tree" check-strictly highlight-current default-expand-all
      node-key="id"
      @node-click="onNodeClick"
      @check-change="onCheckChange"
    >
      <template #default="{ node, data }">
        <div
          class="custom-tree-node"
        >
          <span>
            <ElTag :type="data.type === '01' ? 'danger' : 'primary'" class="mr-1">
              {{ data?.echoMap?.type }} {{ data.type }}
            </ElTag>
            {{ node.label }}</span>
          <span v-if="!query" class="tree__actions">
            <a class="tree__action" @click.stop="onAdd(data)"> 新增 </a>
            <a class="tree__action" style="margin-left: 8px;" @click.stop="onEdit(data)"> 编辑 </a>
            <a class="tree__action" style="margin-left: 8px;" @click.stop="onBindRoles(data)"> 绑定 </a>
            <a class="tree__action" style="margin-left: 8px;" @click.stop="onDel(data)"> 删除 </a>
          </span>
        </div>
      </template>
    </ElTree>
    <BindRoleMode :id="bindRole.id" v-model="bindRole.visible" @success="getTreeList()" />
  </ElScrollbar>
</template>

<style lang="scss" scoped>
// scss
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: 14px;

  &:hover {
    .tree__actions {
      visibility: visible;
    }
  }

  .tree__actions {
    margin-left: 4px;
    visibility: hidden;
  }
}
</style>
