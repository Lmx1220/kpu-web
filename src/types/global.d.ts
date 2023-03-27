import type { StyleValue } from "vue"
import type { RouteRecordRaw, RouteMeta, NavigationGuard } from 'vue-router'

type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

declare namespace Settings {
  interface app {
    /**
     * 颜色方案
     * @默认值 `''` 跟随系统
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme?: '' | 'light' | 'dark'
    // 默认语言，留空则跟随系统
    defaultLang: string
  }

  interface all {
    /** 应用设置 */
    app?: app
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string | Function
    i18n?: string
    icon?: string
    activeIcon?: string
    defaultOpened?: boolean
    auth?: string | string[]
    sidebar?: boolean
    breadcrumb?: boolean
    activeMenu?: string
    cache?: boolean | string | string[]
    link?: string
    breadcrumbNeste?: Route.breadcrumb[]
  }
}

declare namespace Route {
  interface recordMainRaw {
    meta?: {
      title?: string | Function
      icon?: string
      auth?: string | string[]
    }
    children: recordRaw[]
  }
  interface breadcrumb {
    path: string
    title?: string | Function
    hide: boolean
  }
}

declare namespace Menu {
  /** 原始 */
  interface recordRaw {
    path?: string
    meta?: {
      title?: string
      icon?: string
      defaultOpened?: boolean
      auth?: string | string[]
      sidebar?: boolean
      link?: string
    }
    children?: recordRaw[]
  }
  /** 主导航 */
  interface recordMainRaw {
    meta?: {
      title?: string
      icon?: string
      auth?: string | string[]
    }
    children: recordRaw[]
  }
}

declare namespace App {

  interface GenerateI18nTitle {
    (key: string, defaultTitle: string | (() => string)): string
  }
}