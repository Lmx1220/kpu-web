## 创建路由借鉴
```ts
const name = [{
  path: '/standard_module_example',
  component: 'LAYOUT',
  name: 'standardModuleExample',
  meta: {
    title: '标准模块',
    i18n: 'route.standardModule.root',
    icon: 'ic:round-view-module',
    badge: 'PRO',
  },
  children: [
    {
      path: '',
      name: 'standardModuleExampleList',
      component: '',
      meta:
        {
          title: '列表',
          i18n: 'route.standardModule.list',
          menu: false,
          breadcrumb: false,
          cache: [
            'standardModuleExampleCreate',
            'standardModuleExampleEdit',
          ],
        },
    },
    {
      path: 'detail',
      name: 'standardModuleExampleCreate',
      meta:
        {
          title: '新增',
          i18n: 'route.standardModule.create',
          menu: false,
          activeMenu: '/standard_module_example',
          cache: true,
          noCache: 'standardModuleExampleList',
        },
    },
    {
      path: 'detail/:id',
      name: 'standardModuleExampleEdit',
      meta:
        {
          title: '编辑',
          i18n: 'route.standardModule.edit',
          menu: false,
          activeMenu: '/standard_module_example',
          cache: true,
          noCache: 'standardModuleExampleList',
        },
    },
  ],
}, {
  path: 'manager',
  name: 'pagesExampleGeneralManager',
  redirect: '/pages_example/general/manager',
  meta: {
    title: '管理员管理',
    i18n: 'route.general.manager.root'
  },
  children: [
    {
      path: '',
      name: 'pagesExampleGeneralManagerList',
      meta: {
        title: '管理员列表',
        i18n: 'route.general.manager.list',
        menu: false,
        breadcrumb: false,
        cache: ['pagesExampleGeneralManagerCreate', 'pagesExampleGeneralManagerEdit']
      }
    },
    {
      path: 'detail',
      name: 'pagesExampleGeneralManagerCreate',
      meta: {
        title: '新增管理员',
        i18n: 'route.general.manager.create',
        menu: false,
        activeMenu: '/pages_example/general/manager',
        cache: true,
        noCache: 'pagesExampleGeneralManagerList'
      }
    }, {
      path: 'detail/:id',
      name: 'pagesExampleGeneralManagerEdit',
      meta: {
        title: '编辑管理员',
        i18n: 'route.general.manager.edit',
        menu: false,
        activeMenu: '/pages_example/general/manager',
        cache: true,
        noCache: 'pagesExampleGeneralManagerList'
      }
    }]
}, {
  path: 'menu',
  name: 'pagesExampleGeneralMenu',
  redirect: '/pages_example/general/menu',
  meta: {
    title: '导航管理',
    i18n: 'route.general.menu.root',
    badge: '风格1'
  },
  children: [{
    path: '',
    name: 'pagesExampleGeneralMenuList',
    meta: {
      title: '导航列表',
      i18n: 'route.general.menu.list',
      menu: false,
      cache: ['pagesExampleGeneralMenuCreate', 'pagesExampleGeneralMenuEdit']
    }
  }, {
    path: 'detail',
    name: 'pagesExampleGeneralMenuCreate',
    meta: {
      title: '新增导航',
      i18n: 'route.general.menu.create',
      menu: false,
      activeMenu: '/pages_example/general/menu',
      cache: true,
      noCache: 'pagesExampleGeneralMenuList',
      copyright: false,
      paddingBottom: '80px'
    }
  }, {
    path: 'detail/:id',
    name: 'pagesExampleGeneralMenuEdit',
    meta: {
      title: '编辑导航',
      i18n: 'route.general.menu.edit',
      menu: false,
      activeMenu: '/pages_example/general/menu',
      cache: true,
      noCache: 'pagesExampleGeneralMenuList',
      copyright: false,
      paddingBottom: '80px'
    }
  }]
}]
```
