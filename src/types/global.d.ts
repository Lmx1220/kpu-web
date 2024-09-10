import type { FormRules } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'
import type { ComponentRenderProxy, VNode } from 'vue'
import type { ActionEnum } from '@/enums/commonEnum'
import type { LocaleType } from '#/config'

type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type Nullable<T> = T | null

declare namespace Settings {
  interface app {
    /**
     * 亮色主题
     * @默认值 `'light'`
     * @可选值 可选择 `/themes/index.ts` 里所有 `color-scheme: light` 的主题
     */
    lightTheme?: string
    /**
     * 暗色主题
     * @默认值 `'dark'`
     * @可选值 可选择 `/themes/index.ts` 里所有 `color-scheme: dark` 的主题
     */
    darkTheme?: string
    /**
     * 颜色方案
     * @默认值 `''` 跟随系统
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme?: '' | 'light' | 'dark'
    /**
     * 是否开启哀悼模式
     * @默认值 `false`
     */
    enableMournMode?: boolean
    /**
     * 是否开启色弱模式
     * @默认值 `false`
     */
    enableColorAmblyopiaMode?: boolean
    /**
     * 默认语言
     * @默认值 `''` 跟随浏览器语言设置
     * @可选值 参考 `/src/locales/index.ts` 里的语言列表
     */
    defaultLang?: LocaleType
    /**
     * 是否开启权限功能
     * @默认值 `false`
     */
    enablePermission?: boolean
    /**
     * localStorage/sessionStorage 前缀
     * @默认值 `'fa_'`
     */
    storagePrefix?: string
    /**
     * 是否开启页面水印
     * @默认值 `false`
     */
    enableWatermark?: boolean
    /**
     * 是否在非开发环境开启错误日志功能，具体业务代码在 `/src/utils/error.log.ts`
     * @默认值 `false`
     */
    enableErrorLog?: boolean
    /**
     * 文字方向
     * @默认值 `'ltr'` 从左到右
     * @可选值 `'rtl'` 从右到左
     */
    direction?: 'ltr' | 'rtl'
  }
  interface userPreferences {
    /**
     * 是否开启用户偏好设置
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 存储位置
     * @默认值 `'local'` 本地存储
     * @可选值 `'server'` 服务器存储
     */
    storageTo?: 'local' | 'server'
  }
  interface home {
    /**
     * 是否开启主页
     * @默认值 `true`
     */
    enable?: boolean
    /**
     * 主页名称
     * @默认值 `'主页'`
     */
    title?: string
    /**
     * 主页完整路径
     * @默认值 `'/'`
     */
    fullPath?: string
  }
  interface layout {
    /**
     * 页宽模式，当设置为非 `'adaption'` 时，可以去 /src/assets/styles/resources/variables.scss 里设置 `$g-app-width` 宽度变量
     * @默认值 `'adaption'` 自适应
     * @可选值 `'adaption-min-width'` 自适应（有最小宽度）
     * @可选值 `'center'` 定宽居中
     * @可选值 `'center-max-width'` 定宽居中（有最大宽度）
     */
    widthMode?: 'adaption' | 'adaption-min-width' | 'center' | 'center-max-width'
    /**
     * 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
     * @默认值 `false`
     */
    enableMobileAdaptation?: boolean
  }
  interface menu {
    /**
     * 导航栏数据来源，当 `app.routeBaseOn: 'filesystem'` 时生效
     * @默认值 `'frontend'` 前端
     * @可选值 `'backend'` 后端
     */
    baseOn?: 'frontend' | 'backend'
    /**
     * 导航栏模式
     * @默认值 `'side'` 侧边栏模式（有主导航）
     * @可选值 `'head'` 顶部模式
     * @可选值 `'single'` 侧边栏模式（无主导航）
     * @可选值 `'only-side'` 侧边栏精简模式
     * @可选值 `'only-head'` 顶部精简模式
     */
    mode?: 'side' | 'head' | 'single' | 'only-side' | 'only-head' | 'side-panel' | 'head-panel'
    /**
     * 导航栏激活风格
     * @默认值 `''`
     * @可选值 `'arrow'` 箭头
     * @可选值 `'line'` 线条
     * @可选值 `'dot'` 圆点
     */
    style?: '' | 'arrow' | 'line' | 'dot'
    /**
     * 导航栏是否圆角
     * @默认值 `false`
     */
    isRounded?: boolean
    /**
     * 切换主导航同时打开窗口
     * @默认值 `false`
     */
    switchMainMenuAndOpenWindow?: boolean
    /**
     * 次导航是否只保持一个子项的展开
     * @默认值 `true`
     */
    subMenuUniqueOpened?: boolean
    /**
     * 次导航是否收起
     * @默认值 `false`
     */
    subMenuCollapse?: boolean
    /**
     * 次导航是否自动收起
     * @默认值 `false`
     */
    subMenuAutoCollapse?: boolean
    /**
     * 是否开启次导航的展开/收起按钮
     * @默认值 `false`
     */
    enableSubMenuCollapseButton?: boolean
    /**
     * 是否开启主导航切换快捷键
     * @默认值 `false`
     */
    enableHotkeys?: boolean
  }
  interface topbar {
    /**
     * 模式
     * @默认值 `'static'` 静止，跟随页面滚动
     * @可选值 `'fixed'` 固定，不跟随页面滚动，始终固定在顶部
     * @可选值 `'sticky'` 粘性，页面往下滚动时隐藏，往上滚动时显示
     */
    mode?: 'static' | 'fixed' | 'sticky'
    /**
     * 是否切换显示标签栏和工具栏的显示位置
     * @默认值 `false` 标签栏在工具栏上面
     * @可选值 `true` 工具栏在标签栏上面
     */
    switchTabbarAndToolbar?: boolean
  }
  interface tabbar {
    /**
     * 是否开启标签栏
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 标签栏风格
     * @默认值 `''` 默认
     * @可选值 `'fashion'` 时尚
     * @可选值 `'card'` 卡片
     * @可选值 `'square'` 方块
     */
    style?: '' | 'fashion' | 'card' | 'square'
    /**
     * 是否开启标签栏图标显示
     * @默认值 `false`
     */
    enableIcon?: boolean
    /**
     * 标签页双击触发
     * @默认值 `'reload'` 刷新
     * @可选值 `'close'` 关闭
     * @可选值 `'pin'` 固定/取消固定
     * @可选值 `'maximize'` 最大化
     * @可选值 `'window'` 新窗口打开
     */
    dblclickAction?: 'reload' | 'close' | 'pin' | 'maximize' | 'window'
    /**
     * 标签页合并规则
     * @默认值 `''` 不合并
     * @可选值 `'routeName'` 根据路由名称，相同路由名称的路由合并
     * @可选值 `'activeMenu'` 根据路由的 `meta.activeMenu` 字段，与指向的目标路由合并
     */
    mergeTabsBy?: '' | 'routeName' | 'activeMenu'
    /**
     * 是否开启标签栏记忆功能
     * @默认值 `false`
     */
    enableMemory?: boolean
    /**
     * 是否开启标签栏快捷键
     * @默认值 `false`
     */
    enableHotkeys?: boolean
    /**
     * 固定标签页存储位置
     * @默认值 `'local'` 本地存储
     * @可选值 `'server'` 服务器存储
     */
    storageTo?: 'local' | 'server'
  }
  interface toolbar {
    /**
     * 是否开启窗口预览
     * @默认值 `true`
     */
    previewWindows?: boolean
    /**
     * 是否开启收藏夹
     * @默认值 `false`
     */
    favorites?: boolean
    /**
     * 是否开启导航搜索
     * @默认值 `true`
     */
    navSearch?: boolean
    /**
     * 是否开启通知中心
     * @默认值 `false`
     */
    notification?: boolean
    /**
     * 是否开启国际化
     * @默认值 `false`
     */
    i18n?: boolean
    /**
     * 是否开启全屏
     * @默认值 `false`
     */
    fullscreen?: boolean
    /**
     * 是否开启颜色主题
     * @默认值 `false`
     */
    colorScheme?: boolean
    /**
     * 布局设置，可自定义摆放位置和顺序，其中 `->` 为分隔符，用于分隔左右两侧的工具栏。修改时请确保默认值里的所有值都存在，不可删减。
     * @默认值 `['favorites', 'breadcrumb', '->', 'navSearch', 'notification', 'i18n', 'fullscreen', 'pageReload', 'colorScheme']`
     */
    layout?: (Exclude<keyof toolbar, 'layout'> | '->')[]
  }
  interface favorites {
    /**
     * 存储位置
     * @默认值 `'local'` 本地存储
     * @可选值 `'server'` 服务器存储
     */
    storageTo?: 'local' | 'server'
  }
  interface breadcrumb {
    /**
     * 面包屑导航风格
     * @默认值 `''` 默认
     * @可选值 `'modern'` 现代
     */
    style?: '' | 'modern'
    /**
     * 是否在面包屑导航里显示主导航
     * @默认值 `false`
     */
    enableMainMenu?: boolean
  }
  interface mainPage {
    /**
     * 是否开启页面快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
    /**
     * iframe 页面最大缓存数量
     * @默认值 `3`
     */
    iframeCacheMax?: number
    /**
     * 是否开启页面切换动画
     * @默认值 `true`
     */
    enableTransition?: boolean
    /**
     * 页面切换动画
     * @默认值 `'fade'` 淡入淡出
     * @可选值 `'slide-left'` 向左滑动
     * @可选值 `'slide-right'` 向右滑动
     * @可选值 `'slide-top'` 向上滑动
     * @可选值 `'slide-bottom'` 向下滑动
     */
    transitionMode?: 'fade' | 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom'
  }
  interface navSearch {
    /**
     * 是否开启导航搜索快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }
  interface window {
    /**
     * 窗口默认宽度，设置为数字时单位为 px
     * @默认值 `1000`
     */
    defaultWidth?: string | number
    /**
     * 自动定位窗口位置
     * @默认值 `''` 居中
     */
    autoPosition?: string
    /**
     * 窗口最大数量
     * @默认值 `4`
     */
    focusMaxNum?: number
    /**
     * 是否开启窗口快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }
  interface copyright {
    /**
     * 是否开启底部版权，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 网站运行日期
     * @默认值 `''`
     */
    dates?: string
    /**
     * 公司名称
     * @默认值 `''`
     */
    company?: string
    /**
     * 网站地址
     * @默认值 `''`
     */
    website?: string
    /**
     * 网站备案号
     * @默认值 `''`
     */
    beian?: string
  }
  interface all {
    /** 应用设置 */
    app?: app
    /** 用户偏好设置 */
    userPreferences?: userPreferences
    /** 导航栏设置 */
    menu?: menu
    /** 工具栏设置 */
    toolbar?: toolbar
    /** 收藏夹设置 */
    favorites?: favorites
    /** 导航搜索设置 */
    navSearch?: navSearch
    /** 窗口设置 */
    window?: window
    /** 底部版权设置 */
    copyright?: copyright
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | (() => string)
    i18n?: string
    icon?: string
    activeIcon?: string
    defaultOpened?: boolean
    alwaysOpened?: boolean
    permanent?: boolean
    auth?: string | string[]
    auths?: {
      name: string
      value: string
    }[]
    sidebar?: boolean
    menu?: boolean
    activeMenu?: string
    singleMenu?: boolean
    breadcrumb?: boolean
    cache?: boolean | string | string[]
    noCache?: string | string[]
    badge?: boolean | string | number | (() => boolean | string | number)
    newWindow?: boolean
    iframe?: string
    link?: string
    copyright?: boolean
    paddingBottom?: string
    whiteList?: boolean
    breadcrumbNeste?: Route.breadcrumb[]
  }
}

