export interface LoginLogPageQuery {
  requestIp?: string // 登录IP
  userId?: string // 登录人ID
  nickName?: string // 登录人姓名
  username?: string // 登录人账号
  description?: string // 登录描述
  loginDate?: string // 登录时间
  ua?: string // 浏览器请求头
  browser?: string // 浏览器名称
  browserVersion?: string // 浏览器版本
  operatingSystem?: string // 操作系统
  location?: string // 登录地点
  status?: string // 登录状态
}

export interface LoginLogSaveVO {
  requestIp?: string // 登录IP
  userId?: string // 登录人ID
  nickName?: string // 登录人姓名
  username?: string // 登录人账号
  description?: string // 登录描述
  loginDate?: string // 登录时间
  ua?: string // 浏览器请求头
  browser?: string // 浏览器名称
  browserVersion?: string // 浏览器版本
  operatingSystem?: string // 操作系统
  location?: string // 登录地点
  status?: string // 登录状态
}

export interface LoginLogUpdateVO {
  id: string
  requestIp?: string // 登录IP
  userId?: string // 登录人ID
  nickName?: string // 登录人姓名
  username?: string // 登录人账号
  description?: string // 登录描述
  loginDate?: string // 登录时间
  ua?: string // 浏览器请求头
  browser?: string // 浏览器名称
  browserVersion?: string // 浏览器版本
  operatingSystem?: string // 操作系统
  location?: string // 登录地点
  status?: string // 登录状态
}

export interface LoginLogResultVO {
  echoMap?: any
  id?: string // 主键
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
  requestIp?: string // 登录IP
  userId?: string // 登录人ID
  nickName?: string // 登录人姓名
  username?: string // 登录人账号
  description?: string // 登录描述
  loginDate?: string // 登录时间
  ua?: string // 浏览器请求头
  browser?: string // 浏览器名称
  browserVersion?: string // 浏览器版本
  operatingSystem?: string // 操作系统
  location?: string // 登录地点
  status?: string // 登录状态
}
