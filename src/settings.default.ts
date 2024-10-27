// 该文件为系统默认配置，请勿修改！！！

import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    lightTheme: 'light',
    darkTheme: 'dark',
    colorScheme: 'light',
    enableMournMode: false,
    enableColorAmblyopiaMode: false,
    defaultLang: '',
    enablePermission: false,
    storagePrefix: 'osa_',
    enableWatermark: false,
    enableErrorLog: false,
    direction: 'ltr',
  },
  userPreferences: {
    enable: false,
    storageTo: 'local',
  },
  menu: {
    baseOn: 'frontend',
    mode: 'side',
    style: '',
    isRounded: false,
    switchMainMenuAndOpenWindow: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    subMenuAutoCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  favorites: {
    storageTo: 'local',
  },
  toolbar: {
    previewWindows: true,
    favorites: false,
    navSearch: true,
    notification: false,
    lock: false,
    i18n: false,
    fullscreen: false,
    colorScheme: false,
    layout: ['previewWindows', 'favorites', '->', 'navSearch', 'notification', 'lock', 'i18n', 'fullscreen', 'colorScheme'],
  },
  navSearch: {
    enableHotkeys: true,
  },
  window: {
    defaultWidth: 1000,
    autoPosition: '',
    focusMaxNum: 4,
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
