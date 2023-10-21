export interface UserPageQuery {
  username?: string // 账号
  nickName?: string // 姓名
  orgId?: string // 组织
  stationId?: string // 岗位
  readonly?: boolean // 内置
  email?: string // 邮箱
  mobile?: string // 手机
  sex?: string // 性别
  state?: boolean // 状态
  avatar?: string // 头像
  nation?: string // 民族
  education?: string // 学历
  positionStatus?: string // 职位状态
  workDescribe?: string // 工作描述
  passwordErrorLastTime?: string // 最后一次输错密码时间
  passwordErrorNum?: number // 密码错误次数
  passwordExpireTime?: string // 密码过期时间
  password?: string // 密码
  salt?: string // 密码盐
  lastLoginTime?: string // 最后登录时间
  createdOrgId?: string // 创建者所属机构
}

export interface UserSaveVO {
  username?: string // 账号
  nickName?: string // 姓名
  orgId?: string // 组织
  stationId?: string // 岗位
  readonly?: boolean // 内置
  email?: string // 邮箱
  mobile?: string // 手机
  sex?: string // 性别
  state?: boolean // 状态
  avatar?: string // 头像
  nation?: string // 民族
  education?: string // 学历
  positionStatus?: string // 职位状态
  workDescribe?: string // 工作描述
  passwordErrorLastTime?: string // 最后一次输错密码时间
  passwordErrorNum?: number // 密码错误次数
  passwordExpireTime?: string // 密码过期时间
  password?: string // 密码
  salt?: string // 密码盐
  lastLoginTime?: string // 最后登录时间
  createdOrgId?: string // 创建者所属机构
}

export interface UserUpdateVO {
  id: string
  username?: string // 账号
  nickName?: string // 姓名
  orgId?: string // 组织
  stationId?: string // 岗位
  readonly?: boolean // 内置
  email?: string // 邮箱
  mobile?: string // 手机
  sex?: string // 性别
  state?: boolean // 状态
  avatar?: string // 头像
  nation?: string // 民族
  education?: string // 学历
  positionStatus?: string // 职位状态
  workDescribe?: string // 工作描述
  passwordErrorLastTime?: string // 最后一次输错密码时间
  passwordErrorNum?: number // 密码错误次数
  passwordExpireTime?: string // 密码过期时间
  password?: string // 密码
  salt?: string // 密码盐
  lastLoginTime?: string // 最后登录时间
  createdOrgId?: string // 创建者所属机构
}

export interface UserResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人id
  createdTime?: string // 创建时间
  updatedBy?: string // 更新人id
  updatedTime?: string // 更新时间
  username?: string // 账号
  nickName?: string // 姓名
  orgId?: string // 组织
  stationId?: string // 岗位
  readonly?: boolean // 内置
  email?: string // 邮箱
  mobile?: string // 手机
  sex?: string // 性别
  state?: boolean // 状态
  avatar?: string // 头像
  nation?: string // 民族
  education?: string // 学历
  positionStatus?: string // 职位状态
  workDescribe?: string // 工作描述
  passwordErrorLastTime?: string // 最后一次输错密码时间
  passwordErrorNum?: number // 密码错误次数
  passwordExpireTime?: string // 密码过期时间
  password?: string // 密码
  salt?: string // 密码盐
  lastLoginTime?: string // 最后登录时间
  createdOrgId?: string // 创建者所属机构
}

export interface UserRoleSaveVO {
  flag: boolean
  roleIdList: string[]
  userId: string | number
}
