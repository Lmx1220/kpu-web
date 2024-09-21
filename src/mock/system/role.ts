import Mock from 'mockjs'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

const AllList: any[] = []
for (let i = 0; i < 50; i++) {
  AllList.push(Mock.mock({
    id: '@id',
    title: '@ctitle(10, 20)',
  }))
}

export default defineFakeRoute([
  {
    url: '/mock/system/role/list',
    method: 'get',
    response: (option: any) => {
      let { title, from = 0, limit = 10 } = option.query
      from = ~~from
      limit = ~~limit
      const list = AllList.filter((item) => {
        return title ? item.title.includes(title) : true
      })
      const pageList = list.filter((item, index) => {
        return index >= from && index < (from + limit)
      })
      return {
        errorMsg: '',
        code: 0,
        data: {
          records: pageList,
          total: list.length,
        },
      }
    },
  },
  {
    url: '/mock/system/role/detail',
    method: 'get',
    response: (option: any) => {
      const info = AllList.filter(item => item.id === option.query.id)
      return {
        errorMsg: '',
        code: 0,
        data: info[0],
      }
    },
  },
  {
    url: '/mock/system/role',
    method: 'post',
    response: () => ({
      errorMsg: '',
      code: 0,
      data: {
        isSuccess: true,
      },
    }),
  },
  {
    url: '/mock/system/role',
    method: 'put',
    response: () => ({
      errorMsg: '',
      code: 0,
      data: {
        isSuccess: true,
      },
    }),
  },
  {
    url: '/mock/system/role',
    method: 'delete',
    response: () => ({
      errorMsg: '',
      code: 0,
      data: {
        isSuccess: true,
      },
    }),
  },
])