declare namespace Route {
  interface recordMainRaw {
    meta?: {
      title?: string | (() => string)
      i18n?: string
      icon?: string
      activeIcon?: string
      auth?: string | string[]
      auths?: {
        name: string
        value: string
      }[]
    }
    children: RouteRecordRaw[]
  }
  interface breadcrumb {
    path: string
    title?: string | (() => string)
    i18n?: string
    icon?: string
    activeIcon?: string
    hide: boolean
  }
}

declare namespace Menu {
  /** 原始 */
  interface recordRaw {
    windowWidth?: string | number
    title?: string | (() => string)
    noTitle?: boolean
    icon?: string
    auth?: string | string[]
    params?: object
    windowName?: string
    badge?: boolean | string | number | (() => boolean | string | number)
    breadcrumbNeste?: Menu.breadcrumb[]
    children?: recordRaw[]

  }
  /** 主导航 */
  interface recordMainRaw {

    title?: string | (() => string)
    icon?: string
    auth?: string | string[]
    children: recordRaw[]
  }
  interface breadcrumb {
    title?: string | (() => string)
  }
}

declare namespace Tabbar {
  interface recordRaw {
    tabId: string
    fullPath: string
    routeName?: RouteRecordName | null
    activeMenu?: string
    title?: string | (() => string)
    i18n?: string
    iframe?: string
    icon?: string
    activeIcon?: string
    name: string[]
    customTitleList: {
      fullPath: string
      title: string
    }[]
    isPin: boolean
    isPermanent: boolean
  }
}

