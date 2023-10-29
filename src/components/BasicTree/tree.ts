export type KeyType = string | number

export type CheckKeys =
    | KeyType[]
    | { checked: string[] | number[]; halfChecked: string[] | number[] }
export interface TreeState {
  expandedKeys: KeyType[]
  selectedKeys: KeyType[]
  checkedKeys: KeyType[]
  checkStrictly: boolean
}
export interface FieldNames {
  children?: string
  label?: string
  key?: string
}

export interface TreeProps {
  title?: string
  toolbar?: boolean
  search?: boolean
  checkStrictly?: boolean
  toolbarStrictly?: boolean
  clickRowToExpand?: boolean
  checkable?: boolean
  defaultExpandLevel?: string | number
  defaultExpandAll?: boolean
  fieldNames?: FieldNames
  treeData: any[]
  expandedKeys?: KeyType[]
  selectedKeys?: KeyType[]
  checkedKeys?: KeyType[]
  filterFn?: (searchValue: any, node: any, fieldNames: FieldNames) => boolean
  // 高亮搜索值，仅高亮具体匹配值（通过title）值为true时使用默认色值，值为#xxx时使用此值替代且高亮开启
  highlight?: boolean | string
  // 搜索完成时自动展开结果
  expandOnSearch?: boolean
  // 搜索完成自动选中所有结果,当且仅当 checkable===true 时生效
  checkOnSearch?: boolean
  // 搜索完成自动select所有结果
  selectedOnSearch?: boolean
  loading?: boolean
  treeWrapperClassName?: string
}
