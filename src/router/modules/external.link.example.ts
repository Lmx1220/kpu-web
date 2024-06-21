import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/link',
  component: Layout,
  redirect: '/link/iframe',
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'i-ri:external-link-fill',
  },
  children: [{
    path: 'iframe',
    redirect: '/link/iframe/iframeVue',
    meta: {
      title: '内嵌 Iframe',
    },
    children: [{
      path: 'iframeVue',
      redirect: '',
      name: 'linkExampleIframeVue',
      meta: {
        title: 'Vue 官方文档',
        iframe: 'https://cn.vuejs.org/',
        cache: true,
        copyright: false,
      },
    }, {
      path: 'iframeVueRouter',
      redirect: '',
      name: 'linkExampleIframeVueRouter',
      meta: {
        title: 'Vue-Router 官方文档',
        iframe: 'https://router.vuejs.org/zh/',
        cache: true,
        copyright: false,
      },
    }, {
      path: 'iframeVuePinia',
      redirect: '',
      name: 'linkExampleIframeVuePinia',
      meta: {
        title: 'Pinia 官方文档',
        iframe: 'https://pinia.vuejs.org/zh/',
        cache: true,
        copyright: false,
      },
    }, {
      path: 'iframeElement',
      redirect: '',
      name: 'linkExampleIframeElement',
      meta: {
        title: 'Element Plus 官方文档',
        iframe: 'https://element-plus.org/zh-CN/',
        cache: true,
        copyright: false,
      },
    }],
  }, {
    path: 'window',
    redirect: '/link/window/gitee',
    meta: {
      title: '新窗口打开',
    },
    children: [{
      path: 'gitee',
      redirect: '',
      name: 'linkExampleWindowGitee',
      meta: {
        title: 'Gitee 仓库',
        link: 'https://gitee.com/muxian/vue3-ts',
      },
    }, {
      path: 'github',
      redirect: '',
      name: 'linkExampleWindowGithub',
      meta: {
        title: 'Github 仓库',
        link: 'https://github.com/Lmx1220/vue3-ts',
      },
    }],
  }],
}

export default routes
