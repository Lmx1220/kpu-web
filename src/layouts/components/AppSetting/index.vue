<script setup lang="ts">
import settingsDefault from '@/settings.default'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import { useKpuDrawer } from '@/ui/components/KpuDrawer/use-drawer.ts'
import { getTwoObjectDiff } from '@/utils'
import eventBus from '@/utils/eventBus'
import { useClipboard } from '@vueuse/core'
import Sortable from 'sortablejs'
import { toast } from 'vue-sonner'
import themes from '../../../../themes'

defineOptions({
  name: 'AppSetting',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const themeList = computed(() => {
  return Object.keys(themes).map((key) => {
    return {
      label: key,
      value: (themes as any)[key][settingsStore.currentColorScheme || 'light'],
    }
  })
})

watch(() => settingsStore.settings.menu.mode, (value) => {
  if (value === 'single') {
    menuStore.setActived(0)
  }
  else {
    menuStore.setActived(route.fullPath)
  }
})

const toolbarLayoutRef = ref()
watch(() => toolbarLayoutRef.value, (val) => {
  if (val) {
    // eslint-disable-next-line no-new
    new Sortable(toolbarLayoutRef.value, {
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
const [KpuDrawer, drawerApi] = useKpuDrawer({
  // zIndex: 2000,
})
onMounted(() => {
  eventBus.on('global-app-setting-toggle', () => {
    drawerApi.open()
  })
})

const { copy, copied, isSupported } = useClipboard()

watch(copied, (val) => {
  if (val) {
    toast.success('复制成功，请粘贴到 src/settings.ts 文件中！', {
      position: 'top-center',
    })
  }
})

function handleCopy() {
  copy(JSON.stringify(getTwoObjectDiff(settingsDefault, settingsStore.settings), null, 2))
}
</script>

<template>
  <KpuDrawer title="应用配置" :closable="false" description="在生产环境中应关闭该模块" :footer="isSupported">
    <div class="rounded-2 bg-rose/20 px-4 py-2 text-sm/6 c-rose">
      <p class="my-1">
        应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到 src/settings.ts 文件中。
      </p>
      <p class="my-1">
        注意：在生产环境中应关闭该模块。
      </p>
    </div>
    <div>
      <KpuDivider>颜色主题风格</KpuDivider>
      <div class="flex items-center justify-center pb-4">
        <KpuTabs
          v-model="settingsStore.settings.app.colorScheme"
          :list="[
            { icon: 'i-ri:sun-line', label: '明亮', value: 'light' },
            { icon: 'i-ri:moon-line', label: '暗黑', value: 'dark' },
            { icon: 'i-codicon:color-mode', label: '系统', value: '' },
          ]"
          class="w-60"
        />
      </div>
      <div class="themes">
        <div v-for="item in themeList" :key="item.label" class="theme" :class="{ active: settingsStore.currentColorScheme === 'dark' ? settingsStore.settings.app.darkTheme === item.label : settingsStore.settings.app.lightTheme === item.label }" @click="settingsStore.currentColorScheme === 'dark' ? settingsStore.settings.app.darkTheme = item.label : settingsStore.settings.app.lightTheme = item.label">
          <div class="content" :style="`background-color: hsl(${item.value['--primary']});`" />
        </div>
      </div>
      <div class="setting-item">
        <div class="label">
          圆角系数
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { label: 0, value: 0 },
              { label: 0.25, value: 0.25 },
              { label: 0.5, value: 0.5 },
              { label: 0.75, value: 0.75 },
              { label: 1, value: 1 },
            ]" :key="index" :variant="settingsStore.settings.app.radius === item.value ? 'default' : 'outline'" size="sm" class="w-12" @click="settingsStore.settings.app.radius = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'">
      <KpuDivider>导航栏模式</KpuDivider>
      <div class="menu-mode">
        <KpuTooltip text="侧边栏模式 (含主导航)" :delay="500">
          <div class="mode mode-side" :class="{ active: settingsStore.settings.menu.mode === 'side' }" @click="settingsStore.settings.menu.mode = 'side'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="顶部模式" :delay="500">
          <div class="mode mode-head" :class="{ active: settingsStore.settings.menu.mode === 'head' }" @click="settingsStore.settings.menu.mode = 'head'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="侧边栏模式 (不含主导航)" :delay="500">
          <div class="mode mode-single" :class="{ active: settingsStore.settings.menu.mode === 'single' }" @click="settingsStore.settings.menu.mode = 'single'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
      </div>
      <div class="menu-mode">
        <KpuTooltip text="侧边栏精简模式" :delay="500">
          <div class="mode mode-only-side" :class="{ active: settingsStore.settings.menu.mode === 'only-side' }" @click="settingsStore.settings.menu.mode = 'only-side'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="顶部精简模式" :delay="500">
          <div class="mode mode-only-head" :class="{ active: settingsStore.settings.menu.mode === 'only-head' }" @click="settingsStore.settings.menu.mode = 'only-head'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="侧边栏面板模式" :delay="500">
          <div class="mode mode-side-panel" :class="{ active: settingsStore.settings.menu.mode === 'side-panel' }" @click="settingsStore.settings.menu.mode = 'side-panel'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="顶部面板模式" :delay="500">
          <div class="mode mode-head-panel" :class="{ active: settingsStore.settings.menu.mode === 'head-panel' }" @click="settingsStore.settings.menu.mode = 'head-panel'">
            <div class="mode-container" />
          </div>
        </KpuTooltip>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'">
      <KpuDivider>页宽模式</KpuDivider>
      <div class="app-width-mode">
        <KpuTooltip text="自适应" :delay="500">
          <div class="mode mode-adaption" :class="{ active: settingsStore.settings.layout.widthMode === 'adaption' }" @click="settingsStore.settings.layout.widthMode = 'adaption'">
            <KpuIcon name="i-ep:back" class="left" />
            <KpuIcon name="i-ep:right" class="right" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="自适应 (有最小宽度)" :delay="500">
          <div class="mode mode-adaption-min-width" :class="{ active: settingsStore.settings.layout.widthMode === 'adaption-min-width' }" @click="settingsStore.settings.layout.widthMode = 'adaption-min-width'">
            <KpuIcon name="i-ep:back" class="left" />
            <KpuIcon name="i-ep:right" class="right" />
          </div>
        </KpuTooltip>
        <KpuTooltip text="定宽居中" :delay="500">
          <div class="mode mode-center" :class="{ active: settingsStore.settings.layout.widthMode === 'center' }" @click="settingsStore.settings.layout.widthMode = 'center'" />
        </KpuTooltip>
        <KpuTooltip text="定宽居中 (有最大宽度)" :delay="500">
          <div class="mode mode-center-max-width" :class="{ active: settingsStore.settings.layout.widthMode === 'center-max-width' }" @click="settingsStore.settings.layout.widthMode = 'center-max-width'">
            <KpuIcon name="i-ep:back" class="left" />
            <KpuIcon name="i-ep:right" class="right" />
          </div>
        </KpuTooltip>
      </div>
    </div>
    <div>
      <KpuDivider>页面切换动画</KpuDivider>
      <div class="flex items-center justify-center pb-4">
        <KpuSwitch v-model="settingsStore.settings.mainPage.enableTransition" />
      </div>
      <div v-if="settingsStore.settings.mainPage.enableTransition" class="transition-mode">
        <KpuTooltip text="淡入淡出" :delay="500">
          <div class="mode mode-fade" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'fade' }" @click="settingsStore.settings.mainPage.transitionMode = 'fade'" />
        </KpuTooltip>
        <KpuTooltip text="向左滑动" :delay="500">
          <div class="mode mode-slide-left" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-left' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-left'" />
        </KpuTooltip>
        <KpuTooltip text="向右滑动" :delay="500">
          <div class="mode mode-slide-right" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-right' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-right'" />
        </KpuTooltip>
        <KpuTooltip text="向上滑动" :delay="500">
          <div class="mode mode-slide-top" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-top' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-top'" />
        </KpuTooltip>
        <KpuTooltip text="向下滑动" :delay="500">
          <div class="mode mode-slide-bottom" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-bottom' }" @click="settingsStore.settings.mainPage.transitionMode = 'slide-bottom'" />
        </KpuTooltip>
      </div>
    </div>
    <div>
      <KpuDivider>导航栏</KpuDivider>
      <div class="setting-item">
        <div class="label">
          主导航点击模式
          <KpuTooltip text="智能选择会判断次导航是否只有且只有一个可访问的菜单进行切换或跳转操作">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [{
              label: '切换',
              value: 'switch',
            }, {
              label: '跳转',
              value: 'jump',
            }, {
              label: '智能选择',
              value: 'smart',
            }]" :key="index" :variant="settingsStore.settings.menu.mainMenuClickMode === item.value ? 'default' : 'outline'" size="sm" :disabled="['single', 'side', 'head'].includes(settingsStore.settings.menu.mode)" @click="settingsStore.settings.menu.mainMenuClickMode = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
      <!--      <div class="setting-item"> -->
      <!--        <div class="label"> -->
      <!--          次导航自动隐藏 -->
      <!--          <KpuTooltip text="切换主导航时，如果次导航里只有一个导航时，则自动隐藏"> -->
      <!--            <KpuIcon name="i-ri:question-line" /> -->
      <!--          </KpuTooltip> -->
      <!--        </div> -->
      <!--        <KpuSwitch v-model="settingsStore.settings.menu.subMenuOnlyOneHide" :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" /> -->
      <!--      </div> -->
      <div class="setting-item">
        <div class="label">
          次导航保持展开一个
          <KpuTooltip text="次导航只保持单个菜单的展开">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.menu.subMenuUniqueOpened" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航是否收起
        </div>
        <KpuSwitch v-model="settingsStore.settings.menu.subMenuCollapse" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航是否自动收起
          <KpuTooltip text="次导航收起时，鼠标悬停会临时展开">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.menu.subMenuAutoCollapse" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          显示次导航展开/收起按钮
        </div>
        <KpuSwitch v-model="settingsStore.settings.menu.enableSubMenuCollapseButton" :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
      <div class="setting-item">
        <div class="label">
          风格
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { icon: 'i-jam:stop-sign', value: '' },
              { icon: ['head', 'only-head'].includes(settingsStore.settings.menu.mode) ? 'i-ep:caret-top' : 'i-ep:caret-left', value: 'arrow' },
              { icon: ['side', 'only-side'].includes(settingsStore.settings.menu.mode) ? 'i-tabler:minus-vertical' : 'i-tabler:minus', value: 'line' },
              { icon: 'i-icon-park-outline:dot', value: 'dot' },
            ]" :key="index" :variant="settingsStore.settings.menu.style === item.value ? 'default' : 'outline'"
            size="icon" class="h-7 w-7"
            :disabled="settingsStore.settings.menu.mode === 'single'" @click="settingsStore.settings.menu.style = (item.value as any)"
          >
            <KpuIcon :name="item.icon" />
          </KpuButton>
        </div>
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <KpuSwitch v-model="settingsStore.settings.menu.enableHotkeys" :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.mode)" />
      </div>
    </div>
    <div>
      <KpuDivider>顶栏</KpuDivider>
      <div class="setting-item">
        <div class="label">
          模式
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { label: '静止', value: 'static' },
              { label: '固定', value: 'fixed' },
              { label: '粘性', value: 'sticky' },
            ]" :key="index" :variant="settingsStore.settings.topbar.mode === item.value ? 'default' : 'outline'" size="sm" @click="settingsStore.settings.topbar.mode = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
      <div class="setting-item">
        <div class="label">
          展示切换
          <KpuTooltip text="切换标签栏和工具栏的展示顺序">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.topbar.switchTabbarAndToolbar" />
      </div>
    </div>
    <div>
      <KpuDivider>标签栏</KpuDivider>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <KpuSwitch v-model="settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          风格
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { label: '默认', value: '' },
              { label: '时尚', value: 'fashion' },
              { label: '卡片', value: 'card' },
              { label: '方块', value: 'square' },
            ]" :key="index" :variant="settingsStore.settings.tabbar.style === item.value ? 'default' : 'outline'" size="sm" :disabled="!settingsStore.settings.tabbar.enable" @click="settingsStore.settings.tabbar.style = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
      <div class="setting-item">
        <div class="label">
          是否显示图标
        </div>
        <KpuSwitch v-model="settingsStore.settings.tabbar.enableIcon" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          标签页双击执行动作
        </div>
        <KpuSelect
          v-model="settingsStore.settings.tabbar.dblclickAction" :options="[{
            label: '刷新',
            value: 'reload',
          }, {
            label: '关闭',
            value: 'close',
          }, {
            label: '固定/取消固定',
            value: 'pin',
          }, {
            label: '最大化',
            value: 'maximize',
          }, {
            label: '新窗口打开',
            value: 'window',
          }]"
          :disabled="!settingsStore.settings.tabbar.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          标签页合并规则
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { label: '不合并', value: '' },
              { label: '激活导航', value: 'activeMenu' },
              { label: '路由名称', value: 'routeName' },
            ]" :key="index" :variant="settingsStore.settings.tabbar.mergeTabsBy === item.value ? 'default' : 'outline'" size="sm" :disabled="!settingsStore.settings.tabbar.enable" @click="settingsStore.settings.tabbar.mergeTabsBy = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用记忆功能
          <KpuTooltip text="非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.tabbar.enableMemory" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <KpuSwitch v-model="settingsStore.settings.tabbar.enableHotkeys" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
    </div>
    <div>
      <KpuDivider>工具栏</KpuDivider>
      <div class="setting-item">
        <div class="label">
          收藏夹
          <KpuTooltip text="可将常用导航添加进收藏夹，方便快读访问">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.favorites" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          面包屑导航
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.breadcrumb" />
      </div>
      <div class="setting-item">
        <div class="label">
          导航搜索
          <KpuTooltip text="对导航进行快捷搜索">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.navSearch" />
      </div>
      <div class="setting-item">
        <div class="label">
          通知中心
          <KpuTooltip text="该功能具体业务功能需自行开发，框架仅提供示例模版">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.notification" />
      </div>
      <div class="setting-item">
        <div class="label">
          锁屏
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.lock" />
      </div>
      <div class="setting-item">
        <div class="label">
          国际化
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.i18n" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          全屏
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.fullscreen" />
      </div>
      <div class="setting-item">
        <div class="label">
          页面刷新
          <KpuTooltip text="使用框架内提供的刷新功能进行页面刷新">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.pageReload" />
      </div>
      <div class="setting-item">
        <div class="label">
          颜色主题
          <KpuTooltip text="可切换明亮/暗黑模式">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.toolbar.colorScheme" />
      </div>
      <div ref="toolbarLayoutRef" class="mx-4 my-2 flex items-center rounded-2 px-2 py-1 ring-1 ring-border">
        <span
          v-for="tool in settingsStore.settings.toolbar.layout" :key="tool" class="draggable flex-center p-1" :class="{
            'flex-1 text-stone-3 dark-text-stone-7 no-drag': tool === '->',
            'cursor-ew-resize': tool !== '->' && settingsStore.settings.toolbar[tool],
            'pointer-events-none w-0 op-0 p-0! no-drag': tool !== '->' && !settingsStore.settings.toolbar[tool],
          }"
        >
          <KpuIcon v-if="tool === 'favorites'" name="i-uiw:star-off" />
          <KpuIcon v-if="tool === 'breadcrumb'" name="i-ic:twotone-double-arrow" :rotate="settingsStore.settings.app.direction === 'rtl' ? 180 : 0" />
          <KpuIcon v-if="tool === 'navSearch'" name="i-ri:search-line" />
          <KpuIcon v-if="tool === 'notification'" name="i-ri:notification-3-line" />
          <KpuIcon v-if="tool === 'lock'" name="i-ri:lock-line" />
          <KpuIcon v-if="tool === 'i18n'" name="i-ri:translate" />
          <KpuIcon v-if="tool === 'fullscreen'" name="i-ri:fullscreen-line" />
          <KpuIcon v-if="tool === 'pageReload'" name="i-iconoir:refresh-double" />
          <KpuIcon v-if="tool === 'colorScheme'" name="i-ri:sun-line" />
          <span v-if="tool === '->'" class="pointer-events-none text-sm">布局调整</span>
        </span>
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'">
      <KpuDivider>面包屑导航</KpuDivider>
      <div class="setting-item">
        <div class="label">
          风格
        </div>

        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { label: '默认', value: '' },
              { label: '现代', value: 'modern' },
            ]" :key="index" :variant="settingsStore.settings.breadcrumb.style === item.value ? 'default' : 'outline'" size="sm" :disabled="!settingsStore.settings.toolbar.breadcrumb" @click="settingsStore.settings.breadcrumb.style = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
      <div class="setting-item">
        <div class="label">
          是否显示主导航
        </div>
        <KpuSwitch v-model="settingsStore.settings.breadcrumb.enableMainMenu" :disabled="!settingsStore.settings.toolbar.breadcrumb || ['single'].includes(settingsStore.settings.menu.mode)" />
      </div>
    </div>
    <div>
      <KpuDivider>页面</KpuDivider>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <KpuSwitch v-model="settingsStore.settings.mainPage.enableHotkeys" />
      </div>
    </div>
    <div>
      <KpuDivider>导航搜索</KpuDivider>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <KpuSwitch v-model="settingsStore.settings.navSearch.enableHotkeys" :disabled="!settingsStore.settings.toolbar.navSearch" />
      </div>
    </div>
    <div>
      <KpuDivider>底部版权</KpuDivider>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <KpuSwitch v-model="settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          日期
        </div>
        <KpuInput v-model="settingsStore.settings.copyright.dates" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          公司
        </div>
        <KpuInput v-model="settingsStore.settings.copyright.company" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          网址
        </div>
        <KpuInput v-model="settingsStore.settings.copyright.website" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          备案
        </div>
        <KpuInput v-model="settingsStore.settings.copyright.beian" :disabled="!settingsStore.settings.copyright.enable" />
      </div>
    </div>
    <div>
      <KpuDivider>主页</KpuDivider>
      <div class="setting-item">
        <div class="label">
          是否启用
          <KpuTooltip text="该功能开启时，登录成功默认进入主页，反之则默认进入导航栏里第一个导航页面">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.home.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          主页名称
          <KpuTooltip text="开启国际化时，该设置无效">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuInput v-model="settingsStore.settings.home.title" :disabled="settingsStore.settings.toolbar.i18n" />
      </div>
    </div>
    <div>
      <KpuDivider>其它</KpuDivider>
      <div class="setting-item">
        <div class="label">
          是否启用权限
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enablePermission" />
      </div>
      <div class="setting-item">
        <div class="label">
          载入进度条
          <KpuTooltip text="该功能开启时，跳转路由会看到页面顶部有进度条">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enableProgress" />
      </div>
      <div class="setting-item">
        <div class="label">
          哀悼模式
          <KpuTooltip text="该功能开启时，整站会变为灰色">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enableMournMode" />
      </div>
      <div class="setting-item">
        <div class="label">
          色弱模式
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enableColorAmblyopiaMode" />
      </div>
      <div class="setting-item">
        <div class="label">
          动态标题
          <KpuTooltip text="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enableDynamicTitle" />
      </div>
      <div class="setting-item">
        <div class="label">
          检测更新
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enableCheckUpdates" />
      </div>
      <div class="setting-item">
        <div class="label">
          Storage 前缀
          <KpuTooltip text="localStorage 和 sessionStorage 的字段前缀">
            <KpuIcon name="i-ri:question-line" />
          </KpuTooltip>
        </div>
        <KpuInput v-model="settingsStore.settings.app.storagePrefix" />
      </div>
      <div class="setting-item">
        <div class="label">
          页面水印
        </div>
        <KpuSwitch v-model="settingsStore.settings.app.enableWatermark" />
      </div>
      <div class="setting-item">
        <div class="label">
          文本方向
        </div>
        <div class="flex-center-start gap-1">
          <KpuButton
            v-for="(item, index) in [
              { label: 'LTR', value: 'ltr' },
              { label: 'RTL', value: 'rtl' },
            ]" :key="index" :variant="settingsStore.settings.app.direction === item.value ? 'default' : 'outline'" size="sm" @click="settingsStore.settings.app.direction = (item.value as any)"
          >
            {{ item.label }}
          </KpuButton>
        </div>
      </div>
    </div>
    <template #footer>
      <KpuButton class="w-full" @click="handleCopy">
        <KpuIcon name="i-ep:document-copy" />
        复制配置
      </KpuButton>
    </template>
  </KpuDrawer>
