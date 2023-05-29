import api from '@/api'

// 前缀 变量
const prefix = '/menu'
export default {
  // 后端获取路由数据
  list: <T>() => api.get<T>({
    url: `${prefix}/list`,
    // noLoading: true,
  }),
  // // 基于文件系统路由模式下，后端获取导航菜单数据
  detail: <T> (id: string) => api.get<T>({
    url: `${prefix}/detail`,
    params: {
      id,
    },
  }),
  create: <T> (data: any) => api.post<T>({
    url: `${prefix}/create`,
    data,
  }),
  edit: <T> (data: any) => api.post<T>({
    url: `${prefix}/edit`,
    data,
  }),
  delete: <T> (id: string) => api.post<T>({
    url: `${prefix}/delete`,
    data: {
      id,
    },
  }),
  moveUp: <T> (id: string) => api.post<T>({
    url: `${prefix}/moveUp/${id}`,
  }),
  moveDown: <T> (id: string) => api.post<T>({
    url: `${prefix}/moveDown/${id}`,
  }),
  move: <T> (currentId: number, targetId: number) => api.post<T>({
    url: `${prefix}/move/${currentId}/${targetId}`,
  }),

}
