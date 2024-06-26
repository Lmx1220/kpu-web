import { hex2rgba } from '@unocss/preset-mini/utils'

export default {
  light: {
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': hex2rgba('#0f0f0f')!.join(' '),
    '--ui-text': hex2rgba('#fcfcfc')!.join(' '),
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#fff',
    '--g-header-color': '#0f0f0f',
    '--g-header-menu-color': '#0f0f0f',
    '--g-header-menu-hover-bg': '#dde1e3',
    '--g-header-menu-hover-color': '#0f0f0f',
    '--g-header-menu-active-bg': '#0f0f0f',
    '--g-header-menu-active-color': '#fff',
    // 主导航
    '--g-main-sidebar-bg': '#f2f2f2',
    '--g-main-sidebar-menu-color': '#0f0f0f',
    '--g-main-sidebar-menu-hover-bg': '#dde1e3',
    '--g-main-sidebar-menu-hover-color': '#0f0f0f',
    '--g-main-sidebar-menu-active-bg': '#0f0f0f',
    '--g-main-sidebar-menu-active-color': '#fff',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#0f0f0f',
    '--g-sub-sidebar-logo-color': '#fff',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#dde1e3',
    '--g-sub-sidebar-menu-hover-color': '#0f0f0f',
    '--g-sub-sidebar-menu-active-bg': '#0f0f0f',
    '--g-sub-sidebar-menu-active-color': '#fff',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
  classic: {
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': hex2rgba('#409eff')!.join(' '),
    '--ui-text': hex2rgba('#fcfcfc')!.join(' '),
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#222b45',
    '--g-header-color': '#fff',
    '--g-header-menu-color': '#fff',
    '--g-header-menu-hover-bg': '#334067',
    '--g-header-menu-hover-color': '#fff',
    '--g-header-menu-active-bg': '#334067',
    '--g-header-menu-active-color': '#fff',
    // 主导航
    '--g-main-sidebar-bg': '#222b45',
    '--g-main-sidebar-menu-color': '#fff',
    '--g-main-sidebar-menu-hover-bg': '#334067',
    '--g-main-sidebar-menu-hover-color': '#fff',
    '--g-main-sidebar-menu-active-bg': '#334067',
    '--g-main-sidebar-menu-active-color': '#fff',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#222b45',
    '--g-sub-sidebar-logo-color': '#fff',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#dde1e3',
    '--g-sub-sidebar-menu-hover-color': '#0f0f0f',
    '--g-sub-sidebar-menu-active-bg': '#409eff',
    '--g-sub-sidebar-menu-active-color': '#fff',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
  naive: {
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': hex2rgba('#18a058')!.join(' '),
    '--ui-text': hex2rgba('#fcfcfc')!.join(' '),
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#1d2935',
    '--g-header-color': '#fff',
    '--g-header-menu-color': '#fff',
    '--g-header-menu-hover-bg': '#42b983',
    '--g-header-menu-hover-color': '#fff',
    '--g-header-menu-active-bg': '#18a058',
    '--g-header-menu-active-color': '#fff',
    // 主导航
    '--g-main-sidebar-bg': '#1d2935',
    '--g-main-sidebar-menu-color': '#fff',
    '--g-main-sidebar-menu-hover-bg': '#42b983',
    '--g-main-sidebar-menu-hover-color': '#fff',
    '--g-main-sidebar-menu-active-bg': '#18a058',
    '--g-main-sidebar-menu-active-color': '#fff',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#1d2935',
    '--g-sub-sidebar-logo-color': '#fff',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#42b983',
    '--g-sub-sidebar-menu-hover-color': '#fff',
    '--g-sub-sidebar-menu-active-bg': '#18a058',
    '--g-sub-sidebar-menu-active-color': '#fff',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
  barbie: {
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': hex2rgba('#ff43bc')!.join(' '),
    '--ui-text': hex2rgba('#fcfcfc')!.join(' '),
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#ff43bc',
    '--g-header-color': '#fff',
    '--g-header-menu-color': '#fff',
    '--g-header-menu-hover-bg': '#dd39a3',
    '--g-header-menu-hover-color': '#fff',
    '--g-header-menu-active-bg': '#dd39a3',
    '--g-header-menu-active-color': '#fff',
    // 主导航
    '--g-main-sidebar-bg': '#ff43bc',
    '--g-main-sidebar-menu-color': '#fff',
    '--g-main-sidebar-menu-hover-bg': '#dd39a3',
    '--g-main-sidebar-menu-hover-color': '#fff',
    '--g-main-sidebar-menu-active-bg': '#dd39a3',
    '--g-main-sidebar-menu-active-color': '#fff',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#ff43bc',
    '--g-sub-sidebar-logo-color': '#fff',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#dd39a3',
    '--g-sub-sidebar-menu-hover-color': '#fff',
    '--g-sub-sidebar-menu-active-bg': '#dd39a3',
    '--g-sub-sidebar-menu-active-color': '#fff',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
  winter: {
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': hex2rgba('#a6e4f8')!.join(' '),
    '--ui-text': hex2rgba('#3e4e68')!.join(' '),
    // 主体
    '--g-bg': '#f1f5fe',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#fff',
    '--g-header-color': '#3e4e68',
    '--g-header-menu-color': '#3e4e68',
    '--g-header-menu-hover-bg': '#e3e8f2',
    '--g-header-menu-hover-color': '#3e4e68',
    '--g-header-menu-active-bg': '#a6e4f8',
    '--g-header-menu-active-color': '#3e4e68',
    // 主导航
    '--g-main-sidebar-bg': '#f1f5fe',
    '--g-main-sidebar-menu-color': '#3e4e68',
    '--g-main-sidebar-menu-hover-bg': '#e3e8f2',
    '--g-main-sidebar-menu-hover-color': '#3e4e68',
    '--g-main-sidebar-menu-active-bg': '#a6e4f8',
    '--g-main-sidebar-menu-active-color': '#3e4e68',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#e3e8f2',
    '--g-sub-sidebar-logo-color': '#3e4e68',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#e3e8f2',
    '--g-sub-sidebar-menu-hover-color': '#3e4e68',
    '--g-sub-sidebar-menu-active-bg': '#a6e4f8',
    '--g-sub-sidebar-menu-active-color': '#3e4e68',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
  cyberpunk: {
    // 颜色主题
    'color-scheme': 'light',
    // 内置 UI
    '--ui-primary': hex2rgba('#dbcb00')!.join(' '),
    '--ui-text': hex2rgba('#0f0f0f')!.join(' '),
    // 主体
    '--g-bg': '#f2f2f2',
    '--g-container-bg': '#fff',
    '--g-border-color': '#f2f2f2',
    // 头部
    '--g-header-bg': '#fff',
    '--g-header-color': '#302d12',
    '--g-header-menu-color': '#302d12',
    '--g-header-menu-hover-bg': '#dbcb00',
    '--g-header-menu-hover-color': '#302d12',
    '--g-header-menu-active-bg': '#dbcb00',
    '--g-header-menu-active-color': '#302d12',
    // 主导航
    '--g-main-sidebar-bg': '#f2f2f2',
    '--g-main-sidebar-menu-color': '#302d12',
    '--g-main-sidebar-menu-hover-bg': '#dbcb00',
    '--g-main-sidebar-menu-hover-color': '#302d12',
    '--g-main-sidebar-menu-active-bg': '#dbcb00',
    '--g-main-sidebar-menu-active-color': '#302d12',
    // 次导航
    '--g-sub-sidebar-bg': '#fff',
    '--g-sub-sidebar-logo-bg': '#dbcb00',
    '--g-sub-sidebar-logo-color': '#302d12',
    '--g-sub-sidebar-menu-color': '#0f0f0f',
    '--g-sub-sidebar-menu-hover-bg': '#dbcb00',
    '--g-sub-sidebar-menu-hover-color': '#302d12',
    '--g-sub-sidebar-menu-active-bg': '#dbcb00',
    '--g-sub-sidebar-menu-active-color': '#302d12',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a3a3a3',
    '--g-tabbar-tab-color': '#a3a3a3',
    '--g-tabbar-tab-hover-bg': '#e5e5e5',
    '--g-tabbar-tab-hover-color': '#0f0f0f',
    '--g-tabbar-tab-active-color': '#0f0f0f',
  },
  dark: {
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': hex2rgba('#e5e5e5')!.join(' '),
    '--ui-text': hex2rgba('#0f0f0f')!.join(' '),
    // 主体
    '--g-bg': '#0a0a0a',
    '--g-container-bg': '#141414',
    '--g-border-color': '#15191e',
    // 头部
    '--g-header-bg': '#141414',
    '--g-header-color': '#e5e5e5',
    '--g-header-menu-color': '#a8a29e',
    '--g-header-menu-hover-bg': '#141414',
    '--g-header-menu-hover-color': '#e5e5e5',
    '--g-header-menu-active-bg': '#e5e5e5',
    '--g-header-menu-active-color': '#0a0a0a',
    // 主导航
    '--g-main-sidebar-bg': '#0a0a0a',
    '--g-main-sidebar-menu-color': '#a8a29e',
    '--g-main-sidebar-menu-hover-bg': '#141414',
    '--g-main-sidebar-menu-hover-color': '#e5e5e5',
    '--g-main-sidebar-menu-active-bg': '#e5e5e5',
    '--g-main-sidebar-menu-active-color': '#0a0a0a',
    // 次导航
    '--g-sub-sidebar-bg': '#141414',
    '--g-sub-sidebar-logo-bg': '#0f0f0f',
    '--g-sub-sidebar-logo-color': '#e5e5e5',
    '--g-sub-sidebar-menu-color': '#a8a29e',
    '--g-sub-sidebar-menu-hover-bg': '#0a0a0a',
    '--g-sub-sidebar-menu-hover-color': '#e5e5e5',
    '--g-sub-sidebar-menu-active-bg': '#e5e5e5',
    '--g-sub-sidebar-menu-active-color': '#0a0a0a',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a8a29e',
    '--g-tabbar-tab-color': '#a8a29e',
    '--g-tabbar-tab-hover-bg': '#1b1b1b',
    '--g-tabbar-tab-hover-color': '#e5e5e5',
    '--g-tabbar-tab-active-color': '#e5e5e5',
  },
  dracula: {
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': hex2rgba('#a6adbb')!.join(' '),
    '--ui-text': hex2rgba('#242b33')!.join(' '),
    // 主体
    '--g-bg': '#272935',
    '--g-container-bg': '#1d232a',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#191E24',
    '--g-header-color': '#f8f8f2',
    '--g-header-menu-color': '#a6adbb',
    '--g-header-menu-hover-color': '#f8f8f2',
    '--g-header-menu-hover-bg': '#181920',
    '--g-header-menu-active-color': '#f8f8f2',
    '--g-header-menu-active-bg': '#414558',
    // 主导航
    '--g-main-sidebar-bg': '#191E24',
    '--g-main-sidebar-menu-color': '#a6adbb',
    '--g-main-sidebar-menu-hover-color': '#f8f8f2',
    '--g-main-sidebar-menu-hover-bg': '#181920',
    '--g-main-sidebar-menu-active-color': '#f8f8f2',
    '--g-main-sidebar-menu-active-bg': '#414558',
    // 次导航
    '--g-sub-sidebar-bg': '#1d232a',
    '--g-sub-sidebar-logo-color': '#1d232a',
    '--g-sub-sidebar-logo-bg': '#a6adbb',
    '--g-sub-sidebar-menu-color': '#a6adbb',
    '--g-sub-sidebar-menu-hover-color': '#f8f8f2',
    '--g-sub-sidebar-menu-hover-bg': '#181920',
    '--g-sub-sidebar-menu-active-color': '#f8f8f2',
    '--g-sub-sidebar-menu-active-bg': '#414558',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#f8f8f2',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#f8f8f2',
  },
  night: {
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': hex2rgba('#0ca6e9')!.join(' '),
    '--ui-text': hex2rgba('#242b33')!.join(' '),
    // 主体
    '--g-bg': '#0f1729',
    '--g-container-bg': '#1d283a',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#0f1729',
    '--g-header-color': '#c8cad0',
    '--g-header-menu-color': '#a6adbb',
    '--g-header-menu-hover-color': '#c8cad0',
    '--g-header-menu-hover-bg': '#1d283a',
    '--g-header-menu-active-color': '#c8cad0',
    '--g-header-menu-active-bg': '#1d283a',
    // 主导航
    '--g-main-sidebar-bg': '#0f1729',
    '--g-main-sidebar-menu-color': '#a6adbb',
    '--g-main-sidebar-menu-hover-color': '#c8cad0',
    '--g-main-sidebar-menu-hover-bg': '#1d283a',
    '--g-main-sidebar-menu-active-color': '#c8cad0',
    '--g-main-sidebar-menu-active-bg': '#1d283a',
    // 次导航
    '--g-sub-sidebar-bg': '#1d283a',
    '--g-sub-sidebar-logo-color': '#1d232a',
    '--g-sub-sidebar-logo-bg': '#a6adbb',
    '--g-sub-sidebar-menu-color': '#a6adbb',
    '--g-sub-sidebar-menu-hover-color': '#c8cad0',
    '--g-sub-sidebar-menu-hover-bg': '#273449',
    '--g-sub-sidebar-menu-active-color': '#c8cad0',
    '--g-sub-sidebar-menu-active-bg': '#0f1729',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
  luxury: {
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': hex2rgba('#dca54c')!.join(' '),
    '--ui-text': hex2rgba('#242b33')!.join(' '),
    // 主体
    '--g-bg': '#09090b',
    '--g-container-bg': '#171618',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#09090b',
    '--g-header-color': '#dca54c',
    '--g-header-menu-color': '#dca54c',
    '--g-header-menu-hover-color': '#dca54c',
    '--g-header-menu-hover-bg': '#331800',
    '--g-header-menu-active-color': '#ffe7a3',
    '--g-header-menu-active-bg': '#331800',
    // 主导航
    '--g-main-sidebar-bg': '#09090b',
    '--g-main-sidebar-menu-color': '#dca54c',
    '--g-main-sidebar-menu-hover-color': '#dca54c',
    '--g-main-sidebar-menu-hover-bg': '#331800',
    '--g-main-sidebar-menu-active-color': '#ffe7a3',
    '--g-main-sidebar-menu-active-bg': '#331800',
    // 次导航
    '--g-sub-sidebar-bg': '#171618',
    '--g-sub-sidebar-logo-color': '#e3d664',
    '--g-sub-sidebar-logo-bg': '#09090b',
    '--g-sub-sidebar-menu-color': '#dca54c',
    '--g-sub-sidebar-menu-hover-color': '#dca54c',
    '--g-sub-sidebar-menu-hover-bg': '#331800',
    '--g-sub-sidebar-menu-active-color': '#ffe7a3',
    '--g-sub-sidebar-menu-active-bg': '#331800',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
  synthwave: {
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': hex2rgba('#58c7f3')!.join(' '),
    '--ui-text': hex2rgba('#1a272e')!.join(' '),
    // 主体
    '--g-bg': '#1a103c',
    '--g-container-bg': '#221551',
    '--g-border-color': '#191E24',
    // 头部
    '--g-header-bg': '#1a103c',
    '--g-header-color': '#f9f7fd',
    '--g-header-menu-color': '#f9f7fd',
    '--g-header-menu-hover-color': '#f9f7fd',
    '--g-header-menu-hover-bg': '#221551',
    '--g-header-menu-active-color': '#f9f7fd',
    '--g-header-menu-active-bg': '#221551',
    // 主导航
    '--g-main-sidebar-bg': '#1a103c',
    '--g-main-sidebar-menu-color': '#f9f7fd',
    '--g-main-sidebar-menu-hover-color': '#f9f7fd',
    '--g-main-sidebar-menu-hover-bg': '#221551',
    '--g-main-sidebar-menu-active-color': '#f9f7fd',
    '--g-main-sidebar-menu-active-bg': '#221551',
    // 次导航
    '--g-sub-sidebar-bg': '#221551',
    '--g-sub-sidebar-logo-color': '#f9f7fd',
    '--g-sub-sidebar-logo-bg': '#1a103c',
    '--g-sub-sidebar-menu-color': '#f9f7fd',
    '--g-sub-sidebar-menu-hover-color': '#f9f7fd',
    '--g-sub-sidebar-menu-hover-bg': '#160e35',
    '--g-sub-sidebar-menu-active-color': '#f9f7fd',
    '--g-sub-sidebar-menu-active-bg': '#160e35',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#242b33',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
  stone: {
    // 颜色主题
    'color-scheme': 'dark',
    // 内置 UI
    '--ui-primary': hex2rgba('#68d1bf')!.join(' '),
    '--ui-text': hex2rgba('#1b1a18')!.join(' '),
    // 主体
    '--g-bg': '#1b1917',
    '--g-container-bg': '#282524',
    '--g-border-color': '#43403c',
    // 头部
    '--g-header-bg': '#1b1917',
    '--g-header-color': '#e7e5e4',
    '--g-header-menu-color': '#e7e5e4',
    '--g-header-menu-hover-color': '#e7e5e4',
    '--g-header-menu-hover-bg': '#282524',
    '--g-header-menu-active-color': '#e7e5e4',
    '--g-header-menu-active-bg': '#282524',
    // 主导航
    '--g-main-sidebar-bg': '#1b1917',
    '--g-main-sidebar-menu-color': '#e7e5e4',
    '--g-main-sidebar-menu-hover-color': '#e7e5e4',
    '--g-main-sidebar-menu-hover-bg': '#282524',
    '--g-main-sidebar-menu-active-color': '#e7e5e4',
    '--g-main-sidebar-menu-active-bg': '#282524',
    // 次导航
    '--g-sub-sidebar-bg': '#282524',
    '--g-sub-sidebar-logo-color': '#e7e5e4',
    '--g-sub-sidebar-logo-bg': '#1a103c',
    '--g-sub-sidebar-menu-color': '#e7e5e4',
    '--g-sub-sidebar-menu-hover-color': '#e7e5e4',
    '--g-sub-sidebar-menu-hover-bg': '#1b1917',
    '--g-sub-sidebar-menu-active-color': '#e7e5e4',
    '--g-sub-sidebar-menu-active-bg': '#1b1917',
    // 标签栏
    '--g-tabbar-dividers-bg': '#a6adbb',
    '--g-tabbar-tab-color': '#a6adbb',
    '--g-tabbar-tab-hover-color': '#c8cad0',
    '--g-tabbar-tab-hover-bg': '#282524',
    '--g-tabbar-tab-active-color': '#c8cad0',
  },
}
