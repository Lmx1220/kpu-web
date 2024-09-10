import type { Menu } from '#/global'

const menus: Menu.recordRaw = {
  title: 'menu.window.root',
  icon: 'i-ri:window-2-line',
  children: [{
    title: 'menu.window.add',
    windowName: 'WindowExampleAdd',
  }, {
    title: 'menu.window.remove',
    windowName: 'WindowExampleRemove',
  }, {
    title: 'menu.window.maximize',
    windowName: 'WindowExampleMaximize',
  }, {
    title: 'menu.window.notitle',
    windowName: 'WindowExampleNoTitle',
    noTitle: true,
  }, {
    title: 'menu.window.params',
    windowName: 'WindowExampleParams',
  }, {
    title: 'menu.window.width',
    windowName: 'WindowExampleWidth',
    windowWidth: 500,
  }],
}

export default menus
