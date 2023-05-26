<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import eventBus from '@/util/eventBus'

defineOptions({
  name: 'AppSetting',
})
const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const isShow = ref(false)

watch(() => settingsStore.settings.menu.menuMode, (value) => {
  if (value === 'single') {
    menuStore.setActived(0)
  }
  else {
    menuStore.setActived(route.fullPath)
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
    ElMessage.success('复制成功，请粘贴到 src/settings.custom.json 文件中！')
  }
})

function handleCopy() {
  copy(JSON.stringify(settingsStore.settings, null, 4))
}
</script>

<template>
  <div>
    <el-drawer v-model="isShow" title="应用配置" direction="rtl" :size="360">
      <el-alert
        title="应用配置可实时预览效果，但只是临时生效，要想真正作用于项目，可以点击下方的“复制配置”按钮，并将配置粘贴到 src/settings.ts 文件中。同时建议在生产环境隐藏应用配置功能。"
        type="error" :closable="false"
      />
      <el-divider>颜色主题风格</el-divider>
      <div class="color-scheme">
        <div
          class="switch" :class="settingsStore.settings.app.colorScheme"
          @click="settingsStore.settings.app.colorScheme = settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark'"
        >
          <el-icon class="icon">
            <svg-icon :name="settingsStore.settings.app.colorScheme === 'light' ? 'i-ri:sun-line' : 'i-ri:moon-line'" />
          </el-icon>
        </div>
      </div>
      <div class="theme">
        <div
          data-theme="default" :class="{ active: settingsStore.settings.app.theme === 'default' }"
          @click="settingsStore.settings.app.theme = 'default'"
        >
          <div class="content" />
        </div>
        <div
          data-theme="sys_green" :class="{ active: settingsStore.settings.app.theme === 'sys_green' }"
          @click="settingsStore.settings.app.theme = 'sys_green'"
        >
          <div class="content" />
        </div>
        <div
          data-theme="sys_orange" :class="{ active: settingsStore.settings.app.theme === 'sys_orange' }"
          @click="settingsStore.settings.app.theme = 'sys_orange'"
        >
          <div class="content" />
        </div>
        <div
          data-theme="sys_pink" :class="{ active: settingsStore.settings.app.theme === 'sys_pink' }"
          @click="settingsStore.settings.app.theme = 'sys_pink'"
        >
          <div class="content" />
        </div>
        <div
          data-theme="sys_grey" :class="{ active: settingsStore.settings.app.theme === 'sys_grey' }"
          @click="settingsStore.settings.app.theme = 'sys_grey'"
        >
          <div class="content" />
        </div>
        <div
          data-theme="sys_yellow" :class="{ active: settingsStore.settings.app.theme === 'sys_yellow' }"
          @click="settingsStore.settings.app.theme = 'sys_yellow'"
        >
          <div class="content" />
        </div>
      </div>
      <el-divider v-if="settingsStore.mode === 'pc'">
        导航栏模式
      </el-divider>
      <div v-if="settingsStore.mode === 'pc'" class="menu-mode">
        <el-tooltip content="侧边栏模式（含主导航）" placement="top" :show-after="500">
          <div
            class="mode mode-side" :class="{ active: settingsStore.settings.menu.menuMode === 'side' }"
            @click="settingsStore.settings.menu.menuMode = 'side'"
          >
            <div class="mode-container" />
            <el-icon>
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="顶部模式" placement="top" :show-after="500">
          <div
            class="mode mode-head" :class="{ active: settingsStore.settings.menu.menuMode === 'head' }"
            @click="settingsStore.settings.menu.menuMode = 'head'"
          >
            <div class="mode-container" />
            <el-icon>
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="侧边栏模式（不含主导航）" placement="top" :show-after="500">
          <div
            class="mode mode-single" :class="{ active: settingsStore.settings.menu.menuMode === 'single' }"
            @click="settingsStore.settings.menu.menuMode = 'single'"
          >
            <div class="mode-container" />
            <el-icon>
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="侧边栏精简模式" placement="top" :show-after="500">
          <div
            class="mode mode-only-side" :class="{ active: settingsStore.settings.menu.menuMode === 'only-side' }"
            @click="settingsStore.settings.menu.menuMode = 'only-side'"
          >
            <div class="mode-container" />
            <el-icon>
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="顶部精简模式" placement="top" :show-after="500">
          <div
            class="mode mode-only-head" :class="{ active: settingsStore.settings.menu.menuMode === 'only-head' }"
            @click="settingsStore.settings.menu.menuMode = 'only-head'"
          >
            <div class="mode-container" />
            <el-icon>
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <el-divider>导航栏填充风格</el-divider>
      <div class="menu-style">
        <el-radio-group v-model="settingsStore.settings.menu.menuFillStyle" size="default">
          <el-tooltip content="默认" placement="top" :show-after="500">
            <el-radio-button label="">
              <el-icon size="18px">
                <svg-icon name="i-jam:stop-sign" />
              </el-icon>
            </el-radio-button>
          </el-tooltip>
          <el-tooltip content="圆角" placement="top" :show-after="500">
            <el-radio-button label="radius">
              <el-icon size="18px">
                <svg-icon name="i-mdi:border-radius" />
              </el-icon>
            </el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </div>
      <el-divider>导航栏激活风格</el-divider>
      <div class="menu-style">
        <el-radio-group
          v-model="settingsStore.settings.menu.menuActiveStyle" size="default"
          :disabled="settingsStore.settings.menu.menuMode === 'single'"
        >
          <el-tooltip content="默认" placement="top" :show-after="500">
            <el-radio-button label="">
              <el-icon size="18px">
                <svg-icon name="i-jam:stop-sign" />
              </el-icon>
            </el-radio-button>
          </el-tooltip>
          <el-tooltip content="箭头" placement="top" :show-after="500">
            <el-radio-button label="arrow">
              <el-icon size="18px">
                <svg-icon
                  name="i-ep:caret-left"
                  :rotate="['head', 'only-head'].includes(settingsStore.settings.menu.menuMode) ? 90 : 0"
                />
              </el-icon>
            </el-radio-button>
          </el-tooltip>
          <el-tooltip content="线条" placement="top" :show-after="500">
            <el-radio-button label="line">
              <el-icon size="18px">
                <svg-icon
                  name="i-ep:semi-select"
                  :rotate="['side', 'only-side'].includes(settingsStore.settings.menu.menuMode) ? 90 : 0"
                />
              </el-icon>
            </el-radio-button>
          </el-tooltip>
          <el-tooltip content="点" placement="top" :show-after="500">
            <el-radio-button label="dot">
              <el-icon size="18px">
                <svg-icon name="i-icon-park-outline:dot" />
              </el-icon>
            </el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </div>
      <el-divider v-if="settingsStore.mode === 'pc'">
        页宽模式
      </el-divider>
      <div v-if="settingsStore.mode === 'pc'" class="app-width-mode">
        <el-tooltip content="自适应" placement="top" :show-after="500">
          <div
            class="mode mode-adaption" :class="{ active: settingsStore.settings.layout.widthMode === 'adaption' }"
            @click="settingsStore.settings.layout.widthMode = 'adaption'"
          >
            <el-icon class="left">
              <svg-icon name="i-ep:back" />
            </el-icon>
            <el-icon class="right">
              <svg-icon name="i-ep:right" />
            </el-icon>
            <el-icon class="active-icon">
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="自适应（有最小宽度）" placement="top" :show-after="500">
          <div
            class="mode mode-adaption-min-width"
            :class="{ active: settingsStore.settings.layout.widthMode === 'adaption-min-width' }"
            @click="settingsStore.settings.layout.widthMode = 'adaption-min-width'"
          >
            <el-icon class="left">
              <svg-icon name="i-ep:back" />
            </el-icon>
            <el-icon class="right">
              <svg-icon name="i-ep:right" />
            </el-icon>
            <el-icon class="active-icon">
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="定宽居中" placement="top" :show-after="500">
          <div
            class="mode mode-center" :class="{ active: settingsStore.settings.layout.widthMode === 'center' }"
            @click="settingsStore.settings.layout.widthMode = 'center'"
          >
            <el-icon class="active-icon">
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="定宽居中（有最大宽度）" placement="top" :show-after="500">
          <div
            class="mode mode-center-max-width"
            :class="{ active: settingsStore.settings.layout.widthMode === 'center-max-width' }"
            @click="settingsStore.settings.layout.widthMode = 'center-max-width'"
          >
            <el-icon class="left">
              <svg-icon name="i-ep:back" />
            </el-icon>
            <el-icon class="right">
              <svg-icon name="i-ep:right" />
            </el-icon>
            <el-icon class="active-icon">
              <svg-icon name="i-ri:checkbox-circle-fill" />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <el-divider v-if="settingsStore.mode === 'pc'">
        页面切换动画
      </el-divider>
      <div class="enable-transition">
        <el-switch v-model="settingsStore.settings.mainPage.enableTransition" />
      </div>
      <div v-if="settingsStore.settings.mainPage.enableTransition" class="transition-mode">
        <el-tooltip content="淡入淡出" placement="top" :show-after="500">
          <div
            class="mode mode-fade" :class="{ active: settingsStore.settings.mainPage.transitionMode === 'fade' }"
            @click="settingsStore.settings.mainPage.transitionMode = 'fade'"
          />
        </el-tooltip>
        <el-tooltip content="向左滑动" placement="top" :show-after="500">
          <div
            class="mode mode-slide-left"
            :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-left' }"
            @click="settingsStore.settings.mainPage.transitionMode = 'slide-left'"
          />
        </el-tooltip>
        <el-tooltip content="向右滑动" placement="top" :show-after="500">
          <div
            class="mode mode-slide-right"
            :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-right' }"
            @click="settingsStore.settings.mainPage.transitionMode = 'slide-right'"
          />
        </el-tooltip>
        <el-tooltip content="向上滑动" placement="top" :show-after="500">
          <div
            class="mode mode-slide-top"
            :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-top' }"
            @click="settingsStore.settings.mainPage.transitionMode = 'slide-top'"
          />
        </el-tooltip>
        <el-tooltip content="向下滑动" placement="top" :show-after="500">
          <div
            class="mode mode-slide-bottom"
            :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-bottom' }"
            @click="settingsStore.settings.mainPage.transitionMode = 'slide-bottom'"
          />
        </el-tooltip>
      </div>
      <el-divider>导航栏</el-divider>
      <div class="setting-item">
        <div class="label">
          主导航切换跳转
          <el-tooltip content="开启该功能后，切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch
          v-model="settingsStore.settings.menu.switchMainMenuAndPageJump"
          :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航自动隐藏
          <el-tooltip content="开启该功能后，切换主导航时，如果次导航里只有一个导航时，则自动隐藏" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>subMenuOnlyOneHide
          </el-tooltip>
        </div>
        <el-switch
          v-model="settingsStore.settings.menu.subMenuOnlyOneHide"
          :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航保持展开一个
          <el-tooltip content="开启该功能后，侧边栏只保持一个子菜单的展开" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch
          v-model="settingsStore.settings.menu.subMenuUniqueOpened"
          :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          次导航是否折叠
        </div>
        <el-switch
          v-model="settingsStore.settings.menu.subMenuCollapse"
          :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
        />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          显示次导航折叠按钮
        </div>
        <el-switch
          v-model="settingsStore.settings.menu.enableSubMenuCollapseButton"
          :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <el-switch
          v-model="settingsStore.settings.menu.enableHotkeys"
          :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
        />
      </div>
      <el-divider>顶栏</el-divider>
      <div class="setting-item">
        <div class="label">
          模式
          <el-tooltip content="包含标签栏和工具栏" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-radio-group v-model="settingsStore.settings.topbar.mode" size="small">
          <el-radio-button label="static">
            静止
          </el-radio-button>
          <el-radio-button label="fixed">
            固定
          </el-radio-button>
          <el-radio-button label="sticky">
            粘性
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="setting-item">
        <div class="label">
          展示切换
        </div>
        <el-switch v-model="settingsStore.settings.topbar.switchTabbarAndToolbar" />
      </div>
      <el-divider>标签栏</el-divider>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <el-switch v-model="settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          风格
        </div>
        <el-radio-group
          v-model="settingsStore.settings.tabbar.style" size="small"
          :disabled="!settingsStore.settings.tabbar.enable"
        >
          <el-radio-button label="fashion">
            时尚
          </el-radio-button>
          <el-radio-button label="card">
            卡片
          </el-radio-button>
          <el-radio-button label="square">
            方块
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="setting-item">
        <div class="label">
          是否显示图标
        </div>
        <el-switch v-model="settingsStore.settings.tabbar.enableIcon" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          标签页合并规则
        </div>
        <el-select
          v-model="settingsStore.settings.tabbar.mergeTabsBy" size="small"
          :disabled="!settingsStore.settings.tabbar.enable"
        >
          <el-option label="不合并" value="" />
          <el-option label="根据 activeMenu 合并" value="activeMenu" />
          <el-option label="根据路由名称合并" value="routeName" />
        </el-select>
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用记忆功能
          <el-tooltip content="开启该功能后，非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch
          v-model="settingsStore.settings.tabbar.enableMemory"
          :disabled="!settingsStore.settings.tabbar.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <el-switch
          v-model="settingsStore.settings.tabbar.enableHotkeys"
          :disabled="!settingsStore.settings.tabbar.enable"
        />
      </div>
      <el-divider>工具栏</el-divider>
      <div class="setting-item">
        <div class="label">
          通知中心
          <el-tooltip content="该功能具体业务功能需自行开发，框架仅提供示例模版" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.toolbar.enableNotification" />
      </div>
      <div class="setting-item">
        <div class="label">
          国际化
        </div>
        <el-switch v-model="settingsStore.settings.toolbar.enableI18n" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          全屏
          <el-tooltip content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.toolbar.enableFullscreen" />
      </div>
      <div class="setting-item">
        <div class="label">
          页面刷新
          <el-tooltip content="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.toolbar.enablePageReload" />
      </div>
      <div class="setting-item">
        <div class="label">
          颜色主题
          <el-tooltip content="开启后可在明亮/暗黑模式中切换" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.toolbar.enableColorScheme" />
      </div>

      <el-divider v-if="settingsStore.mode === 'pc'">
        面包屑导航
      </el-divider>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          是否启用
        </div>
        <el-switch v-model="settingsStore.settings.breadcrumb.enable" />
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          风格
        </div>
        <el-radio-group
          v-model="settingsStore.settings.breadcrumb.style" size="small"
          :disabled="!settingsStore.settings.breadcrumb.enable"
        >
          <el-radio-button label="">
            默认
          </el-radio-button>
          <el-radio-button label="modern">
            现代
          </el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="settingsStore.mode === 'pc'" class="setting-item">
        <div class="label">
          是否显示主导航
        </div>
        <el-switch
          v-model="settingsStore.settings.breadcrumb.enableMainMenu"
          :disabled="['single'].includes(settingsStore.settings.menu.menuMode) || !settingsStore.settings.breadcrumb.enable"
        />
      </div>
      <el-divider>
        页面
      </el-divider>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>

        <el-switch v-model="settingsStore.settings.mainPage.enableHotkeys" />
      </div>
      <el-divider>
        导航搜索
      </el-divider>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>

        <el-switch v-model="settingsStore.settings.navSearch.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
          <el-tooltip content="对导航进行快捷搜索" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>

        <el-switch
          v-model="settingsStore.settings.navSearch.enableHotkeys"
          :disabled="!settingsStore.settings.navSearch.enable"
        />
      </div>
      <el-divider>底部版权</el-divider>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <el-switch v-model="settingsStore.settings.copyright.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          日期
        </div>
        <el-input
          v-model="settingsStore.settings.copyright.dates" size="small"
          :disabled="!settingsStore.settings.copyright.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          公司
        </div>
        <el-input
          v-model="settingsStore.settings.copyright.company" size="small"
          :disabled="!settingsStore.settings.copyright.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          网址
        </div>
        <el-input
          v-model="settingsStore.settings.copyright.website" size="small"
          :disabled="!settingsStore.settings.copyright.enable"
        />
      </div>
      <div class="setting-item">
        <div class="label">
          备案
        </div>
        <el-input
          v-model="settingsStore.settings.copyright.beian" size="small"
          :disabled="!settingsStore.settings.copyright.enable"
        />
      </div>
      <el-divider>主页</el-divider>
      <div class="setting-item">
        <div class="label">
          是否开启
          <el-tooltip content="该功能开启时，登录成功默认进入主页，反之则默认进入导航栏里第一个导航页面" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.home.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          主页名称
          <el-tooltip content="开启国际化时，该设置无效" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-input
          v-model="settingsStore.settings.home.title" size="small"
          :disabled="settingsStore.settings.toolbar.enableI18n"
        />
      </div>
      <el-divider>其它</el-divider>
      <div class="setting-item">
        <div class="label">
          组件尺寸
          <el-tooltip content="全局设置 Element Plus 组件的默认尺寸大小" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-radio-group v-model="settingsStore.settings.app.elementSize" size="small">
          <el-radio-button label="large">
            较大
          </el-radio-button>
          <el-radio-button label="default">
            默认
          </el-radio-button>
          <el-radio-button label="small">
            稍小
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用权限
        </div>
        <el-switch v-model="settingsStore.settings.app.enablePermission" />
      </div>
      <div class="setting-item">
        <div class="label">
          载入进度条
          <el-tooltip content="该功能开启时，跳转路由会看到页面顶部有进度条" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.app.enableProgress" />
      </div>
      <div class="setting-item">
        <div class="label">
          动态标题
          <el-tooltip content="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-switch v-model="settingsStore.settings.app.enableDynamicTitle" />
      </div>
      <div class="setting-item">
        <div class="label">
          Storage 前缀
          <el-tooltip content="localStorage 和 sessionStorage 的字段前缀" placement="top">
            <el-icon>
              <svg-icon name="i-ri:question-line" />
            </el-icon>
          </el-tooltip>
        </div>
        <el-input v-model="settingsStore.settings.app.storagePrefix" size="small" style="width: 100px;" />
      </div>
      <div class="setting-item">
        <div class="label">
          页面水印
        </div>
        <el-switch v-model="settingsStore.settings.app.enableWatermark" />
      </div>
      <template v-if="isSupported" #footer>
        <el-button type="primary" @click="handleCopy">
          <template #icon>
            <el-icon>
              <svg-icon name="i-ep:document-copy" />
            </el-icon>
          </template>
          复制配置
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
  margin-bottom: initial;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
  transition: var(--el-transition-border);
}

