<script lang="ts" setup>
import { ElMessageBox, ElTree } from 'element-plus'
import { menuResourceTree, move } from '@/api/modules/system/menu'

export interface Props {
  id?: string
  title?: string
  data: any
  modelValue: boolean
  width?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  id: '',

  title: '移动菜单',
  width: '520px',

})
const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  'success': []
}>()

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

interface Tree {
  [key: string]: any
}

export interface MenuResourceTreeRes extends Tree {
  code: string
  createTime: Record<string, unknown>
  createdBy: number
  remarks: string
  icon: string
  id: number
  isDef: boolean
  label: string
  parentId: number
  sortValue: number
  type: string
  updateTime: Record<string, unknown>
  updatedBy: number
  children: MenuResourceTreeRes[]
  disabled: boolean
}

const three = ref<MenuResourceTreeRes[]>([])
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

function filterNode(value: string, data: any) {
  if (!value) {
    return true
  }
  return data.label.includes(value)
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

function getThreeData() {
  menuResourceTree<MenuResourceTreeRes[]>().then((res) => {
    three.value = res
    cpe(three.value, (item: MenuResourceTreeRes, options = { keyLinks: [] }) => {
      item.key = item.id
      item.keyLinks = [...options.keyLinks || [], item.id]
      item.disabled = item.id === props.data.parentId
          || item.id === props.data.id
          || item.treePath.includes(`/${props.data.id}/`)
      item.id === props.data.parentId
        ? item.label = `${item.label}(不能移动到他的父节点)`
        : item.id === props.data.id
          ? item.label = `${item.label}(不能移动到他自己下)`
          : item.treePath.includes(`/${props.data.id}/`)
            ? item.label = `${item.label}(不能移动到他的子孙节点)`
            : item.label = item.label
      return item
    })
  })
}

function cpe(data: any, func: Function, options = {}) {
  data.forEach((item: any) => {
    const a = func(item, options) || item
    item.children && cpe(item.children, func, a)
  })
}

const currentNode = ref<MenuResourceTreeRes>()

function onNodeClick(data: any) {
  currentNode.value = data
}

function getResourceTagColor(resourceType: string) {
  switch (resourceType) {
    case '10':
      return 'success'
    case '20':
      return 'info'
    case '30':
      return 'warning'
    case '40':
      return 'danger'
    case '50':
      return 'danger'
    default:
      return 'success'
  }
}

function handleCommand(command: string) {
  switch (command) {
    case 'expand':
      expandHandle(true)
      break
    case 'fold':
      expandHandle(false)
      break
    default:
      expandHandle(true)
      break
  }
}

function expandHandle(isExpand: boolean) {
  const nodes = treeRef?.value?.store.nodesMap
  for (const node in nodes) {
    nodes[node].expanded = isExpand
  }
}

async function handleSubmit(_node?: MenuResourceTreeRes) {
  try {
    await ElMessageBox.confirm(
        `确定要将【${props.data.title}】移动到 【${_node ? _node.label : '根节点'}】?`,
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        },
    )
  }
  catch {
    return
  }
  try {
    await move(props.data.id, _node?.id)
    handleCancel()
    emits('success')
  }
  catch (e) {
    console.log(e)
  }
}

function handleCancel() {
  dialogVisible.value = false
  currentNode.value = undefined
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width" @open="getThreeData">
    <div class="title flex items-center">
      <span class="">
        移动：【{{ props.data.title }}】
      </span>
      <div class="flex-1 flex items-center cursor-pointer">
        <el-input v-model="filterText" class="mr-1 ml-5 " placeholder="搜素">
          <template #append>
            <svg-icon name="i-ep:search" />
          </template>
        </el-input>
        <el-dropdown class="inline" @command="handleCommand">
          <svg-icon :size="26" class="mr-1 ml-1" name="i-ant-design:more-outlined" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="expand">
                展开全部
              </el-dropdown-item>
              <el-dropdown-item command="fold">
                折叠全部
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-divider />
    <el-scrollbar max-height="550px">
      <ElTree
        ref="treeRef" :data="three" :expand-on-click-node="false" :filter-node-method="filterNode" :props="defaultProps"
        class="filter-tree" node-key="key"
      >
        <template #default="{ node, data }">
          <div
            :class="{ 'is-disabled': node.disabled, 'is-current': node.key === currentNode?.key }"
            class="custom-tree-node"
            @click="() => !node.disabled && onNodeClick(data)"
          >
            <svg-icon :name="data.icon" :size="16" class="mr-1 ml-1" />
            <el-tag :type="getResourceTagColor(data.resourceType)" class="mr-1">
              {{ data?.echoMap?.resourceType }}
            </el-tag>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </ElTree>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button @click="handleSubmit()">
          移动到根节点
        </el-button>
        <el-button type="primary" @click="() => handleSubmit(currentNode)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-tree :deep(.el-tree-node__content) {
  > .custom-tree-node {
    width: 100%;
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;

    &.is-disabled {
      color: #00000040;
      cursor: not-allowed;
    }

    &:hover:not(.is-disabled, .is-current) {
      background-color: var(--el-tree-node-hover-bg-color);

    }

    &.is-current {
      background-color: #a3e0ff;

    }

  }
}

.el-tree :deep(.el-tree-node) {
  .el-tree-node__content:hover {
    background-color: transparent;
  }

  &:focus > .el-tree-node__content {
    background-color: transparent !important;

  }
}

.el-tree {
  font-size: 14px;
}
</style>
