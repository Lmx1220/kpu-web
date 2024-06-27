import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
    enableErrorLog: true,
  },
  home: {
    fullPath: '/',
  },
  userPreferences: {
    enable: true,
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    style: 'dot',
    isRounded: true,
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  topbar: {
    mode: 'fixed',
  },
  tabbar: {
    enable: true,
    style: 'fashion',
    enableIcon: true,
    enableMemory: true,
    enableHotkeys: true,
  },
  toolbar: {
    favorites: true,
    notification: true,
    i18n: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  breadcrumb: {
    style: 'modern',
    enableMainMenu: true,
  },
  mainPage: {
    enableHotkeys: true,
    iframeCacheMax: 9,
    transitionMode: 'slide-right',
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
