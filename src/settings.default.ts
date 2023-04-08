import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    /**
     * 颜色方案
     * @默认值 `''` 跟随系统
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme: 'light',
    // 默认语言，留空则跟随系统
    defaultLang: '',
    enablePermission: false,
    routeBaseOn: 'frontend',
  },
  layout: {
    enableMobileAdaptation: false,
  },
  menu: {
    // baseOn: 'frontend',
    menuMode: 'side',
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  copyright: {
    enable: true,
    dates: '2020-2023',
    company: 'Fantastic-admin',
    website: 'https://hooray.gitee.io/fantastic-admin/',
    beian: '',
  },

}

export default globalSettingsDefault
