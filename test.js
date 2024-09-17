import pack from './package.json'

const main = {
  dependencies: pack.dependencies,
  devDependencies: pack.devDependencies,
}
const dev = {
  dependencies: {
    '@antv/g2plot': '^2.4.32',
    '@bytemd/plugin-gfm': '^1.21.0',
    '@bytemd/vue-next': '^1.21.0',
    '@headlessui/vue': '^1.7.22',
    '@imengyu/vue3-context-menu': '^1.4.2',
    '@tinymce/tinymce-vue': '^6.0.1',
    '@visactor/vchart': '^1.12.1',
    '@vue-office/docx': '^1.6.2',
    '@vue-office/excel': '^1.7.11',
    '@vue-office/pdf': '^2.0.2',
    '@vueuse/components': '^11.0.3',
    '@vueuse/core': '^11.0.3',
    '@vueuse/integrations': '^11.0.3',
    'animate.css': '^4.1.1',
    'axios': '^1.7.7',
    'bytemd': '^1.21.0',
    'cropperjs': '^1.6.2',
    'dayjs': '^1.11.13',
    'defu': '^6.1.4',
    'disable-devtool': '^0.3.7',
    'echarts': '^5.5.1',
    'element-plus': '^2.8.1',
    'eruda': '^3.2.3',
    'floating-vue': '5.2.2',
    'hotkeys-js': '^3.13.7',
    'lodash-es': '^4.17.21',
    'medium-zoom': '^1.1.0',
    'mitt': '^3.0.1',
    'mockjs': '^1.1.0',
    'nprogress': '^0.2.0',
    'overlayscrollbars': '^2.10.0',
    'overlayscrollbars-vue': '^0.5.9',
    'path-browserify': '^1.0.1',
    'path-to-regexp': '^7.1.0',
    'pinia': '^2.2.2',
    'pinyin-pro': '^3.24.2',
    'print-js': '^1.6.0',
    'qrcode': '^1.5.4',
    'qs': '^6.13.0',
    'scule': '^1.3.0',
    'sortablejs': '^1.15.2',
    'spinkit': '^2.0.1',
    'splitpanes': '^3.1.5',
    'swiper': '^11.1.11',
    'timeago.js': '^4.0.2',
    'tinymce': '^7.3.0',
    'v-wave': '^2.0.0',
    'vconsole': '^3.15.1',
    'vue': '^3.4.38',
    'vue-currency-input': '^3.1.0',
    'vue-esign': '^1.1.4',
    'vue-hooks-plus': '^2.2.1',
    'vue-i18n': '^9.14.0',
    'vue-m-message': '^4.0.2',
    'vue-router': '^4.4.3',
    'vue3-count-to': '^1.1.2',
    'vxe-table': '^4.7.16',
    'watermark-js-plus': '^1.5.5',
    'xe-utils': '^3.5.30',
  },
  devDependencies: {
    '@antfu/eslint-config': '^2.27.3',
    '@iconify/json': '^2.2.243',
    '@iconify/vue': '^4.1.2',
    '@intlify/unplugin-vue-i18n': '^4.0.0',
    '@stylistic/stylelint-config': '^2.0.0',
    '@types/lodash-es': '^4.17.12',
    '@types/mockjs': '^1.0.10',
    '@types/nprogress': '^0.2.3',
    '@types/path-browserify': '^1.0.3',
    '@types/qrcode': '^1.5.5',
    '@types/qs': '^6.9.15',
    '@types/sortablejs': '^1.15.8',
    '@types/splitpanes': '^2.2.6',
    '@unocss/eslint-plugin': '^0.62.3',
    '@vitejs/plugin-legacy': '^5.4.2',
    '@vitejs/plugin-vue': '^5.1.3',
    '@vitejs/plugin-vue-jsx': '^4.0.1',
    'archiver': '^7.0.1',
    'autoprefixer': '^10.4.20',
    'boxen': '^8.0.1',
    'eslint': '^9.9.1',
    'esno': '^4.7.0',
    'fs-extra': '^11.2.0',
    'http-server': '^14.1.1',
    'inquirer': '^10.1.8',
    'lint-staged': '^15.2.9',
    'npm-run-all2': '^6.2.2',
    'picocolors': '^1.0.1',
    'plop': '^4.0.1',
    'postcss': '^8.4.42',
    'postcss-nested': '^6.2.0',
    'sass': '^1.77.8',
    'simple-git-hooks': '^2.11.1',
    'stylelint': '^16.9.0',
    'stylelint-config-recess-order': '^5.1.0',
    'stylelint-config-standard-scss': '^13.1.0',
    'stylelint-config-standard-vue': '^1.0.0',
    'stylelint-scss': '^6.5.1',
    'svgo': '^3.3.2',
    'typescript': '^5.5.4',
    'unocss': '^0.62.3',
    'unocss-preset-scrollbar': '^0.3.1',
    'unplugin-auto-import': '^0.18.2',
    'unplugin-turbo-console': '^1.10.1',
    'unplugin-vue-components': '^0.27.4',
    'vite': '^5.4.2',
    'vite-plugin-app-loading': '^0.3.0',
    'vite-plugin-banner': '^0.7.1',
    'vite-plugin-compression2': '^1.2.0',
    'vite-plugin-fake-server': '^2.1.1',
    'vite-plugin-pages': '^0.32.3',
    'vite-plugin-svg-icons': '^2.0.1',
    'vite-plugin-vue-devtools': '^7.3.9',
    'vite-plugin-vue-meta-layouts': '^0.4.3',
    'vue-tsc': '^2.1.4',
  },
}
// main 循环查找 dev 依赖一样的包就用 dev 的版本

