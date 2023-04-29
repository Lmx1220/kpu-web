import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    theme: 'default',
    colorScheme: 'light',
    elementSize: 'default',
    defaultLang: '',
    enableProgress: false,
    enableErrorLog: false,
    enablePermission: false,
    routeBaseOn: 'frontend',
    enableDynamicTitle: false,
    storagePrefix: 'fa_',
    enableWatermark: false,
    enableAppSetting: true,
    enableUserPreferences: false,
  },
  home: {
    enable: true,
    title: '主页',
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
  layout: {
    widthMode: 'adaption',
    enableMobileAdaptation: false,
  },
  menu: {
    // baseOn: 'frontend',
    menuMode: 'side',
    menuFillStyle: '',
    menuActiveStyle: '',
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuOnlyOneHide: false,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  topbar: {
    mode: 'static',
    switchTabbarAndToolbar: false,
  },
  tabbar: {
    enable: false,
    style: 'fashion',
    enableIcon: false,
    mergeTabsBy: '',
    enableMemory: false,
    enableHotkeys: false,
    storageTo: 'local',
  },
  toolbar: {
    enableNotification: true,
    enableI18n: true,
    enableFullscreen: true,
    enablePageReload: true,
    enableColorScheme: true,
  },
  breadcrumb: {
    enable: true,
    enableMainMenu: true,
    style: 'modern',
  },
  mainPage: {
    enableHotkeys: false,
    enableTransition: true,
    transitionMode: 'fade',
    iframeCacheMax: 3,
  },
  copyright: {
    enable: true,
    dates: '2020-2023',
    company: 'admin',
    website: 'https://admin/',
    beian: '',
  },

}

export default globalSettingsDefault