:deep(.el-drawer__footer) {
  padding: 20px;
  border-top: 1px solid var(--el-border-color);
  transition: var(--el-transition-border);

  .el-button {
    width: 100%;
  }
}

:deep(.el-divider) {
  margin: 36px 0 24px;
  transition: var(--el-transition-border);

  .el-divider__text {
    transition: background-color 0.3s, var(--el-transition-color);
  }
}

.menu-mode {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;

  .mode {
    position: relative;
    width: 80px;
    height: 55px;
    margin: 10px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--g-app-bg);
    box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-border-color-darker);
    }

    &.active {
      box-shadow: 0 0 0 2px var(--el-color-primary);
    }

    &::before,
    &::after,
    .mode-container {
      pointer-events: none;
      position: absolute;
      border-radius: 3px;
    }

    .mode-container::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--g-theme-color);
      opacity: 0.2;
    }

    &-side {
      &::before {
        content: "";
        top: 5px;
        left: 5px;
        bottom: 5px;
        width: 10px;
        background-color: var(--g-theme-color);
      }

      &::after {
        content: "";
        top: 5px;
        left: 20px;
        bottom: 5px;
        width: 15px;
        background-color: var(--g-theme-color);
        opacity: 0.5;
      }

      .mode-container {
        inset: 5px 5px 5px 40px;
        border: 1px dashed var(--g-theme-color);
      }
    }

    &-head {
      &::before {
        content: "";
        top: 5px;
        left: 5px;
        right: 5px;
        height: 10px;
        background-color: var(--g-theme-color);
      }

      &::after {
        content: "";
        top: 20px;
        left: 5px;
        bottom: 5px;
        width: 15px;
        background-color: var(--g-theme-color);
        opacity: 0.5;
      }

      .mode-container {
        inset: 20px 5px 5px 25px;
        border: 1px dashed var(--g-theme-color);
      }
    }

    &-single {
      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        bottom: 5px;
        width: 15px;
        background-color: var(--g-theme-color);
        opacity: 0.5;
      }

      .mode-container {
        inset: 5px 5px 5px 25px;
        border: 1px dashed var(--g-theme-color);
      }
    }

    &-only-side {
      &::before {
        content: "";
        top: 5px;
        left: 5px;
        bottom: 5px;
        width: 10px;
        background-color: var(--g-theme-color);
      }

      .mode-container {
        inset: 5px 5px 5px 20px;
        border: 1px dashed var(--g-theme-color);
      }
    }

    &-only-head {
      &::before {
        content: "";
        top: 5px;
        left: 5px;
        right: 5px;
        height: 10px;
        background-color: var(--g-theme-color);
      }

      .mode-container {
        inset: 20px 5px 5px;
        border: 1px dashed var(--g-theme-color);
      }
    }

    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: none;
    }

    &.active .el-icon {
      display: block;
      color: var(--el-color-primary);
    }
  }
}

