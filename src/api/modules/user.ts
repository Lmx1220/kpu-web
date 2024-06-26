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

// 获取收藏夹
export function favorites() {
  return defHttp.get({
    url: '/user/favorites',
    baseURL: '/mock/',
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
