import { requestClient } from '@/api'

export function login(data: {
  account: string
  password: string
}) {
  return requestClient.post('/login', data, { baseURL: '/mock/' })
}

// 获取收藏夹
export function favorites() {
  return requestClient.get('/user/favorites', {
    baseURL: '/mock/',
  })
}
/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return requestClient.post<{
    data: string
    status: number
  }>('/auth/refresh', {}, {
    withCredentials: true,
    baseURL: '/mock/',
  })
}

// 修改收藏夹
export function favoritesEdit(favorites: string) {
  return requestClient.post('/user/favorites/edit', favorites, { baseURL: '/mock/' })
}