.app-width-mode {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;

  .mode {
    position: relative;
    width: 65px;
    height: 50px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    color: var(--el-text-color-primary);
    background-color: var(--el-fill-color-darker);
    box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
    transition: background-color 0.3s, var(--el-transition-color), var(--el-transition-box-shadow);

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-border-color-darker);
    }

    &.active {
      box-shadow: 0 0 0 2px var(--el-color-primary);
    }

    &-adaption {
      .left,
      .right {
        position: absolute;
        top: 50%;
        margin-top: -8px;
      }

      .left {
        left: 5px;
      }

      .right {
        right: 5px;
      }
    }

    &-adaption-min-width {
      background: var(--el-bg-color);

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        margin-left: -15px;
        height: 100%;
        width: 30px;
        background-color: var(--el-fill-color-darker);
        transition: background-color 0.3s;
      }

      .left,
      .right {
        position: absolute;
        top: 50%;
        margin-top: -8px;
      }

      .left {
        left: 0;
      }

      .right {
        right: 0;
      }
    }

    &-center {
      background: var(--el-bg-color);

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        margin-left: -20px;
        height: 100%;
        width: 40px;
        background-color: var(--el-fill-color-darker);
        transition: background-color 0.3s;
      }
    }

    &-center-max-width {
      background: var(--el-bg-color);

      &::before {
        content: "";
        position: absolute;
        left: 50%;
        margin-left: -20px;
        height: 100%;
        width: 40px;
        background-color: var(--el-fill-color-darker);
        transition: background-color 0.3s;
      }

      .left,
      .right {
        position: absolute;
        top: 50%;
        margin-top: -8px;
      }

      .left {
        left: 13px;
      }

      .right {
        right: 13px;
      }
    }

    .active-icon {
      position: absolute;
      right: 2px;
      bottom: 2px;
      display: none;
    }

    &.active .active-icon {
      display: block;
      color: var(--el-color-primary);
    }
  }
}

