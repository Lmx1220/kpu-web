export interface ParameterPageQuery {
  key?: string // 参数键
  value?: string // 参数值
  name?: string // 参数名称
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置
}

export interface ParameterSaveVO {
  key?: string // 参数键
  value?: string // 参数值
  name?: string // 参数名称
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置
}

export interface ParameterUpdateVO {
  id: string
  key?: string // 参数键
  value?: string // 参数值
  name?: string // 参数名称
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置
}

export interface ParameterResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人id
  createdTime?: string // 创建时间
  updatedBy?: string // 更新人id
  updatedTime?: string // 更新时间
  key?: string // 参数键
  value?: string // 参数值
  name?: string // 参数名称
  remarks?: string // 描述
  state?: boolean // 状态
  readonly?: boolean // 内置
}
