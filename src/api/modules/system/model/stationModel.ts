export interface StationPageQuery {
  name?: string // 名称
  orgId?: string // 组织
  state?: boolean // 状态
  remarks?: string // 描述
  createdOrgId?: string // 创建者所属机构
  orgIdList?: string[]
}

export interface StationSaveVO {
  name?: string // 名称
  orgId?: string // 组织
  state?: boolean // 状态
  remarks?: string // 描述
  createdOrgId?: string // 创建者所属机构
}

export interface StationUpdateVO {
  id: string
  name?: string // 名称
  orgId?: string // 组织
  state?: boolean // 状态
  remarks?: string // 描述
  createdOrgId?: string // 创建者所属机构
}

export interface StationResultVO {
  echoMap?: any
  id?: string // ID
  createdTime?: string // 创建时间
  createdBy?: string // 创建人
  updatedTime?: string // 修改时间
  updatedBy?: string // 修改人
  name?: string // 名称
  orgId?: string // 组织
  state?: boolean // 状态
  remarks?: string // 描述
  createdOrgId?: string // 创建者所属机构
}
