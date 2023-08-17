export interface UploadApiResult {
  bizType: string
  bucket: string
  contentType: string
  fileMd5: string | null
  fileType: string
  id: string
  originalFileName: string
  path: string
  size: string
  storageType: string
  suffix: string
  uniqueFileName: string
  url: string
}
