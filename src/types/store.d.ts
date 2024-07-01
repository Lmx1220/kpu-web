import type { BaseEmployeeResultVO } from '/@/api/model/baseEmployeeModel'

export interface UserInfo {
  // 用户id
  id: string | number
  // 用户名
  account?: string
  // 真实名字
  name?: string
  // 介绍
  workDescribe?: string
  avatarId?: string
  homePath?: string
}

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}

export interface DefUserInfoResultVO {
  echoMap: Recordable
  createdTime: string
  createdBy: string
  updatedTime: string
  updatedBy: string
  id: string
  username: string
  nickName: string
  email: string
  mobile: string
  idCard: string
  wxOpenId: string
  ddOpenId: string
  readonly: boolean
  sex: string
  nation: string
  education: string
  state: boolean
  avatarId?: string
  workDescribe: string
  employeeId: string
  baseEmployee: BaseEmployeeResultVO
  defApplication: DefApplicationResultVO
  homePath?: string
}
