<script lang="ts" setup>
import type { FieldNames, KeyType, TreeProps, TreeState } from './tree'
import { isString } from '@/utils/is'

import { ElTree } from 'element-plus'
import { omit } from 'lodash-es'

defineOptions({
  name: 'BasicTree',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<TreeProps>(), {
  title: '',
  loading: false,
  highlight: false,
  toolbarStrictly: true,
  filterFn: undefined,
  checkedKeys: () => [],
  selectedKeys: () => [],
  expandedKeys: () => [],
  defaultExpandLevel: '',
  searchValue: '',
})
const emits = defineEmits<{
  'update:expandedKeys': [KeyType[]]
  'update:selectedKeys': [KeyType[]]
  'update:value': [any]
  'change': [KeyType[]]
  'select': [keys: KeyType[]]
  'check': [key: KeyType[], check: any]
}>()
const { t } = useI18n()
const treeDataRef = ref<any[]>([])
const state = reactive<TreeState>({
  checkStrictly: props.checkStrictly,
  expandedKeys: props.expandedKeys || [],
  selectedKeys: props.selectedKeys || [],
  checkedKeys: props.checkedKeys || [],
})
const getFieldNames = computed((): Required<FieldNames> => {
  const { fieldNames } = props
  return {
    children: 'children',
    label: 'title',
    key: 'id',
    ...fieldNames,
  }
})

watch(
  () => props.treeData,
  (val) => {
    if (val) {
      treeDataRef.value = val
    }
  },
)
const treeRef = ref<InstanceType<typeof ElTree>>()

function onCheckChange() {
  state.checkedKeys = treeRef.value?.getCheckedKeys() as any[]
}

const filterText = ref('')

function filterNode(value: string, data: any) {
  if (!value) {
    return true
  }
  if (props.filterFn) {
    return props.filterFn(value, data, toValue(getFieldNames))
  }
  return data[toValue(getFieldNames).label].includes(value)
}

const currentKey = ref(null)

function handleClickNode({ key, children }: any) {
  if (currentKey.value === key) {
    treeRef.value?.setCurrentKey()
    currentKey.value = null
    setSelectedKeys([])
  }
  else {
    setSelectedKeys([key])
    currentKey.value = key
  }

  if (!props.clickRowToExpand || !children || children.length === 0) {
    return
  }
  if (!state.expandedKeys.includes(key)) {
    setExpandedKeys([...state.expandedKeys, key])
  }
  else {
    const keys = [...state.expandedKeys]
    const index = keys.findIndex(item => item === key)
    if (index !== -1) {
      keys.splice(index, 1)
    }
    setExpandedKeys(keys)
    const node = treeRef.value?.getNode(key)
    node && (node.expanded = false)
  }
}

function setExpandedKeys(keys: KeyType[]) {
  state.expandedKeys = keys
}

function getExpandedKeys() {
  return state.expandedKeys
}

function setSelectedKeys(keys: KeyType[]) {
  state.selectedKeys = keys
}

function getSelectedKeys() {
  return state.selectedKeys
}

function setCheckedKeys(keys: KeyType[]) {
  state.checkedKeys = keys
}

function getCheckedKeys() {
  return state.checkedKeys
}

function getHalfCheckedKeys() {
  return treeRef.value?.getHalfCheckedKeys() as KeyType[]
}

watchEffect(() => {
  treeDataRef.value = props.treeData
})
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})
onMounted(() => {
  const level = isString(props.defaultExpandLevel) ? Number.parseInt(props.defaultExpandLevel) : props.defaultExpandLevel
  if (level > 0) {
    state.expandedKeys = filterByLevel(level)
  }
  else if (props.defaultExpandAll) {
    expandAll(true)
  }
})

function expandAll(expandAll: boolean) {
  const nodes = treeRef?.value?.store.nodesMap
  for (const node in nodes) {
    nodes[node].expanded = expandAll
  }
  state.expandedKeys = expandAll ? getAllKeys() : ([] as KeyType[])
}

function filterByLevel(level: number) {
  const nodes = treeRef?.value?.store.nodesMap
  const keys: any[] = []
  for (const node in nodes) {
    if (nodes[node].level <= level) {
      const node1 = nodes[node] as any
      node1.expanded = true
      keys.push(toValue(getFieldNames).key)
    }
  }
  return keys
}

function getAllKeys(list?: any[]) {
  const keys: string[] = []
  const treeData = list || unref(treeDataRef)
  const { key: keyField, children: childrenField } = unref(getFieldNames)
  if (!childrenField || !keyField) {
    return keys
  }

  for (let index = 0; index < treeData.length; index++) {
    const node = treeData[index]
    keys.push(node[keyField]!)
    const children = node[childrenField]
    if (children && children.length) {
      keys.push(...(getAllKeys(children) as string[]))
    }
  }
  return keys as KeyType[]
}

// get keys that can be checked and selected
function getEnabledKeys(list?: any[]) {
  const keys: string[] = []
  const treeData = list || unref(treeDataRef)
  const { key: keyField, children: childrenField } = unref(getFieldNames)
  if (!childrenField || !keyField) {
    return keys
  }

  for (let index = 0; index < treeData.length; index++) {
    const node = treeData[index]
    node.disabled !== true && keys.push(node[keyField]!)
    const children = node[childrenField]
    if (children && children.length) {
      keys.push(...(getEnabledKeys(children) as string[]))
    }
  }
  return keys as KeyType[]
}

function onExpand({ key }: any) {
  if (!state.expandedKeys.includes(key)) {
    setExpandedKeys([...state.expandedKeys, key])
  }
}

function onCollapse({ key }: any) {
  const keys = [...state.expandedKeys]
  const index = keys.findIndex(item => item === key)
  if (index !== -1) {
    keys.splice(index, 1)
  }
  setExpandedKeys(keys)
}

