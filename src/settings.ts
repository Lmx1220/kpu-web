import type { Settings } from '#/global'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
    // enableErrorLog: true,
    // enableAppSetting: true,
    theme: 'default',
    colorScheme: 'light',
    elementSize: 'default',
    defaultLang: '',
    enableProgress: true,
    storagePrefix: 'fa_',
    enableWatermark: false,
    routeBaseOn: 'frontend',
    // enableUserPreferences: false,
  },
  layout: {
    enableMobileAdaptation: true,
    widthMode: 'adaption',
  },
  menu: {
    menuFillStyle: 'radius',
    menuActiveStyle: 'dot',
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
    // baseOn: 'frontend',
    menuMode: 'side',
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuOnlyOneHide: false,
    subMenuCollapse: false,
  },
  topbar: {
    mode: 'fixed',
    switchTabbarAndToolbar: false,
  },
  tabbar: {
    enable: true,
    enableIcon: true,
    enableMemory: true,
    enableHotkeys: true,
    style: 'fashion',
    mergeTabsBy: '',
    storageTo: 'local',
  },
  toolbar: {
    enableNotification: true,
    enableI18n: true,
    enableFullscreen: true,
    enablePageReload: true,
    enableColorScheme: true,
  },
  // favorites: {
  //   enable: true,
  //   storageTo: 'local',
  // },
  breadcrumb: {
    style: 'modern',
    enableMainMenu: true,
    enable: true,
  },
  mainPage: {
    enableHotkeys: true,
    transitionMode: 'slide-right',
  //   iframeCacheMax: 9,
  //   transitionMode: 'slide-right',
  //   enableTransition: true,
  },
  home: {
    enable: false,
    title: '主页',
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
  copyright: {
    enable: true,
    dates: '2020-2023',
    company: 'admin',
    website: 'https://admin/',
    beian: '',
  },
}
export default globalSettings
