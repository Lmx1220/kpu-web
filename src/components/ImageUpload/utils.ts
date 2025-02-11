import { uploadFile } from '@/api/modules/file/upload.ts'

export async function httpUpload(options: any) {
  try {
    const response = await uploadFile({
      file: options.file,
      ...options.data,
    }, (progressEvent) => {
      // 计算上传进度百分比
      const percentageCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100))

      // 触发 Element UI 的上传进度钩子
      options.onProgress({ percent: percentageCompleted })
    })
    // 文件上传成功后的操作
    // options.onSuccess(response, options.file)
    return response
  }
  catch (error) {
    options.onError(error)
  }
  // return response
}
