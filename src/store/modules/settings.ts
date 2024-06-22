import { defaultsDeep } from 'lodash-es'
import type { RouteMeta } from 'vue-router'
import type { CustomTitleList, RecursiveRequired, Settings } from '#/global'
import settingsCustom from '@/settings'
import settingsDefault from '@/settings.default'
import type { LocaleType } from '#/config'

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
    // 设置显示模式
    function setMode(width: number) {
      if (settings.value.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          mode.value = 'mobile'
        }
        else {
          // 如果是桌面设备，则根据页面宽度判断是否需要切换为移动端展示
          mode.value = width < 992 ? 'mobile' : 'pc'
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

    function toggleSidebarAutoCollapse() {
      settings.value.menu.subMenuAutoCollapse = !settings.value.menu.subMenuAutoCollapse
      if (settings.value.menu.subMenuAutoCollapse && !settings.value.menu.subMenuCollapse) {
        settings.value.menu.subMenuCollapse = true
      }
      if (!settings.value.menu.subMenuAutoCollapse && settings.value.menu.subMenuCollapse) {
        settings.value.menu.subMenuCollapse = false
      }
    }
    const isHoverSidebar = ref(false)
    function setHoverSidebar(val: boolean) {
      isHoverSidebar.value = val
    }
    const currentColorScheme = ref<any>('')

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    watch(() => settings.value.app.colorScheme, (value) => {
      value === '' ? prefersColorScheme.addEventListener('change', changeColorScheme) : prefersColorScheme.removeEventListener('change', changeColorScheme)
    }
    , {
      immediate: true,
    })
    watch(() => [settings.value.app.colorScheme, settings.value.app.lightTheme, settings.value.app.darkTheme], changeColorScheme, {
      immediate: true,
    })
    function changeColorScheme() {
      let colorScheme = settings.value.app.colorScheme
      if (colorScheme === '') {
        colorScheme = prefersColorScheme.matches ? 'dark' : 'light'
      }
      switch (colorScheme) {
        case 'light':
          currentColorScheme.value = colorScheme
          document.documentElement.classList.remove('dark')
          document.body.setAttribute('data-theme', settings.value.app.lightTheme)
          break
        case 'dark':
          currentColorScheme.value = colorScheme
          document.documentElement.classList.add('dark')
          document.body.setAttribute('data-theme', settings.value.app.darkTheme)
          break
      }
    }
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
    const customTitleList = ref<CustomTitleList[]>([])
    // 页面标题
    const title = ref<RouteMeta['title']>()
    // 当同时设置了 i18n 时，页面标题的展示优先级，默认为 i18n
    const titleFirst = ref(false)
    // 设置网页标题
    function setCustomTitle(fullPath: string, _title?: string) {
      const index = customTitleList.value.findIndex(item => item.fullPath === fullPath)
      if (index > -1) {
        customTitleList.value[index].title = _title
      }
      else {
        customTitleList.value.push({
          fullPath,
          title: _title,
        })
      }
    }

    function resetCustomTitle(fullPath: string) {
      const index = customTitleList.value.findIndex(item => item.fullPath === fullPath)
      if (index > -1) {
        customTitleList.value.splice(index, 1)
      }
    }
    function setTitle(_title: RouteMeta['title'], _titleFirst: boolean) {
      title.value = _title
      titleFirst.value = _titleFirst
    }
    // 更新应用配置
    function updateSettings(data: Settings.all) {
      settings.value = defaultsDeep(data, settings.value)
    }
    // 设置默认语言
    function setDefaultLang(lang: LocaleType) {
      settings.value.app.defaultLang = lang
    }
    const mainPageMaximizeStatus = ref(false)
    //
    function setColorScheme(colorScheme: '' | 'light' | 'dark') {
      settings.value.app.colorScheme = colorScheme
    }

    function setMainPageMaximize(status?: boolean) {
      mainPageMaximizeStatus.value = status ?? !mainPageMaximizeStatus.value
    }

    return {
      settings,
      currentColorScheme,
      os,
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
