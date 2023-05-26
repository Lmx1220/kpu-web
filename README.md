# 框架Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 开发运行
1. 第一步安装依赖`pnpm install`
2. 第二步运行 `pnpm run dev `

## 打包测试
1. 第一步运行 `pnpm run build`
2. 第二步运行 `pnpm run serve`
## 其他命令
1. `pnpm run svgo` 优化svg
2. `pnpm run lint` 代码检查
3. `pnpm run new` 创建新页面
4. `pnpm run generate:icons` 生成svg图标
## 项目结构
``` console
├── plop-templates // plop模板
├── public // 静态资源
├── scripts // 脚本
│   └── generate.icons.js // 生成svg图标脚本
├── src // 源码
│   ├── api // 接口
│   ├── assets // 静态资源
│   │   ├── icons // 图标
│   │   ├── images // 图片
│   │   └── styles // 样式
│   ├── components // 公共组件
│   ├── iconify // 图标
│   ├── layout // 布局
│   ├── locales // 国际化
│   ├── mock // mock数据
│   ├── router // 路由
│   ├── store // pinia状态管理
│   ├── types // 类型
│   ├── utils // 工具
│   ├── views // 页面
│   ├── App.vue // 根组件
│   ├── main.ts // 入口文件
│   ├── permission.ts // router权限拦截
│   ├── settings.default.ts // 默认配置
│   ├── settings.ts // 配置
│   ├── vite-env.d.ts // vite环境变量
│—— vite // vite配置
│   └── plugins // 插件
│   │   ├── auto-import.ts // 自动导入插件
│   │   ├── banner.ts // banner插件
│   │   ├── components.ts // 组件插件
│   │   ├── compression.ts // 压缩插件
│   │   ├── html.ts // html插件
│   │   ├── i18n.ts // 国际化插件
│   │   ├── index.ts // 插件入口
│   │   ├── inspector.ts // inspector插件
│   │   ├── mock.ts // mock插件
│   │   ├── pwa.ts // pwa插件
│   │   ├── setup-extend.ts // setup扩展插件
│   │   ├── setup-extend-plus.ts // setup扩展插件
│   │   ├── svg-icon.ts // svg图标插件
│   │   └── unocss.ts // unocss插件
├── .env.development // 开发环境变量
├── .env.production // 生产环境变量
├── .env.test // 测试环境变量
├── .eslintrignore // eslint忽略
├── .eslintrc // eslint配置
├── .gitignore // git忽略
├── .lintstagedrc // lint-staged配置
├── .npmrc // npm配置
├── .stylelintignore // stylelint忽略
├── .stylelintrc // stylelint配置
├── docker-compose.yml // docker配置
├── Dockerfile // docker配置
├── index.html // html模板
├── LICENSE // 开源协议
├── nginx.conf // nginx配置
├── package.json // 依赖
├── plopfile.js // plop配置
├── pnpm-lock.yaml // pnpm依赖
├── postcss.config.cjs // postcss配置
├── README.md // 说明
├── scss.template.hbs // scss模板
├── tsconfig.json // ts配置
├── tsconfig.node.json // ts配置
└── vite.config.ts // vite配置
```
