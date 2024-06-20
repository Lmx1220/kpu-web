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
