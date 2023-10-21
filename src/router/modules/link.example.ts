import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/link',
  component: () => import('@/layouts/index.vue'),
  redirect: '/link/iframe',
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'ri:external-link-fill',
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
        cache: !0,
        copyright: !1,
      },
    }, {
      path: 'iframeElement',
      redirect: '',
      name: 'linkExampleIframeElement',
      meta: {
        title: 'Element Plus 官方文档',
        iframe: 'https://element-plus.gitee.io/zh-CN/',
        cache: !0,
        copyright: !1,
      },
    }, {
      path: 'iframeVueRouter',
      redirect: '',
      name: 'linkExampleIframeVueRouter',
      meta: {
        title: 'Vue-Router 官方文档',
        iframe: 'https://router.vuejs.org/zh/',
        cache: !0,
        copyright: !1,
      },
    }, {
      path: 'iframeVuePinia',
      redirect: '',
      name: 'linkExampleIframeVuePinia',
      meta: {
        title: 'Pinia 官方文档',
        iframe: 'https://pinia.vuejs.org/zh/',
        cache: !0,
        copyright: !1,
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
        link: 'https://github.com/muxian/vue3-ts',
      },
    }],
  }],
}
export default routes
