// import pack from './package.json'
//
// const main = {
//   dependencies: pack.dependencies,
//   devDependencies: pack.devDependencies,
// }
// const dev = {
//   dependencies: {
//     '@antv/g2plot': '^2.4.32',
//     '@bytemd/plugin-gfm': '^1.21.0',
//     '@bytemd/vue-next': '^1.21.0',
//     '@headlessui/vue': '^1.7.23',
//     '@imengyu/vue3-context-menu': '^1.4.3',
//     '@tinymce/tinymce-vue': '^6.0.1',
//     '@visactor/vchart': '^1.12.8',
//     '@vue-office/docx': '^1.6.2',
//     '@vue-office/excel': '^1.7.11',
//     '@vue-office/pdf': '^2.0.6',
//     '@vueuse/components': '^11.1.0',
//     '@vueuse/core': '^11.1.0',
//     '@vueuse/integrations': '^11.1.0',
//     'animate.css': '^4.1.1',
//     'axios': '^1.7.7',
//     'bytemd': '^1.21.0',
//     'cropperjs': '^1.6.2',
//     'dayjs': '^1.11.13',
//     'defu': '^6.1.4',
//     'disable-devtool': '^0.3.8',
//     'echarts': '^5.5.1',
//     'element-plus': '^2.8.5',
//     'eruda': '^3.4.0',
//     'floating-vue': '5.2.2',
//     'hotkeys-js': '^3.13.7',
//     'lodash-es': '^4.17.21',
//     'medium-zoom': '^1.1.0',
//     'mitt': '^3.0.1',
//     'mockjs': '^1.1.0',
//     'nprogress': '^0.2.0',
//     'overlayscrollbars': '^2.10.0',
//     'overlayscrollbars-vue': '^0.5.9',
//     'path-browserify': '^1.0.1',
//     'path-to-regexp': '^8.2.0',
//     'pinia': '^2.2.4',
//     'pinyin-pro': '^3.25.0',
//     'print-js': '^1.6.0',
//     'qrcode': '^1.5.4',
//     'qs': '^6.13.0',
//     'scule': '^1.3.0',
//     'sortablejs': '^1.15.3',
//     'spinkit': '^2.0.1',
//     'splitpanes': '^3.1.5',
//     'swiper': '^11.1.14',
//     'timeago.js': '^4.0.2',
//     'tinymce': '^7.4.1',
//     'v-wave': '^3.0.2',
//     'vconsole': '^3.15.1',
//     'vue': '^3.5.12',
//     'vue-currency-input': '^3.1.0',
//     'vue-esign': '^1.1.4',
//     'vue-hooks-plus': '^2.2.1',
//     'vue-i18n': '^10.0.4',
//     'vue-m-message': '^4.0.2',
//     'vue-router': '^4.4.5',
//     'vue3-count-to': '^1.1.2',
//     'vxe-table': '^4.7.16',
//     'watermark-js-plus': '^1.5.7',
//     'xe-utils': '^3.5.31',
//   },
//   devDependencies: {
//     '@antfu/eslint-config': '^3.8.0',
//     '@iconify/json': '^2.2.261',
//     '@iconify/vue': '^4.1.2',
//     '@intlify/unplugin-vue-i18n': '^5.2.0',
//     '@stylistic/stylelint-config': '^2.0.0',
//     '@types/lodash-es': '^4.17.12',
//     '@types/mockjs': '^1.0.10',
//     '@types/nprogress': '^0.2.3',
//     '@types/path-browserify': '^1.0.3',
//     '@types/qrcode': '^1.5.5',
//     '@types/qs': '^6.9.16',
//     '@types/sortablejs': '^1.15.8',
//     '@types/splitpanes': '^2.2.6',
//     '@unocss/eslint-plugin': '^0.63.4',
//     '@vitejs/plugin-legacy': '^5.4.2',
//     '@vitejs/plugin-vue': '^5.1.4',
//     '@vitejs/plugin-vue-jsx': '^4.0.1',
//     'autoprefixer': '^10.4.20',
//     'boxen': '^8.0.1',
//     'eslint': '^9.12.0',
//     'esno': '^4.8.0',
//     'fs-extra': '^11.2.0',
//     'http-server': '^14.1.1',
//     'inquirer': '^12.0.0',
//     'lint-staged': '^15.2.10',
//     'npm-run-all2': '^6.2.4',
//     'picocolors': '^1.1.1',
//     'plop': '^4.0.1',
//     'postcss': '^8.4.47',
//     'postcss-nested': '^6.2.0',
//     'sass-embedded': '^1.80.2',
//     'simple-git-hooks': '^2.11.1',
//     'stylelint': '^16.10.0',
//     'stylelint-config-recess-order': '^5.1.1',
//     'stylelint-config-standard-scss': '^13.1.0',
//     'stylelint-config-standard-vue': '^1.0.0',
//     'stylelint-scss': '^6.8.1',
//     'svgo': '^3.3.2',
//     'typescript': '^5.6.3',
//     'unocss': '^0.63.4',
//     'unocss-preset-scrollbar': '^0.3.1',
//     'unplugin-auto-import': '^0.18.3',
//     'unplugin-turbo-console': '^1.10.4',
//     'unplugin-vue-components': '^0.27.4',
//     'vite': '^5.4.9',
//     'vite-plugin-app-loading': '^0.3.0',
//     'vite-plugin-archiver': '^0.1.1',
//     'vite-plugin-banner': '^0.8.0',
//     'vite-plugin-compression2': '^1.3.0',
//     'vite-plugin-fake-server': '^2.1.2',
//     'vite-plugin-pages': '^0.32.3',
//     'vite-plugin-svg-icons': '^2.0.1',
//     'vite-plugin-vue-devtools': '^7.5.2',
//     'vite-plugin-vue-meta-layouts': '^0.4.3',
//     'vue-tsc': '^2.1.6',
//   },
// }
// // main 循环查找 dev 依赖一样的包就用 dev 的版本
//
// for (const key in main.dependencies) {
//   if (dev.dependencies[key]) {
//     main.dependencies[key] = dev.dependencies[key]
//   }
// }
// for (const key in main.devDependencies) {
//   if (dev.devDependencies[key]) {
//     main.devDependencies[key] = dev.devDependencies[key]
//   }
// }
// console.log('// main 循环查找 dev 依赖一样的包就用 dev 的版本')// eslint-disable-line no-console
// console.log(JSON.stringify(main, null, 2))// eslint-disable-line no-console
//
// // 找出不同的包
// const diff = {
//   dependencies: {},
//   devDependencies: {},
// }
// for (const key in dev.dependencies) {
//   if (!main.dependencies[key]) {
//     diff.dependencies[key] = dev.dependencies[key]
//   }
// }
// for (const key in dev.devDependencies) {
//   if (!main.devDependencies[key]) {
//     diff.devDependencies[key] = dev.devDependencies[key]
//   }
// }
// console.log('// 找出不同的包')// eslint-disable-line no-console
// console.log(JSON.stringify(diff, null, 2))// eslint-disable-line no-console
//
// // 找出 main 有 dev 没有的包
// const diff2 = {
//   dependencies: {},
//   devDependencies: {},
// }
// for (const key in main.dependencies) {
//   if (!dev.dependencies[key]) {
//     diff2.dependencies[key] = main.dependencies[key]
//   }
// }
// for (const key in main.devDependencies) {
//   if (!dev.devDependencies[key]) {
//     diff2.devDependencies[key] = main.devDependencies[key]
//   }
// }
// console.log('// 找出 main 有 dev 没有的包') // eslint-disable-line no-console
// console.log(JSON.stringify(diff2, null, 2)) // eslint-disable-line no-console
//
// // 找出 dev 有 main 没有的包
// const diff3 = {
//   dependencies: {},
//   devDependencies: {},
// }
// for (const key in dev.dependencies) {
//   if (!main.dependencies[key]) {
//     diff3.dependencies[key] = dev.dependencies[key]
//   }
// }
// for (const key in dev.devDependencies) {
//   if (!main.devDependencies[key]) {
//     diff3.devDependencies[key] = dev.devDependencies[key]
//   }
// }
//
// console.log('// 1找出 dev 有 main 没有的包') // eslint-disable-line no-console
//
// console.log(JSON.stringify(diff3, null, 2)) // eslint-disable-line no-console

