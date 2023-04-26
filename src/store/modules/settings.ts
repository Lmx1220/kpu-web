import { defaultsDeep } from 'lodash-es'
import type { RouteMeta } from 'vue-router'
import type { RecursiveRequired, Settings } from '#/global'
import settingsCustom from '@/settings'
import settingsDefault from '@/settings.default'

const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  () => {
    const mergeSettings: RecursiveRequired<Settings.all> = defaultsDeep(
      settingsCustom,
      settingsDefault,
    )
    const settings = ref(mergeSettings)

    // 显示模式
    const mode = ref<'pc' | 'mobile'>('pc')
    // 设置访问模式
    function setMode(width: number) {
      if (settings.value.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          mode.value = 'mobile'
        }
        else {
          // 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
          mode.value = width < 992 ? 'mobile' : 'pc'
        }
      }
      else {
        mode.value = 'pc'
      }
    }
    // 侧边栏是否收起（用于记录 pc 模式下最后的状态）
    const subMenuCollapseLastStatus = ref(mergeSettings.menu.subMenuCollapse)
    // 切换侧边栏导航展开/收起
    function toggleSidebarCollapse() {
      settings.value.menu.subMenuCollapse = !settings.value.menu.subMenuCollapse
      if (mode.value === 'pc') {
        subMenuCollapseLastStatus.value = !subMenuCollapseLastStatus.value
      }
    }

    watch(() => settings.value.app.colorScheme, (val) => {
      if (val === '') {
        val = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      switch (val) {
        case 'dark':
          document.documentElement.classList.add('dark')
          break
        case 'light':
          document.documentElement.classList.remove('dark')
          break
      }
    }, {
      immediate: true,
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
    watch(() => settings.value.app.theme, (val) => {
      document.body.setAttribute('data-theme', val)
    }, {
      immediate: true,
    })
    watch(() => settings.value.menu.menuMode, (val) => {
      document.body.setAttribute('data-menu-mode', val)
    }, {
      immediate: true,
    })
    watch(() => settings.value.layout.widthMode, (val) => {
      document.body.setAttribute('data-app-width-mode', val)
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
    // 页面标题
    const title = ref<RouteMeta['title']>()
    // 当同时设置了 i18n 时，页面标题的展示优先级，默认为 i18n
    const titleFirst = ref(false)
    // 设置网页标题
    function setTitle(_title: RouteMeta['title'], _titleFirst: boolean) {
      title.value = _title
      titleFirst.value = _titleFirst
    }
    // 更新应用配置
    function updateSettings(data: Settings.all) {
      settings.value = defaultsDeep(data, settings.value)
    }
    // 设置默认语言
    function setDefaultLang(lang: string) {
      settings.value.app.defaultLang = lang
    }
    const mainPageMaximizeStatus = ref(false)
    //
    function setColorScheme(colorScheme: '' | 'light' | 'dark') {
      settings.value.app.colorScheme = colorScheme
    }
    function setMainPageMaximize(status: boolean | undefined) {
      mainPageMaximizeStatus.value = status ?? !mainPageMaximizeStatus.value
    }
    return {
      settings,
      os,
      title,
      titleFirst,
      setTitle,
      mode,
      setMode,
      subMenuCollapseLastStatus,
      toggleSidebarCollapse,
      updateSettings,
      setDefaultLang,
      mainPageMaximizeStatus,
      setColorScheme,
      setMainPageMaximize,
    }
  },
)
export default useSettingsStore
