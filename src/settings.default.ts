// 该文件为系统默认配置，请勿修改！！！
import type { Settings } from '#/global'
import type { RecursiveRequired } from '#/index'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    themeSync: true,
    lightTheme: 'default',
    darkTheme: 'default',
    colorScheme: 'light',
    radius: 0.5,
    enableMournMode: false,
    enableColorAmblyopiaMode: false,
    defaultLang: '',
    enablePermission: false,
    enableProgress: true,
    enableDynamicTitle: false,
    storagePrefix: 'kpu_',
    enableWatermark: false,
    enableErrorLog: false,
    loginExpiredMode: 'redirect',
    enableCheckUpdates: false,
    checkUpdatesInterval: 1,
    routeBaseOn: 'backend',
    direction: 'ltr',
  },
  userPreferences: {
    enable: false,
    storageTo: 'local',
  },
  home: {
    enable: true,
    title: 'app.route.home',
    fullPath: '/',
  },
  layout: {
    widthMode: 'adaption',
    enableMobileAdaptation: false,
  },
  menu: {
    baseOn: 'frontend',
    mode: 'side',
    style: '',
    mainMenuClickMode: 'switch',
    subMenuUniqueOpened: true,
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
    style: '',
    enableIcon: false,
    dblclickAction: 'close',
    mergeTabsBy: '',
    enableMemory: false,
    enableHotkeys: false,
    storageTo: 'local',
  },
  toolbar: {
    favorites: false,
    breadcrumb: true,
    navSearch: true,
    notification: false,
    lock: false,
    i18n: false,
    fullscreen: false,
    pageReload: false,
    colorScheme: false,
    layout: ['favorites', 'breadcrumb', '->', 'navSearch', 'notification', 'i18n', 'lock', 'fullscreen', 'pageReload', 'colorScheme'],
  },
  favorites: {
    storageTo: 'local',
  },
  breadcrumb: {
    style: '',
    enableMainMenu: false,
  },
  mainPage: {
    enableHotkeys: true,
    iframeCacheMax: 3,
    enableTransition: true,
    transitionMode: 'fade',
  },
  navSearch: {
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '',
    company: '',
    website: '',
    beian: '',
  },
}
export default globalSettingsDefault