// const i18n = {
//   key: {
//     app: () => {
//       return 'app'
//     },
//     subKey: {
//       subApp: () => {
//         return 'subApp'
//       },
//     },
//   },
//   key2: {
//     app1: () => {
//       return 'app1'
//     },
//   },
// }

// function executeFunctionsInObject(obj) {
//   for (const key in obj) {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       // 如果值是一个对象，递归调用自身
//       executeFunctionsInObject(obj[key])
//     }
//     else if (typeof obj[key] === 'function') {
//       // 如果值是一个函数，调用函数并将结果存回原位置
//       obj[key] = obj[key]({ normalize: val => `${val}` })
//     }
//   }
// }
//
// executeFunctionsInObject(i18n)

const json = { 'en': { app: { profile: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Profile' } }, preferences: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Preferences' } }, hotkeys: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Hotkeys Introduction' } }, logout: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Logout' } }, search: { text: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Search' } }, input: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Support title fuzzy query' } }, empty: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Not found' } }, up_down: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Choice' } }, enter: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Enter' } }, esc: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Exit' } } }, window: { undefined: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '[ No title ]' } }, reload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Reload' } }, remove: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Close' } }, maximize: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Maximize' } }, focus: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Focus' } }, focusPrev: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Focus Previous Window' } }, focusNext: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Focus Next Window' } }, removeOtherSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Close Otherside Window' } }, removeLeftSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Close Leftside Window' } }, removeRightSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Close Rightside Window' } } } }, menu: { window: { root: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Window Functions' } }, add: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Open new window' } }, remove: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Close window' } }, maximize: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Maximize window' } }, notitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'No title window' } }, params: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Params window' } }, width: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Custom window width' } } } } }, 'zh-cn': { app: { profile: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '个人设置' } }, preferences: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '偏好设置' } }, hotkeys: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '快捷键介绍' } }, logout: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '退出登录' } }, search: { text: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '搜索' } }, input: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '支持标题、拼音(首字母)模糊查询' } }, empty: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '没有找到你想要的' } }, up_down: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '切换' } }, enter: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '访问' } }, esc: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '退出' } } }, window: { undefined: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '[ 无标题 ]' } }, reload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '重新加载' } }, remove: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '关闭' } }, maximize: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '最大化' } }, focus: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '聚焦' } }, focusPrev: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '聚焦上一个窗口' } }, focusNext: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '聚焦下一个窗口' } }, removeOtherSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '关闭其它窗口' } }, removeLeftSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '关闭左侧窗口' } }, removeRightSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '关闭右侧窗口' } } } }, menu: { window: { root: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '窗口功能' } }, add: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '打开新窗口' } }, remove: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '关闭窗口' } }, maximize: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '最大化窗口' } }, notitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '无标题窗口' } }, params: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '带参窗口' } }, width: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '自定义窗口宽度' } } } } }, 'zh-tw': { app: { profile: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '我的資料' } }, preferences: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '偏好設置' } }, hotkeys: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '熱鍵介紹' } }, logout: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '登出' } }, search: { text: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '搜索' } }, input: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '支持標題、拼音(首字母)模糊查詢' } }, empty: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '沒有找到你想要的' } }, up_down: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '切換' } }, enter: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '訪問' } }, esc: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '退出' } } }, window: { undefined: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '[ 無標題 ]' } }, reload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '重新載入' } }, remove: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '關閉' } }, maximize: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '最大化' } }, focus: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '聚焦' } }, focusPrev: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '聚焦上一個窗口' } }, focusNext: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '聚焦下一個窗口' } }, removeOtherSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '關閉其它窗口' } }, removeLeftSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '關閉左側窗口' } }, removeRightSide: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '關閉右側窗口' } } } }, menu: { window: { root: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '窗口功能' } }, add: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '打開新窗口' } }, remove: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '關閉窗口' } }, maximize: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '最大化窗口' } }, notitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '無標題窗口' } }, params: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '帶參窗口' } }, width: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '自定義窗口寬度' } } } } } }

function flattenSKeys(obj) {
  const result = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      if (value && typeof value === 'object' && value.b && value.b.s) {
        // 提取 s 键的值并赋值给当前键
        result[key] = value.b.s
      }
      else if (value && typeof value === 'object') {
        // 递归处理子对象
        result[key] = flattenSKeys(value)
      }
      else {
        // 直接赋值
        result[key] = value
      }
    }
  }

  return result
}

console.log(JSON.stringify(flattenSKeys(json), null, 2))// eslint-disable-line no-console
