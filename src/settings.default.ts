import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    lightTheme: 'light',
    darkTheme: 'dark',
    colorScheme: 'light',
    elementSize: 'default',
    defaultLang: 'zh-cn',
    enableProgress: false,
    enableErrorLog: false,
    enablePermission: false,
    routeBaseOn: 'frontend',
    enableDynamicTitle: false,
    storagePrefix: 'fa_',
    enableWatermark: false,
    // enableAppSetting: true,
    enableUserPreferences: false,
  },
  home: {
    enable: true,
    title: 'route.home',
    fullPath: '/',
  },
  navSearch: {
    enableHotkeys: true,
  },
  layout: {
    widthMode: 'adaption',
    enableMobileAdaptation: false,
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'side',
    isRounded: false,
    menuActiveStyle: '',
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuOnlyOneHide: false,
    subMenuCollapse: false,
    subMenuAutoCollapse: false,
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
    favorites: true,
    breadcrumb: true,
    notification: true,
    navSearch: true,
    i18n: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
    layout: ['favorites', 'breadcrumb', '->', 'navSearch', 'notification', 'i18n', 'fullscreen', 'pageReload', 'colorScheme'],
  },
  breadcrumb: {
    enableMainMenu: true,
    style: 'modern',
  },
  mainPage: {
    enableHotkeys: false,
    enableTransition: true,
    transitionMode: 'fade',
    iframeCacheMax: 3,
  },
  favorites: {
    storageTo: 'local',
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