for (const key in main.dependencies) {
  if (dev.dependencies[key]) {
    main.dependencies[key] = dev.dependencies[key]
  }
}
for (const key in main.devDependencies) {
  if (dev.devDependencies[key]) {
    main.devDependencies[key] = dev.devDependencies[key]
  }
}
console.log('// main 循环查找 dev 依赖一样的包就用 dev 的版本')// eslint-disable-line no-console
console.log(JSON.stringify(main, null, 2))// eslint-disable-line no-console

// 找出不同的包
const diff = {
  dependencies: {},
  devDependencies: {},
}
for (const key in dev.dependencies) {
  if (!main.dependencies[key]) {
    diff.dependencies[key] = dev.dependencies[key]
  }
}
for (const key in dev.devDependencies) {
  if (!main.devDependencies[key]) {
    diff.devDependencies[key] = dev.devDependencies[key]
  }
}
console.log('// 找出不同的包')// eslint-disable-line no-console
console.log(JSON.stringify(diff, null, 2))// eslint-disable-line no-console

// 找出 main 有 dev 没有的包
const diff2 = {
  dependencies: {},
  devDependencies: {},
}
for (const key in main.dependencies) {
  if (!dev.dependencies[key]) {
    diff2.dependencies[key] = main.dependencies[key]
  }
}
for (const key in main.devDependencies) {
  if (!dev.devDependencies[key]) {
    diff2.devDependencies[key] = main.devDependencies[key]
  }
}
console.log('// 找出 main 有 dev 没有的包') // eslint-disable-line no-console
console.log(JSON.stringify(diff2, null, 2)) // eslint-disable-line no-console

// 找出 dev 有 main 没有的包
const diff3 = {
  dependencies: {},
  devDependencies: {},
}
for (const key in dev.dependencies) {
  if (!main.dependencies[key]) {
    diff3.dependencies[key] = dev.dependencies[key]
  }
}
for (const key in dev.devDependencies) {
  if (!main.devDependencies[key]) {
    diff3.devDependencies[key] = dev.devDependencies[key]
  }
}

console.log('// 1找出 dev 有 main 没有的包') // eslint-disable-line no-console

console.log(JSON.stringify(diff3, null, 2)) // eslint-disable-line no-console

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
