<script setup lang="ts">
import Sortable from 'sortablejs'
import { useClipboard } from '@vueuse/core'
import Message from 'vue-m-message'
import themes from '../../../../themes'
import settingsDefault from '@/settings.default'
import { getTwoObjectDiff } from '@/util'
import eventBus from '@/util/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'AppSetting',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const isShow = ref(false)

const themeList = computed(() => {
  return Object.keys(themes).map((key) => {
    return {
      label: key,
      value: (themes as any)[key],
    }
  }).filter(item => item.value['color-scheme'] === settingsStore.currentColorScheme)
})

watch(() => settingsStore.settings.menu.mode, (value) => {
  if (value === 'single') {
    menuStore.setActived(0)
  }
  else {
    menuStore.setActived(route.fullPath)
  }
})

// eslint-disable-next-line unused-imports/no-unused-vars
let toolbarLayoutSortable: Sortable
const toolbarLayoutRef = ref()
watch(() => toolbarLayoutRef.value, (val) => {
  if (val) {
    toolbarLayoutSortable = new Sortable(toolbarLayoutRef.value, {
      animation: 200,
      ghostClass: 'op-30',
      draggable: '.draggable',
      filter: '.no-drag',
      onUpdate: (e) => {
        if (e.newIndex !== undefined && e.oldIndex !== undefined) {
          settingsStore.settings.toolbar.layout.splice(e.newIndex, 0, settingsStore.settings.toolbar.layout.splice(e.oldIndex, 1)[0])
        }
      },
    })
  }
})

onMounted(() => {
  eventBus.on('global-app-setting-toggle', () => {
    isShow.value = !isShow.value
  })
})

const { copy, copied, isSupported } = useClipboard()

watch(copied, (val) => {
  if (val) {
    Message.success('复制成功，请粘贴到 src/settings.ts 文件中！', {
      zIndex: 2000,
    })
  }
})

function handleCopy() {
  copy(JSON.stringify(getTwoObjectDiff(settingsDefault, settingsStore.settings), null, 2))
}
</script>

