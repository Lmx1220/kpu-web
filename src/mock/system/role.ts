import Mock from 'mockjs'

const AllList: any[] = []
for (let i = 0; i < 50; i++) {
  AllList.push(Mock.mock({
    id: '@id',
    title: '@ctitle(10, 20)',
  }))
}

export default [
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
        error: '',
        status: 1,
        data: {
          list: pageList,
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
        error: '',
        status: 1,
        data: info[0],
      }
    },
  },
  {
    url: '/mock/system/role/create',
    method: 'post',
    response: {
      error: '',
      status: 1,
      data: {
        isSuccess: true,
      },
    },
  },
  {
    url: '/mock/system/role/edit',
    method: 'post',
    response: {
      error: '',
      status: 1,
      data: {
        isSuccess: true,
      },
    },
  },
  {
    url: '/mock/system/role/delete',
    method: 'post',
    response: {
      error: '',
      status: 1,
      data: {
        isSuccess: true,
      },
    },
  },
]
