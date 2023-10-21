export interface OptLogPageQuery {
  id?: string // 主键
  requestIp?: string // 操作IP
  type?: string // 日志类型
  nickName?: string // 操作人
  description?: string // 操作描述
  classPath?: string // 类路径
  actionMethod?: string // 请求方法
  requestUri?: string // 请求地址
  httpMethod?: string // 请求类型
  startTime?: string // 开始时间
  finishTime?: string // 完成时间
  consumingTime?: string // 消耗时间
  ua?: string // 浏览器
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
}

export interface OptLogSaveVO {
  id?: string // 主键
  requestIp?: string // 操作IP
  type?: string // 日志类型
  nickName?: string // 操作人
  description?: string // 操作描述
  classPath?: string // 类路径
  actionMethod?: string // 请求方法
  requestUri?: string // 请求地址
  httpMethod?: string // 请求类型
  startTime?: string // 开始时间
  finishTime?: string // 完成时间
  consumingTime?: string // 消耗时间
  ua?: string // 浏览器
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
}

export interface OptLogUpdateVO {
  id: string
  requestIp?: string // 操作IP
  type?: string // 日志类型
  nickName?: string // 操作人
  description?: string // 操作描述
  classPath?: string // 类路径
  actionMethod?: string // 请求方法
  requestUri?: string // 请求地址
  httpMethod?: string // 请求类型
  startTime?: string // 开始时间
  finishTime?: string // 完成时间
  consumingTime?: string // 消耗时间
  ua?: string // 浏览器
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
}

export interface OptLogResultVO {
  id?: string // 主键
  requestIp?: string // 操作IP
  type?: string // 日志类型
  nickName?: string // 操作人
  description?: string // 操作描述
  classPath?: string // 类路径
  actionMethod?: string // 请求方法
  requestUri?: string // 请求地址
  httpMethod?: string // 请求类型
  startTime?: string // 开始时间
  finishTime?: string // 完成时间
  consumingTime?: string // 消耗时间
  ua?: string // 浏览器
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
}
