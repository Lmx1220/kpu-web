export interface RolePageQuery {
  category?: string // 角色类别
  name?: string // 名称
  code?: string // 编码
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置角色
}

export interface RoleSaveVO {
  category?: string // 角色类别
  name?: string // 名称
  code?: string // 编码
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置角色
}

export interface RoleUpdateVO {
  id: string
  category?: string // 角色类别
  name?: string // 名称
  code?: string // 编码
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置角色
}

export interface RoleResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人id
  createdTime?: string // 创建时间
  updatedBy?: string // 更新人id
  updatedTime?: string // 更新时间
  category?: string // 角色类别
  name?: string // 名称
  code?: string // 编码
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置角色
}

export interface RoleResourceSaveVO {
  menuIdList: string[]
  roleId: string
}

export interface RoleUserSaveVO {
  flag: boolean
  userIdList: string[]
  roleId: string | number
}