.menu-style {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;
}

.enable-transition {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.transition-mode {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;

  .mode {
    position: relative;
    width: 45px;
    height: 30px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--el-bg-color);
    box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
    transition: background-color .3s, var(--el-transition-color), var(--el-transition-box-shadow);

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-border-color-darker)
    }

    &.active {
      box-shadow: 0 0 0 2px var(--el-color-primary)
    }

    &::after {
      content: "";
      position: absolute;
      left: 15%;
      top: 15%;
      height: 70%;
      width: 70%;
      border-radius: 4px;
      background-color: var(--el-fill-color-darker);
      transition: all .3s;
    }

    &.mode-fade {
      &::after {
        animation: transition-mode-fade-after 1.5s infinite;

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

    }

    &.mode-slide-left {
      &::after {
        animation: transition-mode-slide-left 1.5s infinite;

        @keyframes transition-mode-slide-left {
          0% {
            opacity: 1;
          }

          30% {
            opacity: 0;
            transform: translate(-30%);
          }

          35% {
            opacity: 0;
            transform: translate(30%);
          }

          65% {
            opacity: 1;
          }
        }
      }
    }

    &.mode-slide-right {
      &::after {
        animation: transition-mode-slide-right 1.5s infinite;

        @keyframes transition-mode-slide-right {
          0% {
            opacity: 1;
          }

          30% {
            opacity: 0;
            transform: translate(30%);
          }

          35% {
            opacity: 0;
            transform: translate(-30%);
          }

          100% {
            opacity: 1;
          }
        }
      }
    }

    &.mode-slide-top {
      &::after {
        animation: transition-mode-slide-top 1.5s infinite;

        @keyframes transition-mode-slide-top {
          0% {
            opacity: 1;
          }

          30% {
            opacity: 0;
            transform: translateY(-30%);
          }

          35% {
            opacity: 0;
            transform: translateY(30%);
          }

          100% {
            opacity: 1;
          }
        }

      }
    }

    &.mode-slide-bottom {
      &::after {
        animation: transition-mode-slide-bottom 1.5s infinite;

        @keyframes transition-mode-slide-bottom {
          0% {
            opacity: 1;
          }

          30% {
            opacity: 0;
            transform: translateY(30%);
          }

          35% {
            opacity: 0;
            transform: translateY(-30%);
          }

          100% {
            opacity: 1;
          }
        }

      }
    }
  }

}

