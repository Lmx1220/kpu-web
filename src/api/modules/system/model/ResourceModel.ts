export interface ResourcePageQuery {
  code?: string // 编码
  title?: string // 标题
  applicationId?: string
  applicationName?: string
  name?: string // 名称
  resourceType?: string // 类型
  remarks?: string // 描述
  isGeneral?: boolean // 通用菜单
  redirect?: string // 重定向
  path?: string // 路径
  component?: string // 组件
  state?: boolean // 状态
  sortValue?: number // 排序
  icon?: string // 菜单图标
  activeIcon?: string // 激活菜单图标
  group?: string // 分组
  dataScope?: string // 数据范围
  customClass?: string // 实现类
  isDef?: boolean // 是否默认
  parentId?: string // 父级菜单ID
  treeGrade?: number // 树层级
  treePath?: string // 树路径
  metaJson?: string // 路由信息配置
}

export interface ResourceSaveVO {
  code?: string // 编码
  title?: string // 标题
  name?: string // 名称
  resourceType?: string // 类型
  remarks?: string // 描述
  isGeneral?: boolean // 通用菜单
  redirect?: string // 重定向
  path?: string // 路径
  component?: string // 组件
  state?: boolean // 状态
  sortValue?: number // 排序
  icon?: string // 菜单图标
  activeIcon?: string // 激活菜单图标
  group?: string // 分组
  dataScope?: string // 数据范围
  customClass?: string // 实现类
  isDef?: boolean // 是否默认
  parentId?: string // 父级菜单ID
  treeGrade?: number // 树层级
  treePath?: string // 树路径
  metaJson?: string // 路由信息配置
}

export interface ResourceUpdateVO {
  id: string
  code?: string // 编码
  title?: string // 标题
  name?: string // 名称
  resourceType?: string // 类型
  remarks?: string // 描述
  isGeneral?: boolean // 通用菜单
  redirect?: string // 重定向
  path?: string // 路径
  component?: string // 组件
  state?: boolean // 状态
  sortValue?: number // 排序
  icon?: string // 菜单图标
  activeIcon?: string // 激活菜单图标
  group?: string // 分组
  dataScope?: string // 数据范围
  customClass?: string // 实现类
  isDef?: boolean // 是否默认
  parentId?: string // 父级菜单ID
  treeGrade?: number // 树层级
  treePath?: string // 树路径
  metaJson?: string // 路由信息配置
}

export interface ResourceResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人id
  createdTime?: string // 创建时间
  updatedBy?: string // 更新人id
  updatedTime?: string // 更新时间
  code?: string // 编码
  title?: string // 标题
  name?: string // 名称
  resourceType?: string // 类型
  remarks?: string // 描述
  isGeneral?: boolean // 通用菜单
  redirect?: string // 重定向
  path?: string // 路径
  component?: string // 组件
  state?: boolean // 状态
  sortValue?: number // 排序
  icon?: string // 菜单图标
  activeIcon?: string // 激活菜单图标
  group?: string // 分组
  dataScope?: string // 数据范围
  customClass?: string // 实现类
  isDef?: boolean // 是否默认
  parentId?: string // 父级菜单ID
  treeGrade?: number // 树层级
  treePath?: string // 树路径
  metaJson?: string // 路由信息配置
  meta: Record<string, any>
  auths: Record<string, any>[]
  children?: Record<string, any>[]
  //
  parentName?: string
  applicationId?: string
  subGroup?: string
  fieldIsSecret?: boolean
  fieldIsEdit?: boolean
  isHidden?: boolean
  resourceApiList?: any
}
