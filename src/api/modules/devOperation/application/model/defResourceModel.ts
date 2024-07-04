export interface DefResourcePageQuery {
  applicationId?: string
  code?: string
  resourceType?: string
  describe?: string
  path?: string
  component?: string
  redirect?: string
  icon?: string
  isGeneral?: boolean
  state?: boolean
  subGroup?: string
  fieldIsSecret?: boolean
  fieldIsEdit?: boolean
  metaJson?: string
  name?: string
  parentId?: string
  sortValue?: number
}

export interface DefResourceSaveVO {
  applicationId: string
  code: string
  name: string
  resourceType: string
  describe?: string
  path?: string
  component?: string
  redirect?: string
  icon?: string
  isGeneral?: boolean
  state?: boolean
  subGroup?: string
  fieldIsSecret?: boolean
  fieldIsEdit?: boolean
  metaJson?: string
  parentId?: string
  sortValue?: number
  resourceApiList?: DefResourceApiVO[]
}

export interface DefResourceUpdateVO {
  id: string
  applicationId: string

  code: string
  name: string
  resourceType: string
  describe?: string
  path?: string
  component?: string
  redirect?: string
  icon?: string
  isGeneral?: boolean
  state?: boolean
  subGroup?: string
  fieldIsSecret?: boolean
  fieldIsEdit?: boolean
  metaJson?: string
  parentId?: string
  sortValue?: number
  resourceApiList?: DefResourceApiVO[]
}

export interface DefResourceResultVO {
  parentName?: string
  applicationId?: string
  title?: string
  dataScope?: string
  code?: string
  resourceType?: string
  describe?: string
  path?: string
  component?: string
  redirect?: string
  icon?: string
  isGeneral?: boolean
  state?: boolean
  subGroup?: string
  fieldIsSecret?: boolean
  fieldIsEdit?: boolean
  isDef?: boolean
  customClass?: string
  metaJson?: string
  meta: Recordable
  id?: string
  name?: string
  parentId?: string
  sortValue?: number
  createdBy?: string
  createdTime?: string
  updatedBy?: string
  updatedTime?: string
  resourceApiList?: DefResourceApiVO[]
  echoMap?: any
}

export interface DefResourceApiVO {
  resourceId: string
  name: string
  uri: string
  controller: string
  springApplicationName: string
  requestMethod: string
  isInput: boolean
  tempId?: string
  service?: string
}