declare namespace Favorites {
  interface recordRaw {
    windowName: string
    title?: string | (() => string)
  }
}

declare namespace Iframe {
  interface recordRaw {
    path: string
    src: string
    title?: string
    isOpen?: boolean
    isLoading?: boolean
  }
}

interface CustomTitleList {
  fullPath: string
  title?: string
}

declare global {
    type Recordable<T = any> = Record<any, T>
    type Id<T = any> = Record<string, T> & {
      id?: string
    }

}
declare type DataConfig<SEARCH = any, T = any> = Record<any, any> & {
  loading?: boolean
  tableAutoHeight: boolean
  formMode: 'router' | 'dialog' | 'drawer'
  formModeProps: Record<string, any> & {
    visible: boolean
    id?: string
    type?: ActionEnum
    data?: Partial<Id>
  }
  // 搜索
  search: Record<string, any> & SEARCH
  searchFold: boolean
  current?: Partial<Id>
  // 批量操作
  batch: {
    enable: boolean
    selectionDataList: T[]
  }
  // 列表数据
  dataList: T[]
  dicts?: Map
}
declare type FormConfig<T = any> = Recordable & {
  loading?: boolean
  form: T
  rules: FormRules<typeof T>
  dicts?: Map<string, any>
}
declare type TreeConfig<T = any> = Recordable & {
  tableAutoHeight: boolean
  // 详情
  formModeProps: {
    id: string
    type?: ActionEnum
    parent: Record<string, any> & T
    data: Record<string, any> & T
  }
  batch: {
    selectionDataList: []
  }
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}

interface window {
  name: string
  width?: string | number
  title?: string | (() => string)
  noTitle?: boolean
  params?: object
  breadcrumbNeste?: Menu.breadcrumb[]
  isMaximize?: boolean
  reload?: boolean
}
