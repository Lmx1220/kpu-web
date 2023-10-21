export interface DatasourceConfigPageQuery {
  name?: string // 名称
  username?: string // 账号
  password?: string // 密码
  url?: string // 链接
  driverClassName?: string // 驱动
}

export interface DatasourceConfigSaveVO {
  name?: string // 名称
  username?: string // 账号
  password?: string // 密码
  url?: string // 链接
  driverClassName?: string // 驱动
}

export interface DatasourceConfigUpdateVO {
  id: string
  name?: string // 名称
  username?: string // 账号
  password?: string // 密码
  url?: string // 链接
  driverClassName?: string // 驱动
}

export interface DatasourceConfigResultVO {
  echoMap?: any
  id?: string // 主键ID
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 修改人
  updatedTime?: string // 修改时间
  name?: string // 名称
  username?: string // 账号
  password?: string // 密码
  url?: string // 链接
  driverClassName?: string // 驱动
}
