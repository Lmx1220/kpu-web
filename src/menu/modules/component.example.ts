import type { Menu } from '#/global'

const menus: Menu.recordRaw = {
  title: '组件',
  icon: 'i-bx:bxs-component',
  children: [
    {
      title: '基础组件',
      icon: 'i-ep:element-plus',
      windowName: 'ComponentBasicExample',
    },
    {
      title: '内建组件',
      windowName: 'ComponentBuiltInExample',
    },
    {
      title: '扩展组件',
      children: [
        {
          title: '页头',
          windowName: 'ComponentExtendExamplePageheader',
        },
        {
          title: '内容块',
          windowName: 'ComponentExtendExamplePagemain',
        },
        {
          title: '固定底部操作栏',
          windowName: 'ComponentExtendExampleActionContainer',
        },
        {
          title: '搜索面板',
          windowName: 'ComponentExtendExampleSearchbar',
        },
        {
          title: '表格自适应',
          windowName: 'ComponentExtendExampleTableautoheight',
        },
        {
          title: '上传',
          windowName: 'ComponentExtendExampleUpload',
        },
        {
          title: '图片预览',
          windowName: 'ComponentExtendExampleImagePreview',
        },
        {
          title: '趋势标记',
          windowName: 'ComponentExtendExampleTrend',
        },
        {
          title: '省市区街道联动',
          windowName: 'ComponentExtendExamplePcas',
        },
      ],
    },
  ],
}

export default menus
