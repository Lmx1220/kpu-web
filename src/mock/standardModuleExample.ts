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
    url: '/mock/standardModuleExample/page',
    method: 'post',
    response: (option: any) => {
      let { model: { title }, current = 0, size = 10 } = option.body
      current = ~~current
      size = ~~size
      const list = AllList.filter((item) => {
        return title ? item.title.includes(title) : true
      })
      const pageList = list.filter((item, index) => {
        return index >= current && index < (current + size)
      })
      return {
        msg: '',
        code: 0,
        data: {
          records: pageList,
          total: list.length,
          current,
        },
      }
    },
  },
  {
    url: '/mock/standardModuleExample/detail',
    method: 'get',
    response: (option: any) => {
      const info = AllList.filter(item => item.id === option.query.id)
      return {
        msg: '',
        code: 0,
        data: info[0],
      }
    },
  },
  {
    url: '/mock/standardModuleExample/create',
    method: 'post',
    response: () => {
      return {
        msg: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      }
    },
  },
  {
    url: '/mock/standardModuleExample/edit',
    method: 'post',
    response: () => {
      return {
        msg: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      }
    },
  },
  {
    url: '/mock/standardModuleExample',
    method: 'delete',
    response: () => {
      return {
        msg: '',
        code: 0,
        data: {
          isSuccess: true,
        },
      }
    },
  },
]
