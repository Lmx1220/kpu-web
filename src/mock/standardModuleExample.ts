// import { faker } from '@faker-js/faker'
// import { defineFakeRoute } from 'vite-plugin-fake-server/client'
//
// const AllList: any[] = []
// for (let i = 0; i < 50; i++) {
//   AllList.push({
//     id: faker.string.uuid(),
//     productName: faker.commerce.productName(),
//     category: faker.commerce.department(),
//     color: faker.color.human(),
//     price: faker.commerce.price(),
//     releaseDate: faker.date.past(),
//   })
// }
//
// export default defineFakeRoute(
//   [
//     {
//       url: '/mock/standardModuleExample/page',
//       method: 'post',
//       response: (option: any) => {
//         let { model: { category, productName }, current = 0, size = 10 } = option.body
//         current = ~~current
//         size = ~~size
//         const list = AllList.filter((item) => {
//           return category ? item.category.includes(category) : productName ? item.productName.includes(productName) : true
//         })
//         const pageList = list.filter((_item, index) => {
//           return index >= ~~current && index < (~~current + ~~size)
//         })
//         return {
//           msg: '',
//           code: 0,
//           data: {
//             records: pageList,
//             total: list.length,
//             current,
//           },
//         }
//       },
//     },
//     {
//       url: '/mock/standardModuleExample/detail',
//       method: 'get',
//       response: (option: any) => {
//         const info = AllList.filter(item => item.id === option.query.id)
//         return {
//           msg: '',
//           code: 0,
//           data: info[0],
//         }
//       },
//     },
//     {
//       url: '/mock/standardModuleExample/option',
//       method: 'get',
//       response: () => {
//         const option = AllList.map(item => ({ label: item.title, value: item.id }))
//         return {
//           msg: '',
//           code: 0,
//           data: option,
//         }
//       },
//     },
//     {
//       url: '/mock/standardModuleExample/create',
//       method: 'post',
//       response: () => {
//         return {
//           msg: '',
//           code: 0,
//           data: {
//             isSuccess: true,
//           },
//         }
//       },
//     },
//     {
//       url: '/mock/standardModuleExample/edit',
//       method: 'post',
//       response: () => {
//         return {
//           msg: '',
//           code: 0,
//           data: {
//             isSuccess: true,
//           },
//         }
//       },
//     },
//     {
//       url: '/mock/standardModuleExample',
//       method: 'delete',
//       response: () => {
//         return {
//           msg: '',
//           code: 0,
//           data: {
//             isSuccess: true,
//           },
//         }
//       },
//     },
//   ],
// )
