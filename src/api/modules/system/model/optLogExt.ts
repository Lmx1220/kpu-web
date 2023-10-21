export interface OptLogExtPageQuery {
  params?: string // 请求参数
  result?: string // 返回值
  exDetail?: string // 异常描述
}

export interface OptLogExtSaveVO {
  params?: string // 请求参数
  result?: string // 返回值
  exDetail?: string // 异常描述
}

export interface OptLogExtUpdateVO {
  id: string
  params?: string // 请求参数
  result?: string // 返回值
  exDetail?: string // 异常描述
}

export interface OptLogExtResultVO {
  echoMap?: any
  id?: string // 主键
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
  params?: string // 请求参数
  result?: string // 返回值
  exDetail?: string // 异常描述
}
