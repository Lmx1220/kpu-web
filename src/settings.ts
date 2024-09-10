import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableErrorLog: true,
  },
  userPreferences: {
    enable: true,
  },
  menu: {
    isRounded: true,
    style: 'dot',
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  toolbar: {
    favorites: true,
    notification: true,
    i18n: true,
    fullscreen: true,
    colorScheme: true,
  },
  copyright: {
    enable: true,
    dates: '2021-present',
    company: 'One-step-admin',
    website: 'https://one-step-admin.hurui.me',
  },
}
export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
