export interface DictItemPageQuery {
  parentId?: string //
  parentKey?: string //
  classify?: string // 类型标签
  key?: string // 类型
  name?: string // 名称
  state?: boolean // 状态
  remark?: string // 描述
  sortValue?: number // 排序
  icon?: string // 图标
  cssStyle?: string // css样式
  cssClass?: string // css class
}

export interface DictItemSaveVO {
  parentId?: string //
  parentKey?: string //
  classify?: string // 类型标签
  key?: string // 类型
  name?: string // 名称
  state?: boolean // 状态
  remark?: string // 描述
  sortValue?: number // 排序
  icon?: string // 图标
  cssStyle?: string // css样式
  cssClass?: string // css class
}

export interface DictItemUpdateVO {
  id: string
  parentId?: string //
  parentKey?: string //
  classify?: string // 类型标签
  key?: string // 类型
  name?: string // 名称
  state?: boolean // 状态
  remark?: string // 描述
  sortValue?: number // 排序
  icon?: string // 图标
  cssStyle?: string // css样式
  cssClass?: string // css class
}

export interface DictItemResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人id
  createdTime?: string // 创建时间
  updatedBy?: string // 更新人id
  updatedTime?: string // 更新时间
  parentId?: string //
  parentKey?: string //
  classify?: string // 类型标签
  key?: string // 类型
  name?: string // 名称
  state?: boolean // 状态
  remark?: string // 描述
  sortValue?: number // 排序
  icon?: string // 图标
  cssStyle?: string // css样式
  cssClass?: string // css class
}
