import api from '@/api'
import { RequestEnum } from '@/enums/httpEnum.ts'

// 前缀 变量
const prefix = '/resource'

export function resourceAuthTree<T>(resourceOnly = true) {
  return api.post<T>({
    url: `${prefix}/resourceResourceTree?resourceOnly=${resourceOnly}`,
  })
}

export function move<T>(currentId: string, targetId: string) {
  return api.post<T>({
    url: `${prefix}/move/${currentId}/${targetId || 0}`,
  })
}

export default {
  // 后端获取路由数据
  list: <T>() => api.post<T>({
    url: `${prefix}/treeResourceAndView`,

  }, {
    errorMessageMode: 'message',
  }),
  // // 基于文件系统路由模式下，后端获取导航菜单数据
  detail: <T>(id: string) => api.get<T>({
    url: `${prefix}/${id}`,
  }),
  create: <T>(data: any) => api.post<T>({
    url: `${prefix}`,
    data,
  }),
  edit: <T>(data: any) => api.put<T>({
    url: `${prefix}`,
    data,
  }),
  delete: <T>(params: string[]) => api.request<T>({
    method: RequestEnum.DELETE,
    url: `${prefix}`,
    params,
  }),
  resourceAuthTree,
  moveUp: <T>(id: string) => api.post<T>({
    url: `${prefix}/moveUp/${id}`,
  }),
  moveDown: <T>(id: string) => api.post<T>({
    url: `${prefix}/moveDown/${id}`,
  }),
  move: <T>(currentId: number, targetId: number) => api.post<T>({
    url: `${prefix}/move/${currentId}/${targetId}`,
  }),

}
