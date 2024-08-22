import defHttp from '@/api'

export function login(data: {
  account: string
  password: string
}) {
  return defHttp.post({
    url: '/login',
    data,
    baseURL: '/mock/',
  })
}

export function getUserInfoById(userId?: string) {
  return defHttp.get<DefUserInfoResultVO>({
    url: '/anyone/getUserInfoById',
    timeout: 2 * 60 * 1000,
    params: { userId },
  })
}

// 获取收藏夹
export function favorites() {
  return defHttp.get({
    url: '/user/favorites',
    baseURL: '/mock/',
  })
}
/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<{
    data: string
    status: number
  }>('/mock/auth/refresh', {
    withCredentials: true,
  })
}

// 修改收藏夹
export function favoritesEdit(favorites: string) {
  return defHttp.post({
    url: '/user/favorites/edit',
    data: {
      favorites,
    },
    baseURL: '/mock/',
  })
}