<template>
  <HSlideover v-model="isShow" title="应用配置" :side="settingsStore.settings.app.direction === 'ltr' ? 'right' : 'left'">
    <div class="rounded-2 bg-rose/20 px-4 py-2 text-sm/6 c-rose">
      <p class="my-1">
        应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到 src/settings.ts 文件中。
      </p>
      <p class="my-1">
        注意：在生产环境中应关闭该模块。
      </p>
    </div>
    <div>
      <div class="divider">
        颜色主题风格
      </div>
      <div class="flex items-center justify-center pb-4">
        <HTabList
          v-model="settingsStore.settings.app.colorScheme"
          :options="[
            { icon: 'i-ri:sun-line', label: '明亮', value: 'light' },
            { icon: 'i-ri:moon-line', label: '暗黑', value: 'dark' },
            { icon: 'i-ri:computer-line', label: '系统', value: '' },
          ]"
          class="w-60"
        />
      </div>
      <div class="themes">
        <div v-for="item in themeList" :key="item.label" class="theme" :class="{ active: settingsStore.currentColorScheme === 'dark' ? settingsStore.settings.app.darkTheme === item.label : settingsStore.settings.app.lightTheme === item.label }" @click="settingsStore.currentColorScheme === 'dark' ? settingsStore.settings.app.darkTheme = item.label : settingsStore.settings.app.lightTheme = item.label">
          <div class="content" :style="`background-color: rgb(${item.value['--ui-primary']});`" />
        </div>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'">
      <div class="divider">
        导航栏模式
      </div>
      <div class="menu-mode">
        <HTooltip text="侧边栏模式 (含主导航)" placement="bottom" :delay="500">
          <div class="mode mode-side" :class="{ active: settingsStore.settings.menu.mode === 'side' }" @click="settingsStore.settings.menu.mode = 'side'">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="顶部模式" placement="bottom" :delay="500">
          <div class="mode mode-head" :class="{ active: settingsStore.settings.menu.mode === 'head' }" @click="settingsStore.settings.menu.mode = 'head'">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="侧边栏模式 (不含主导航)" placement="bottom" :delay="500">
          <div class="mode mode-single" :class="{ active: settingsStore.settings.menu.mode === 'single' }" @click="settingsStore.settings.menu.mode = 'single'">
            <div class="mode-container" />
          </div>
        </HTooltip>
      </div>
      <div class="menu-mode">
        <HTooltip text="侧边栏精简模式" placement="bottom" :delay="500">
          <div class="mode mode-only-side" :class="{ active: settingsStore.settings.menu.mode === 'only-side' }" @click="settingsStore.settings.menu.mode = 'only-side'">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="顶部精简模式" placement="bottom" :delay="500">
          <div class="mode mode-only-head" :class="{ active: settingsStore.settings.menu.mode === 'only-head' }" @click="settingsStore.settings.menu.mode = 'only-head'">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="侧边栏面板模式" placement="bottom" :delay="500">
          <div class="mode mode-side-panel" :class="{ active: settingsStore.settings.menu.mode === 'side-panel' }" @click="settingsStore.settings.menu.mode = 'side-panel'">
            <div class="mode-container" />
          </div>
        </HTooltip>
        <HTooltip text="顶部面板模式" placement="bottom" :delay="500">
          <div class="mode mode-head-panel" :class="{ active: settingsStore.settings.menu.mode === 'head-panel' }" @click="settingsStore.settings.menu.mode = 'head-panel'">
            <div class="mode-container" />
          </div>
        </HTooltip>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'">
      <div class="divider">
        页宽模式
      </div>
      <div class="app-width-mode">
        <HTooltip text="自适应" placement="bottom" :delay="500">
          <div class="mode mode-adaption" :class="{ active: settingsStore.settings.layout.widthMode === 'adaption' }" @click="settingsStore.settings.layout.widthMode = 'adaption'">
            <SvgIcon name="i-ep:back" class="left" />
            <SvgIcon name="i-ep:right" class="right" />
          </div>
        </HTooltip>
        <HTooltip text="自适应 (有最小宽度)" placement="bottom" :delay="500">
          <div class="mode mode-adaption-min-width" :class="{ active: settingsStore.settings.layout.widthMode === 'adaption-min-width' }" @click="settingsStore.settings.layout.widthMode = 'adaption-min-width'">
            <SvgIcon name="i-ep:back" class="left" />
            <SvgIcon name="i-ep:right" class="right" />
          </div>
        </HTooltip>
        <HTooltip text="定宽居中" placement="bottom" :delay="500">
          <div class="mode mode-center" :class="{ active: settingsStore.settings.layout.widthMode === 'center' }" @click="settingsStore.settings.layout.widthMode = 'center'" />
        </HTooltip>
        <HTooltip text="定宽居中 (有最大宽度)" placement="bottom" :delay="500">
          <div class="mode mode-center-max-width" :class="{ active: settingsStore.settings.layout.widthMode === 'center-max-width' }" @click="settingsStore.settings.layout.widthMode = 'center-max-width'">
            <SvgIcon name="i-ep:back" class="left" />
            <SvgIcon name="i-ep:right" class="right" />
          </div>
        </HTooltip>
      </div>
    </div>
    <div>
      <div class="divider">
        页面切换动画
      </div>
      <div class="flex items-center justify-center pb-4">
        <HToggle v-model="settingsStore.settings.mainPage.enableTransition" />
      </div>
      <div v-if="settingsStore.settings.mainPage.enableTransition" class="transition-mode">
        <HTooltip text="淡入淡出" placement="bottom" :delay="500">
          <div class="mode mode-fade" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'fade' }" @click="settingsStore.settings.mainPage.transitionMode = 'fade'" />
        </HTooltip>
        <HTooltip text="向左滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-left" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-left' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-left'" />
        </HTooltip>
        <HTooltip text="向右滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-right" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-right' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-right'" />
        </HTooltip>
        <HTooltip text="向上滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-top" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-top' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-top'" />
        </HTooltip>
        <HTooltip text="向下滑动" placement="bottom" :delay="500">
          <div class="mode mode-slide-bottom" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-bottom' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-bottom'" />
        </HTooltip>
      </div>
    </div>
    <div>
      <div class="divider">
        导航栏
      </div>
      <div class="setting-item">
        <div class="label">
          主导航切换跳转
          <HTooltip text="切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.menu.switchMainMenuAndPageJump" :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航自动隐藏
          <HTooltip text="切换主导航时，如果次导航里只有一个导航时，则自动隐藏">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.menu.subMenuOnlyOneHide" :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航保持展开一个
          <HTooltip text="次导航只保持单个菜单的展开">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.menu.subMenuUniqueOpened" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航是否收起
        </div>
        <HToggle v-model="settingsStore.settings.menu.subMenuCollapse" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航是否自动收起
          <HTooltip text="次导航收起时，鼠标悬停会临时展开">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.menu.subMenuAutoCollapse" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          显示次导航展开/收起按钮
        </div>
        <HToggle v-model="settingsStore.settings.menu.enableSubMenuCollapseButton" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          是否圆角
        </div>
        <HToggle v-model="settingsStore.settings.menu.isRounded" />
      </div>
      <div class="setting-item">
        <div class="label">
          激活风格
        </div>
        <HCheckList
          v-model="settingsStore.settings.menu.menuActiveStyle" :options="[
            { icon: 'i-jam:stop-sign', value: '' },
            { icon: ['head', 'only-head'].includes(settingsStore.settings.menu.mode) ? 'i-ep:caret-top' : 'i-ep:caret-left', value: 'arrow' },
            { icon: ['side', 'only-side'].includes(settingsStore.settings.menu.mode) ? 'i-tabler:minus-vertical' : 'i-tabler:minus', value: 'line' },
            { icon: 'i-icon-park-outline:dot', value: 'dot' },
          ]" :disabled="settingsStore.settings.menu.mode === 'single'"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <HToggle v-model="settingsStore.settings.menu.enableHotkeys" :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
    </div>
    <div>
      <div class="divider">
        顶栏
      </div>
      <div class="setting-item">
        <div class="label">
          模式
        </div>
        <HCheckList
          v-model="settingsStore.settings.topbar.mode" :options="[
            { label: '静止', value: 'static' },
            { label: '固定', value: 'fixed' },
            { label: '粘性', value: 'sticky' },
          ]"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          展示切换
          <HTooltip text="切换标签栏和工具栏的展示顺序">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.topbar.switchTabbarAndToolbar" />
      </div>
    </div>
    <div>
      <div class="divider">
        标签栏
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          风格
        </div>
        <HCheckList
          v-model="settingsStore.settings.tabbar.style" :options="[
            { label: '默认', value: '' },
            { label: '时尚', value: 'fashion' },
            { label: '卡片', value: 'card' },
            { label: '方块', value: 'square' },
          ]" :disabled="!settingsStore.settings.tabbar.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          是否显示图标
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enableIcon" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          标签页合并规则
        </div>
        <HSelect
          v-model="settingsStore.settings.tabbar.mergeTabsBy" :options="[
            { label: '不合并', value: '' },
            { label: '根据 activeMenu 合并', value: 'activeMenu' },
            { label: '根据路由名称合并', value: 'routeName' },
          ]"
          :disabled="!settingsStore.settings.tabbar.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用记忆功能
          <HTooltip text="非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enableMemory" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enableHotkeys" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
    </div>
    <div>
      <div class="divider">
        工具栏
      </div>
      <div class="setting-item">
        <div class="label">
          收藏夹
          <HTooltip text="可将常用导航添加进收藏夹，方便快读访问">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.favorites" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          面包屑导航
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.breadcrumb" />
      </div>
      <div class="setting-item">
        <div class="label">
          导航搜索
          <HTooltip text="对导航进行快捷搜索">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.navSearch" />
      </div>
      <div class="setting-item">
        <div class="label">
          通知中心
          <HTooltip text="该功能具体业务功能需自行开发，框架仅提供示例模版">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.notification" />
      </div>
      <div class="setting-item">
        <div class="label">
          国际化
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.i18n" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          全屏
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.fullscreen" />
      </div>
      <div class="setting-item">
        <div class="label">
          页面刷新
          <HTooltip text="使用框架内提供的刷新功能进行页面刷新">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.pageReload" />
      </div>
      <div class="setting-item">
        <div class="label">
          颜色主题
          <HTooltip text="可切换明亮/暗黑模式">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.toolbar.colorScheme" />
      </div>
      <div ref="toolbarLayoutRef" class="mx-4 my-2 flex items-center rounded-2 px-2 py-1 ring-1 ring-stone-2 dark-ring-stone-7">
        <span
          v-for="tool in settingsStore.settings.toolbar.layout" :key="tool" class="draggable flex-center p-1" :class="{
            'flex-1 text-stone-3 dark-text-stone-7 no-drag': tool === '->',
            'cursor-ew-resize': tool !== '->' && settingsStore.settings.toolbar[tool],
            'pointer-events-none w-0 op-0 p-0! no-drag': tool !== '->' && !settingsStore.settings.toolbar[tool],
          }"
        >
          <SvgIcon v-if="tool === 'favorites'" name="i-uiw:star-off" />
          <SvgIcon v-if="tool === 'breadcrumb'" name="i-ic:twotone-double-arrow" :rotate="settingsStore.settings.app.direction === 'rtl' ? 180 : 0" />
          <SvgIcon v-if="tool === 'navSearch'" name="i-ri:search-line" />
          <SvgIcon v-if="tool === 'notification'" name="i-ri:notification-3-line" />
          <SvgIcon v-if="tool === 'i18n'" name="i-ri:translate" />
          <SvgIcon v-if="tool === 'fullscreen'" name="i-ri:fullscreen-line" />
          <SvgIcon v-if="tool === 'pageReload'" name="i-iconoir:refresh-double" />
          <SvgIcon v-if="tool === 'colorScheme'" name="i-ri:sun-line" />
          <span v-if="tool === '->'" class="pointer-events-none text-sm">布局调整</span>
        </span>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'">
      <div class="divider">
        面包屑导航
      </div>
      <div class="setting-item">
        <div class="label">
          风格
        </div>
        <HCheckList
          v-model="settingsStore.settings.breadcrumb.style" :options="[
            { label: '默认', value: '' },
            { label: '现代', value: 'modern' },
          ]" :disabled="!settingsStore.settings.toolbar.breadcrumb"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          是否显示主导航
        </div>
        <HToggle v-model="settingsStore.settings.breadcrumb.enableMainMenu" :disabled="!settingsStore.settings.toolbar.breadcrumb || ['single'].includes(settingsStore.settings.menu.mode)" />
      </div>
    </div>
    <div>
      <div class="divider">
        页面
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <HToggle v-model="settingsStore.settings.mainPage.enableHotkeys" />
      </div>
    </div>
    <div>
      <div class="divider">
        导航搜索
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <HToggle v-model="settingsStore.settings.navSearch.enableHotkeys" :disabled="!settingsStore.settings.toolbar.navSearch" />
      </div>
    </div>
    <div>
      <div class="divider">
        底部版权
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <HToggle v-model="settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          日期
        </div>
        <HInput v-model="settingsStore.settings.copyright.dates" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          公司
        </div>
        <HInput v-model="settingsStore.settings.copyright.company" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          网址
        </div>
        <HInput v-model="settingsStore.settings.copyright.website" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          备案
        </div>
        <HInput v-model="settingsStore.settings.copyright.beian" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
    </div>
    <div>
      <div class="divider">
        主页
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用
          <HTooltip text="该功能开启时，登录成功默认进入主页，反之则默认进入导航栏里第一个导航页面">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.home.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          主页名称
          <HTooltip text="开启国际化时，该设置无效">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HInput v-model="settingsStore.settings.home.title" :disabled="settingsStore.settings.toolbar.i18n" />
      </div>
    </div>
    <div>
      <div class="divider">
        其它
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用权限
        </div>
        <HToggle v-model="settingsStore.settings.app.enablePermission" />
      </div>
      <div class="setting-item">
        <div class="label">
          载入进度条
          <HTooltip text="该功能开启时，跳转路由会看到页面顶部有进度条">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.app.enableProgress" />
      </div>
      <div class="setting-item">
        <div class="label">
          动态标题
          <HTooltip text="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HToggle v-model="settingsStore.settings.app.enableDynamicTitle" />
      </div>
      <div class="setting-item">
        <div class="label">
          Storage 前缀
          <HTooltip text="localStorage 和 sessionStorage 的字段前缀">
            <SvgIcon name="i-ri:question-line" />
          </HTooltip>
        </div>
        <HInput v-model="settingsStore.settings.app.storagePrefix" />
      </div>
      <div class="setting-item">
        <div class="label">
          页面水印
        </div>
        <HToggle v-model="settingsStore.settings.app.enableWatermark" />
      </div>
      <div class="setting-item">
        <div class="label">
          文本方向
        </div>
        <HCheckList
          v-model="settingsStore.settings.app.direction" :options="[
            { label: 'LTR', value: 'ltr' },
            { label: 'RTL', value: 'rtl' },
          ]"
        />
      </div>
    </div>
    <template v-if="isSupported" #footer>
      <HButton block @click="handleCopy">
        <SvgIcon name="i-ep:document-copy" />
        复制配置
      </HButton>
    </template>
  </HSlideover>