.color-scheme {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;

  $width: 50px;

  .switch {
    width: $width;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
    background-color: var(--el-fill-color-darker);
    transition: background-color 0.3s;

    &.dark {
      .icon {
        transform: translateX(calc($width - 30px));
      }
    }

    .icon {
      margin: 3px;
      padding: 5px;
      font-size: 24px;
      border-radius: 50%;
      background-color: var(--el-fill-color-lighter);
      transition: transform 0.3s, background-color 0.3s;
    }
  }
}

.theme {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;

  [data-theme] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 50px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-border-color-darker);
    }

    &.active {
      box-shadow: 0 0 0 2px var(--el-color-primary);

      .content {
        transform: rotate(0);
      }
    }

    .content {
      width: 30px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--g-theme-color);
      transform: rotate(-45deg);
      transition: var(--el-transition-md-fade), background-color 0.3s;
    }
  }
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background: var(--el-fill-color);
  }

  .label {
    font-size: 14px;
    color: var(--el-text-color-regular);
    display: flex;
    align-items: center;

    .el-icon {
      margin-left: 4px;
      font-size: 17px;
      color: var(--el-color-warning);
      cursor: help;
    }
  }

  .el-switch {
    height: auto;
  }

  .el-input {
    width: 150px;
  }
}
</style>
