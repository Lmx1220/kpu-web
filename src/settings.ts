import type { Settings } from '#/global'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
  // enableDynamicTitle: true,
  },
  layout: {
    enableMobileAdaptation: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
}

export default globalSettings
