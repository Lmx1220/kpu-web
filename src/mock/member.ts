import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/mock/anyTenant/login',
    method: 'post',
    response: ({ body }) => {
      return {
        msg: '',
        code: 0,
        data: {
          username: body.username,
          // token: '@string',
          expiration: `${Math.ceil(new Date().getTime()) + (24 * 60 * 60 * 1000)}`,
          token: `${body.username}_@string`,
          avatar: 'https://one-step-admin.hurui.me/logo.png',
        },
      }
    },
  },
  {
    url: '/mock/auth/refresh',
    method: 'post',
    response: (option: any) => {
      return {
        msg: '',
        code: 0,
        data: {
          withCredentials: option.body.withCredentials,
          token: '@string',
        },
      }
    },
  },
  {
    url: '/mock/anyone/visible/resource',
    method: 'get',
    response: (option: any) => {
      let permissions: string[] = []
      if (option.query.account === 'kpu') {
        permissions = [
          'permission.browse',
          'permission.create',
          'permission.edit',
          'permission.remove',
        ]
      }
      else if (option.query.account === 'test') {
        permissions = [
          'permission.browse',
        ]
      }
      return {
        msg: '',
        code: 0,
        data: {
          resourceList: permissions,
          roleList: [],
        },
      }
    },
  },
  {
    url: '/mock/member/edit/password',
    method: 'post',
    response: () => ({
      msg: '',
      code: 0,
      data: {
        isSuccess: true,
      },
    }),
  },
])
