import type { AxiosRequestConfig } from 'axios'
import type { ProjectGeneratorVO } from './model/defGenProjectModel.ts'
import defHttp from '@/api'
import { RequestEnum } from '@/enums/httpEnum'

const ServicePrefix = ''
const MODULAR = 'defGenProject'

export const Api = {
  GetDef: {
    url: `${ServicePrefix}/${MODULAR}/getDef`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Generator: {
    url: `${ServicePrefix}/${MODULAR}/generator`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
  Download: {
    url: `${ServicePrefix}/${MODULAR}/download`,
    method: RequestEnum.POST,
  } as AxiosRequestConfig,
}

export const getDef = () => defHttp.request<ProjectGeneratorVO>({ ...Api.GetDef })

export function generator(params: ProjectGeneratorVO) {
  return defHttp.request<boolean>({
    ...Api.Generator,
    params,
  })
}
export function download(params: ProjectGeneratorVO) {
  return defHttp.request<any>(
    {
      ...Api.Download,
      responseType: 'blob',
      params,
    },
    { isReturnNativeResponse: true },
  )
}
