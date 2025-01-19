import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'
import { cloneDeep } from 'es-toolkit'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
    enableErrorLog: true,
    enableCheckUpdates: true,
  },
  userPreferences: {
    enable: true,
  },
  home: {
    fullPath: '/',
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    style: 'dot',
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
    lock: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  breadcrumb: {
    style: 'modern',
    enableMainMenu: true,
  },
  mainPage: {
    iframeCacheMax: 9,
    transitionMode: 'slide-right',
  },
  copyright: {
    enable: true,
    dates: '2020-present',
    company: 'Fantastic-admin',
    website: 'https://fantastic-admin.hurui.me',
  },
}
export default merge(globalSettings, cloneDeep(settingsDefault)) as RecursiveRequired<Settings.all>