</template>

<style lang="scss" scoped>
.divider {
  --at-apply: flex items-center justify-between gap-4 my-4 whitespace-nowrap text-sm font-500;

  &::before,
  &::after {
    --at-apply: content-empty w-full h-1px bg-stone-2 dark-bg-stone-6;
  }
}

.themes {
  --at-apply: flex flex-wrap items-center justify-center gap-4 pb-4;

  .theme {
    --at-apply: flex items-center justify-center w-12 h-12 rounded-2 ring-1 ring-stone-2 dark-ring-stone-7 cursor-pointer transition;

    &.active {
      --at-apply: ring-ui-primary ring-2;

      .content {
        --at-apply: rotate-0;
      }
    }

    .content {
      --at-apply: w-6 h-4 rounded-50% -rotate-45 transition;
    }
  }
}

.menu-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark-ring-stone-7 cursor-pointer transition;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::before,
    &::after,
    .mode-container {
      --at-apply: absolute pointer-events-none;
    }

    &::before {
      --at-apply: content-empty bg-ui-primary;
    }

    &::after {
      --at-apply: content-empty bg-ui-primary/60;
    }

    .mode-container {
      --at-apply: bg-ui-primary/20 border-width-1.5 border-dashed border-ui-primary;

      &::before {
        --at-apply: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --at-apply: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      &::after {
        --at-apply: top-2 bottom-2 start-4.5 w-3;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-8 rounded-se-1 rounded-ee-1;
      }
    }

    &-head {
      &::before {
        --at-apply: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      &::after {
        --at-apply: top-4.5 start-2 bottom-2 w-3 rounded-es-1;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-e-2 inset-b-2 inset-s-5.5 rounded-ee-1;
      }
    }

    &-single {
      &::after {
        --at-apply: top-2 start-2 bottom-2 w-3 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-5.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-only-side {
      &::before {
        --at-apply: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-4.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-only-head {
      &::before {
        --at-apply: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-e-2 inset-b-2 inset-s-2 rounded-es-1 rounded-ee-1;
      }
    }

    &-side-panel {
      &::before {
        --at-apply: start-2 top-2 inset-b-2 w-2 rounded-ss-1 rounded-es-1;
      }

      &::after {
        --at-apply: top-4 start-5.5 bottom-4 w-5;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-e-2 inset-b-2 inset-s-4.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-head-panel {
      &::before {
        --at-apply: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      &::after {
        --at-apply: top-5.5 start-5 bottom-3.5 w-6;
      }

      .mode-container {
        --at-apply: inset-t-4.5 inset-e-2 inset-b-2 inset-s-2 rounded-es-1 rounded-ee-1;
      }
    }
  }
}

.app-width-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark-ring-stone-7 cursor-pointer transition of-hidden;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &-adaption {
      &::before {
        --at-apply: content-empty absolute w-full h-full bg-stone-1 dark-bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-1;
      }

      .right {
        --at-apply: right-1;
      }
    }

    &-adaption-min-width {
      &::before {
        --at-apply: content-empty absolute w-1/2 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark-bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-0.5;
      }

      .right {
        --at-apply: right-0.5;
      }
    }

    &-center {
      &::before {
        --at-apply: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark-bg-stone-9;
      }
    }

    &-center-max-width {
      &::before {
        --at-apply: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-stone-1 dark-bg-stone-9;
      }

      .left,
      .right {
        --at-apply: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --at-apply: left-2.5;
      }

      .right {
        --at-apply: right-2.5;
      }
    }
  }
}

.transition-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative flex items-center justify-center w-14 h-10 rounded-2 ring-1 ring-stone-2 dark-ring-stone-7 cursor-pointer;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::after {
      --at-apply: content-empty absolute w-3/5 h-3/5 top-1/5 left-1/5 rounded-2 bg-stone-2 dark-bg-stone-9 transition;
    }

    &.mode-fade {
      &::after {
        animation: transition-mode-fade-after 1.5s infinite;
      }

      @keyframes transition-mode-fade-after {
        0% {
          opacity: 1;
        }

        30%,
        35% {
          opacity: 0;
        }

        65% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-left {
      &::after {
        animation: transition-mode-slide-left 1.5s infinite;
      }

      @keyframes transition-mode-slide-left {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(-30%, 0);
        }

        35% {
          opacity: 0;
          transform: translate(30%, 0);
        }

        65% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-right {
      &::after {
        animation: transition-mode-slide-right 1.5s infinite;
      }

      @keyframes transition-mode-slide-right {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(30%, 0);
        }

        35% {
          opacity: 0;
          transform: translate(-30%, 0);
        }

        100% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-top {
      &::after {
        animation: transition-mode-slide-top 1.5s infinite;
      }

      @keyframes transition-mode-slide-top {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(0, -30%);
        }

        35% {
          opacity: 0;
          transform: translate(0, 30%);
        }

        100% {
          opacity: 1;
        }
      }
    }

    &.mode-slide-bottom {
      &::after {
        animation: transition-mode-slide-bottom 1.5s infinite;
      }

      @keyframes transition-mode-slide-bottom {
        0% {
          opacity: 1;
        }

        30% {
          opacity: 0;
          transform: translate(0, 30%);
        }

        35% {
          opacity: 0;
          transform: translate(0, -30%);
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
}

.setting-item {
  --at-apply: flex items-center justify-between gap-4 px-4 py-2 rounded-2 transition hover-bg-stone-1 dark-hover-bg-stone-9;

  .label {
    --at-apply: flex items-center flex-shrink-0 gap-2 text-sm;

    i {
      --at-apply: text-xl text-orange cursor-help;
    }
  }
}
</style>
