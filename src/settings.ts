import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  app: {
    // enablePermission: true,
    enableDynamicTitle: true,
    // enableErrorLog: true,
    // enableAppSetting: true,
    lightTheme: 'light',
    darkTheme: 'dark',
    colorScheme: 'light',
    defaultLang: undefined,
    enableProgress: true,
    storagePrefix: 'fa_',
    enableWatermark: false,
    // routeBaseOn: 'backend',
    // enableUserPreferences: false,
  },
  layout: {
    enableMobileAdaptation: true,
    widthMode: 'adaption',
  },
  menu: {
    isRounded: true,
    menuActiveStyle: 'dot',
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
    // menuMode: 'head',
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
    mergeTabsBy: 'activeMenu',
    storageTo: 'local',
  },
  toolbar: {
    notification: true,
    i18n: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  favorites: {
    storageTo: 'local',
  },
  breadcrumb: {
    style: 'modern',
    enableMainMenu: true,
  },
  mainPage: {
    enableHotkeys: true,
    transitionMode: 'slide-right',
  //   iframeCacheMax: 9,
  //   transitionMode: 'slide-right',
  //   enableTransition: true,
  },
  home: {
    enable: true,
    title: '主页',
  },
  navSearch: {
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
export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