</template>

<style scoped>
.themes {
  --uno: grid grid-cols-4 gap-4 pb-4 ps-8 pe-8;

  .theme {
    --uno: w-full h-12 cursor-pointer flex place-self-center items-center justify-center  rounded-2 ring-1 ring-border  transition;

    &.active {
      --uno: ring-2 ring-primary;

      .content {
        --uno: rotate-0;
      }
    }

    .content {
      --uno: w-6 h-4 rounded-1/2 -rotate-45 transition;
    }
  }
}

.menu-mode {
  --uno: flex items-center justify-center gap-4 pb-4;

  .mode {
    --uno: relative w-16 h-12 rounded-2 ring-1 ring-border cursor-pointer transition;

    &.active {
      --uno: ring-primary ring-2;
    }

    &::before,
    &::after,
    .mode-container {
      --uno: absolute pointer-events-none;
    }

    &::before {
      --uno: content-empty bg-primary;
    }

    &::after {
      --uno: content-empty bg-primary/60;
    }

    .mode-container {
      --uno: bg-primary/20 border-width-1.5 border-dashed border-primary;

      &::before {
        --uno: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --uno: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      &::after {
        --uno: top-2 bottom-2 start-4.5 w-3;
      }

      .mode-container {
        --uno: inset-t-2 inset-e-2 inset-b-2 inset-s-8 rounded-se-1 rounded-ee-1;
      }
    }

    &-head {
      &::before {
        --uno: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      &::after {
        --uno: top-4.5 start-2 bottom-2 w-3 rounded-es-1;
      }

      .mode-container {
        --uno: inset-t-4.5 inset-e-2 inset-b-2 inset-s-5.5 rounded-ee-1;
      }
    }

    &-single {
      &::after {
        --uno: top-2 start-2 bottom-2 w-3 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --uno: inset-t-2 inset-e-2 inset-b-2 inset-s-5.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-only-side {
      &::before {
        --uno: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --uno: inset-t-2 inset-e-2 inset-b-2 inset-s-4.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-only-head {
      &::before {
        --uno: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      .mode-container {
        --uno: inset-t-4.5 inset-e-2 inset-b-2 inset-s-2 rounded-es-1 rounded-ee-1;
      }
    }

    &-side-panel {
      &::before {
        --uno: start-2 top-2 inset-b-2 w-2 rounded-ss-1 rounded-es-1;
      }

      &::after {
        --uno: top-4 start-5.5 bottom-4 w-5;
      }

      .mode-container {
        --uno: inset-t-2 inset-e-2 inset-b-2 inset-s-4.5 rounded-se-1 rounded-ee-1;
      }
    }

    &-head-panel {
      &::before {
        --uno: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      &::after {
        --uno: top-5.5 start-5 bottom-3.5 w-6;
      }

      .mode-container {
        --uno: inset-t-4.5 inset-e-2 inset-b-2 inset-s-2 rounded-es-1 rounded-ee-1;
      }
    }
  }
}

.app-width-mode {
  --uno: flex items-center justify-center gap-4 pb-4;

  .mode {
    --uno: relative w-16 h-12 rounded-2 ring-1 ring-border cursor-pointer transition of-hidden;

    &.active {
      --uno: ring-primary ring-2;
    }

    &-adaption {
      &::before {
        --uno: content-empty absolute w-full h-full bg-primary/20;
      }

      .left,
      .right {
        --uno: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --uno: left-1;
      }

      .right {
        --uno: right-1;
      }
    }

    &-adaption-min-width {
      &::before {
        --uno: content-empty absolute w-1/2 h-full left-1/2 -translate-x-1/2 bg-primary/20;
      }

      .left,
      .right {
        --uno: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --uno: left-0.5;
      }

      .right {
        --uno: right-0.5;
      }
    }

    &-center {
      &::before {
        --uno: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-primary/20;
      }
    }

    &-center-max-width {
      &::before {
        --uno: content-empty absolute w-3/5 h-full left-1/2 -translate-x-1/2 bg-primary/20;
      }

      .left,
      .right {
        --uno: absolute top-1/2 -translate-y-1/2;
      }

      .left {
        --uno: left-2.5;
      }

      .right {
        --uno: right-2.5;
      }
    }
  }
}

.transition-mode {
  --uno: flex items-center justify-center gap-4 pb-4;

  .mode {
    --uno: relative flex items-center justify-center w-14 h-10 rounded-2 ring-1 ring-border cursor-pointer;

    &.active {
      --uno: ring-primary ring-2;
    }

    &::after {
      --uno: content-empty absolute w-3/5 h-3/5 top-1/5 left-1/5 rounded-2 bg-primary/20 transition;
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
  --uno: flex items-center justify-between gap-4 px-4 py-2 rounded-lg transition hover-bg-secondary;

  .label {
    --uno: flex items-center flex-shrink-0 gap-2 text-sm;

    i {
      --uno: text-xl text-orange cursor-help;
    }
  }
}
</style>
