import type { Menu } from '#/global'

const menus: Menu.recordRaw = {
  title: '外链',
  icon: 'i-ri:external-link-fill',
  children: [
    {
      title: 'Gitee 仓库',
      windowName: 'https://gitee.com/one-step-admin/basic',
    },
    {
      title: 'Github 仓库',
      windowName: 'https://github.com/one-step-admin/basic',
    },
  ],
}

export default menus
