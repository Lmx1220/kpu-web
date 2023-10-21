export interface OrgPageQuery {
  name?: string // 名称
  type?: string // 类型
  abbreviation?: string // 简称
  parentId?: string // 父ID
  treePath?: string // 树结构
  sortValue?: number // 排序
  state?: boolean // 状态
  remarks?: string // 描述
}

export interface OrgSaveVO {
  name?: string // 名称
  type?: string // 类型
  abbreviation?: string // 简称
  parentId?: string // 父ID
  treePath?: string // 树结构
  sortValue?: number // 排序
  state?: boolean // 状态
  remarks?: string // 描述
}

export interface OrgUpdateVO {
  id: string
  name?: string // 名称
  type?: string // 类型
  abbreviation?: string // 简称
  parentId?: string // 父ID
  treePath?: string // 树结构
  sortValue?: number // 排序
  state?: boolean // 状态
  remarks?: string // 描述
}

export interface OrgResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
  name?: string // 名称
  type?: string // 类型
  abbreviation?: string // 简称
  parentId?: string // 父ID
  treePath?: string // 树结构
  sortValue?: number // 排序
  state?: boolean // 状态
  remarks?: string // 描述
}