watchEffect(() => {
  state.expandedKeys = props.expandedKeys
})

watchEffect(() => {
  state.selectedKeys = props.selectedKeys
})

watchEffect(() => {
  state.checkedKeys = props.checkedKeys
})
watch(
  () => state.checkedKeys,
  () => {
    const v = toRaw(state.checkedKeys)
    emits('update:value', v)
    emits('change', v)
  },
)
watchEffect(() => {
  state.checkStrictly = props.checkStrictly
})

function handleCommand(command: string) {
  switch (command) {
    case 'checkAll':
      treeRef.value?.setCheckedKeys(getEnabledKeys())
      break
    case 'uncheckAll':
      treeRef.value?.setCheckedKeys([])
      break
    case 'expand':
      expandAll(true)
      break
    case 'fold':
      expandAll(false)
      break
    case 'checkStrictly':
      onStrictlyChange(false)
      break
    case 'checkUnStrictly':
      onStrictlyChange(true)
      break
    default:
      break
  }
}

function onStrictlyChange(strictly: boolean) {
  state.checkStrictly = strictly
  nextTick(() => {
    treeRef.value?.setCheckedKeys(getCheckedKeys() as KeyType[], true)
  })
}

const attrs = useAttrs()
const getBindValues = computed(() => {
  const propsData = {
    ...attrs,
    ...props,
    'defaultExpandedKeys': state.expandedKeys,
    'check-strictly': state.checkStrictly,
    'show-checkbox': props.checkable,
    'node-key': toValue(getFieldNames).key,
    'props': unref(getFieldNames),
    'onUpdate:expandedKeys': (v: KeyType[]) => {
      state.expandedKeys = v
      emits('update:expandedKeys', v)
    },
    'onCurrentChange': (node: any) => {
      if (node) {
        state.selectedKeys = [node.key]
        emits('select', [node.key])
        emits('update:selectedKeys', [node.key])
      }
      else {
        state.selectedKeys = []
        emits('select', [])
        emits('update:selectedKeys', [])
      }
    },
    'onCheck': (_node: any, v: any) => {
      state.checkedKeys = v.checkedKeys

      const rawVal = toRaw(state.checkedKeys)
      emits('update:value', rawVal)
      emits('check', rawVal, v)
    },
  }
  return omit(propsData, 'treeData', 'class')
})
const slots = useSlots()
defineExpose({
  getCheckedKeys,
  getSelectedKeys,
  getExpandedKeys,
  setCheckedKeys,
  setExpandedKeys,
  setSelectedKeys,
  getHalfCheckedKeys,
  expandAll,
  filterByLevel,
  getAllKeys,
  getEnabledKeys,
})
</script>

<template>
  <div class="min-h-0 flex flex-col">
    <div v-if="title || toolbar || search || slots.headerTitle" class="title tree-header flex items-center py-1.5">
      <slot name="headerTitle">
        <span v-if="title" class="ml-5 mr-1">{{ title }}</span>
      </slot>
      <div class="cursor-pointe flex flex-1 items-center">
        <ElInput v-if="search" v-model="filterText" class="ml-5 mr-1 w-full" :placeholder="t('common.searchText')">
          <template #append>
            <SvgIcon name="i-ep:search" />
          </template>
        </ElInput>
        <slot name="toolbar">
          <ElDropdown v-if="toolbar" class="inline" @command="handleCommand">
            <SvgIcon :size="26" class="ml-1 mr-1" name="i-ant-design:more-outlined" />
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem v-if="toolbarStrictly" command="checkAll">
                  {{ t('component.tree.selectAll') }}
                </ElDropdownItem>
                <ElDropdownItem v-if="toolbarStrictly" command="uncheckAll">
                  {{ t('component.tree.unSelectAll') }}
                </ElDropdownItem>
                <ElDropdownItem command="expand" :divided="checkable">
                  {{ t('component.tree.expandAll') }}
                </ElDropdownItem>
                <ElDropdownItem command="fold">
                  {{ t('component.tree.unExpandAll') }}
                </ElDropdownItem>
                <ElDropdownItem v-if="checkable" command="checkStrictly" divided>
                  {{ t('component.tree.checkStrictly') }}
                </ElDropdownItem>
                <ElDropdownItem v-if="checkable" command="checkUnStrictly">
                  {{ t('component.tree.checkUnStrictly') }}
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </slot>
      </div>
    </div>
    <ElScrollbar v-loading="loading">
      <ElTree
        ref="treeRef" :data="treeDataRef" :expand-on-click-node="false" :filter-node-method="filterNode"
        class="filter-tree" highlight-current
        v-bind="getBindValues"
        @node-click="handleClickNode"
        @check-change="onCheckChange"
        @node-expand="onExpand"
        @node-collapse="onCollapse"
      >
        <template #default="{ node, data }">
          <slot name="default" :data="data" :node="node">
            <div
              class="custom-tree-node"
            >
              <slot name="title" :data="data">
                <span class="h-6 flex flex-items-center lh-6">
                  <SvgIcon v-if="data.icon" :name="data.icon" class="mr-1" />
                  <span>{{ getFieldNames.label ? data[getFieldNames.label] : node.label }}</span>
                </span>
              </slot>
              <span v-if="$slots.action" class="tree__actions h-6 lh-6">
                <slot name="action" :data="data" />
              </span>
            </div>
          </slot>
        </template>
      </ElTree>
    </ElScrollbar>
  </div>
</template>

<style scoped>
.tree-header {
  border-bottom: 1px solid #d9d9d9;
}

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
    margin-right: 4px;
    visibility: hidden;
  }
}
</style>
