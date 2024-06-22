export interface FilePageQuery {
  bizType?: string // 业务类型
  fileType?: string // 文件类型
  storageType?: string // 存储类型
  bucket?: string // 桶
  path?: string // 文件相对地址
  url?: string // 文件访问地址
  uniqueFileName?: string // 唯一文件名
  fileMd5?: string // 文件md5
  originalFileName?: string // 原始文件名
  contentType?: string // 文件类型
  suffix?: string // 后缀
  size?: string // 大小
}

export interface FileSaveVO {
  bizType?: string // 业务类型
  fileType?: string // 文件类型
  storageType?: string // 存储类型
  bucket?: string // 桶
  path?: string // 文件相对地址
  url?: string // 文件访问地址
  uniqueFileName?: string // 唯一文件名
  fileMd5?: string // 文件md5
  originalFileName?: string // 原始文件名
  contentType?: string // 文件类型
  suffix?: string // 后缀
  size?: string // 大小
}

export interface FileUpdateVO {
  id: string
  bizType?: string // 业务类型
  fileType?: string // 文件类型
  storageType?: string // 存储类型
  bucket?: string // 桶
  path?: string // 文件相对地址
  url?: string // 文件访问地址
  uniqueFileName?: string // 唯一文件名
  fileMd5?: string // 文件md5
  originalFileName?: string // 原始文件名
  contentType?: string // 文件类型
  suffix?: string // 后缀
  size?: string // 大小
}

export interface FileResultVO {
  echoMap?: any
  id?: string // ID
  createdBy?: string // 创建人
  createdTime?: string // 创建时间
  updatedBy?: string // 最后修改人
  updatedTime?: string // 最后修改时间
  bizType?: string // 业务类型
  fileType?: string // 文件类型
  storageType?: string // 存储类型
  bucket?: string // 桶
  path?: string // 文件相对地址
  url?: string // 文件访问地址
  uniqueFileName?: string // 唯一文件名
  fileMd5?: string // 文件md5
  originalFileName?: string // 原始文件名
  contentType?: string // 文件类型
  suffix?: string // 后缀
  size?: string // 大小
}
