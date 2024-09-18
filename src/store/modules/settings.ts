import { defaultsDeep } from 'lodash-es'
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import type { Settings } from '#/global'
// import { getLocales } from '@/locales'
import settingsDefault from '@/settings'
import type { LocaleType } from '#/config'
import storage from '@/util/storage.ts'

const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  () => {
    const settings = ref(settingsDefault)

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const currentColorScheme = ref<Exclude<Settings.app['colorScheme'], ''>>()
    watch(() => settings.value.app.colorScheme, (val) => {
      if (val === '') {
        prefersColorScheme.addEventListener('change', updateTheme)
      }
      else {
        prefersColorScheme.removeEventListener('change', updateTheme)
      }
    }, {
      immediate: true,
    })
    watch([
      () => settings.value.app.colorScheme,
      () => settings.value.app.lightTheme,
      () => settings.value.app.darkTheme,
    ], updateTheme, {
      immediate: true,
    })
    function updateTheme() {
      let colorScheme = settings.value.app.colorScheme
      if (colorScheme === '') {
        colorScheme = prefersColorScheme.matches ? 'dark' : 'light'
      }
      currentColorScheme.value = colorScheme
      switch (colorScheme) {
        case 'light':
          document.documentElement.classList.remove('dark')
          document.body.setAttribute('data-theme', settings.value.app.lightTheme)
          break
        case 'dark':
          document.documentElement.classList.add('dark')
          document.body.setAttribute('data-theme', settings.value.app.darkTheme)
          break
      }
    }

    watch([
      () => settings.value.app.enableMournMode,
      () => settings.value.app.enableColorAmblyopiaMode,
    ], (val) => {
      document.documentElement.style.removeProperty('filter')
      if (val[0] && val[1]) {
        document.documentElement.style.setProperty('filter', 'grayscale(100%) invert(80%)')
      }
      else if (val[0]) {
        document.documentElement.style.setProperty('filter', 'grayscale(100%)')
      }
      else if (val[1]) {
        document.documentElement.style.setProperty('filter', 'invert(80%)')
      }
    }, {
      immediate: true,
    })

    watch(() => settings.value.layout.widthMode, (val) => {
      document.body.setAttribute('data-app-width-mode', val)
    }, {
      immediate: true,
    })
    watch(() => settings.value.menu.mode, (val) => {
      document.body.setAttribute('data-menu-mode', val)
    }, {
      immediate: true,
    })

    watch(() => settings.value.app.direction, (val) => {
      document.documentElement.setAttribute('dir', val)
    }, {
      immediate: true,
    })

    // 操作系统
    const os = ref<'mac' | 'windows' | 'linux' | 'other'>('other')
    const agent = navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.includes('mac os'):
        os.value = 'mac'
        break
      case agent.includes('windows'):
        os.value = 'windows'
        break
      case agent.includes('linux'):
        os.value = 'linux'
        break
    }
    const lock = ref<boolean>(storage.local.get('lock') === 'true')

    // 页面标题
    const title = ref<RouteMeta['title']>()

    // 记录页面标题
    function setTitle(_title: RouteMeta['title']) {
      title.value = _title
    }
    // 自定义标题
    const customTitleList = ref<{
      fullPath: RouteLocationNormalized['fullPath']
      title: string
    }[]>([])
    // 设置自定义标题
    function setCustomTitle(fullPath: RouteLocationNormalized['fullPath'], title: string) {
      const index = customTitleList.value.findIndex(item => item.fullPath === fullPath)
      if (index > -1) {
        customTitleList.value[index].title = title
      }
      else {
        customTitleList.value.push({
          fullPath,
          title,
        })
      }
    }
    // 重置自定义标题
    function resetCustomTitle(fullPath: RouteLocationNormalized['fullPath']) {
      const index = customTitleList.value.findIndex(item => item.fullPath === fullPath)
      if (index > -1) {
        customTitleList.value.splice(index, 1)
      }
    }

    // 显示模式
    const mode = ref<'pc' | 'mobile'>('pc')
    // 设置显示模式
    function setMode(width: number) {
      if (settings.value.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          mode.value = 'mobile'
        }
        else {
          // 如果是桌面设备，则根据页面宽度判断是否需要切换为移动端展示
          mode.value = width < 1024 ? 'mobile' : 'pc'
        }
      }
      else {
        mode.value = 'pc'
      }
    }

    // 切换侧边栏导航展开/收起
    function toggleSidebarCollapse() {
      settings.value.menu.subMenuCollapse = !settings.value.menu.subMenuCollapse
    }
    // 次导航是否收起（用于记录 pc 模式下最后的状态）
    const subMenuCollapseLastStatus = ref(settingsDefault.menu.subMenuCollapse)
    watch(() => settings.value.menu.subMenuCollapse, (val) => {
      if (mode.value === 'pc') {
        subMenuCollapseLastStatus.value = val
      }
    })
    watch(mode, (val) => {
      switch (val) {
        case 'pc':
          settings.value.menu.subMenuCollapse = subMenuCollapseLastStatus.value
          break
        case 'mobile':
          settings.value.menu.subMenuCollapse = true
          break
      }
      document.body.setAttribute('data-mode', val)
    }, {
      immediate: true,
    })

    // 切换侧边栏导航自动收起
    function toggleSidebarAutoCollapse() {
      settings.value.menu.subMenuAutoCollapse = !settings.value.menu.subMenuAutoCollapse
      if (settings.value.menu.subMenuAutoCollapse && !settings.value.menu.subMenuCollapse) {
        settings.value.menu.subMenuCollapse = true
      }
      if (!settings.value.menu.subMenuAutoCollapse && settings.value.menu.subMenuCollapse) {
        settings.value.menu.subMenuCollapse = false
      }
    }

    // 是否鼠标悬浮在侧边栏导航上
    const isHoverSidebar = ref(false)
    function setHoverSidebar(value: boolean) {
      isHoverSidebar.value = value
    }

    // 当前语言
    // const lang = computed(() => {
    //   // 如果没设置默认语言，则返回当前浏览器语言设置默认语言
    //   if (settings.value.app.defaultLang === '') {
    //     const lang = navigator.language.toLowerCase()
    //     const locales = getLocales()
    //     if (locales?.[lang]) {
    //       return lang
    //     }
    //   }
    //   return settings.value.app.defaultLang || 'zh-cn'
    // })
    // 设置默认语言
    function setDefaultLang(lang: LocaleType) {
      settings.value.app.defaultLang = lang
    }

    // 设置主题颜色模式
    function setColorScheme(color: Required<Settings.app>['colorScheme']) {
      settings.value.app.colorScheme = color
    }

    // 主页面是否最大化
    const mainPageMaximizeStatus = ref(false)
    // 切换当前主页面最大化
    function setMainPageMaximize(value?: boolean) {
      mainPageMaximizeStatus.value = value ?? !mainPageMaximizeStatus.value
    }

    // 更新应用配置
    function updateSettings(data: Settings.all, fromBase = false) {
      settings.value = defaultsDeep(data, fromBase ? settingsDefault : settings.value)
    }

    return {
      settings,
      currentColorScheme,
      os,
      lock,
      title,
      setTitle,
      customTitleList,
      setCustomTitle,
      resetCustomTitle,
      mode,
      setMode,
      subMenuCollapseLastStatus,
      toggleSidebarCollapse,
      toggleSidebarAutoCollapse,
      isHoverSidebar,
      setHoverSidebar,
      // lang,
      setDefaultLang,
      setColorScheme,
      mainPageMaximizeStatus,
      setMainPageMaximize,
      updateSettings,
    }
  },
)

export default useSettingsStore
