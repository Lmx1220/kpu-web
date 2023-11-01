<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import themes from '../../../../themes'
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
const isDark = computed({
  get() {
    return settingsStore.settings.app.colorScheme === 'dark'
  },
  set(p) {
    settingsStore.settings.app.colorScheme = p ? 'dark' : 'light'
  },
})
const themeOption = computed(() => Object.keys(themes).map(key => ({ label: key, value: themes[key] })).filter(item => item.value['color-scheme'] === settingsStore.settings.app.colorScheme))

const {
  copy,
  copied,
  isSupported,
} = useClipboard()

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
  <HSlideover v-model="isShow" title="应用配置">
    <div class="px-4 py-2 rounded-2 text-sm/6 c-rose bg-rose/20 ">
      <p class="my-1">
        应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到
        src/settings.ts 文件中。
      </p>
      <p class="my-1">
        注意：在生产环境中应关闭该模块。
      </p>
    </div>
    <div class="divider">
      颜色主题风格
    </div>
    <div class="flex justify-center items-center pb-4">
      <HToggle v-model="isDark" off-icon="ri:moon-line" on-icon="ri:sun-line" />
    </div>
    <div class="themes">
      <div
        v-for="(item) in themeOption" :key="item.label"
        :class="{ active: isDark ? settingsStore.settings.app.darkTheme === item.label : settingsStore.settings.app.lightTheme === item.label }"
        :data-theme="item.label"
        class="theme"
        @click="isDark ? settingsStore.settings.app.darkTheme = item.label as any : settingsStore.settings.app.lightTheme = item.label as any "
      >
        <div :style="{ backgroundColor: `rgb(${item.value['--ui-primary']})` }" class="content" />
      </div>
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="divider">
      导航栏模式
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="menu-mode">
      <HTooltip :delay="500" placement="bottom" text="侧边栏模式 (含主导航)">
        <div
          :class="{ active: settingsStore.settings.menu.menuMode === 'side' }" class="mode mode-side"
          @click="settingsStore.settings.menu.menuMode = 'side'"
        >
          <div class="mode-container" />
        </div>
      </HTooltip>
      <HTooltip :delay="500" placement="bottom" text="顶部模式">
        <div
          :class="{ active: settingsStore.settings.menu.menuMode === 'head' }" class="mode mode-head"
          @click="settingsStore.settings.menu.menuMode = 'head'"
        >
          <div class="mode-container" />
        </div>
      </HTooltip>
      <HTooltip :delay="500" placement="bottom" text="侧边栏模式 (不含主导航)">
        <div
          :class="{ active: settingsStore.settings.menu.menuMode === 'single' }" class="mode mode-single"
          @click="settingsStore.settings.menu.menuMode = 'single'"
        >
          <div class="mode-container" />
        </div>
      </HTooltip>
      <HTooltip :delay="500" placement="bottom" text="侧边栏模式 (不含主导航)">
        <div
          :class="{ active: settingsStore.settings.menu.menuMode === 'only-side' }" class="mode mode-only-side"
          @click="settingsStore.settings.menu.menuMode = 'only-side'"
        >
          <div class="mode-container" />
        </div>
      </HTooltip>
      <HTooltip :delay="500" placement="bottom" text="侧边栏模式 (不含主导航)">
        <div
          :class="{ active: settingsStore.settings.menu.menuMode === 'only-head' }" class="mode mode-only-head"
          @click="settingsStore.settings.menu.menuMode = 'only-head'"
        >
          <div class="mode-container" />
        </div>
      </HTooltip>
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="divider">
      页宽模式
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="app-width-mode">
      <HTooltip :delay="500" placement="bottom" text="自适应">
        <div
          :class="{ active: settingsStore.settings.layout.widthMode === 'adaption' }" class="mode mode-adaption"
          @click="settingsStore.settings.layout.widthMode = 'adaption'"
        >
          <SvgIcon class="left" name="i-ep:back" />
          <SvgIcon class="right" name="i-ep:right" />
        </div>
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="自适应（有最小宽度）">
        <div
          :class="{ active: settingsStore.settings.layout.widthMode === 'adaption-min-width' }"
          class="mode mode-adaption-min-width"
          @click="settingsStore.settings.layout.widthMode = 'adaption-min-width'"
        >
          <SvgIcon class="left" name="i-ep:back" />
          <SvgIcon class="right" name="i-ep:right" />
        </div>
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="定宽居中">
        <div
          :class="{ active: settingsStore.settings.layout.widthMode === 'center' }" class="mode mode-center"
          @click="settingsStore.settings.layout.widthMode = 'center'"
        />
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="定宽居中（有最大宽度）">
        <div
          :class="{ active: settingsStore.settings.layout.widthMode === 'center-max-width' }"
          class="mode mode-center-max-width"
          @click="settingsStore.settings.layout.widthMode = 'center-max-width'"
        >
          <SvgIcon class="left" name="i-ep:back" />
          <SvgIcon class="right" name="i-ep:right" />
        </div>
      </HTooltip>
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="divider">
      页面切换动画
    </div>
    <div class="flex justify-center items-center pb-4">
      <HToggle v-model="settingsStore.settings.mainPage.enableTransition" />
    </div>
    <div v-if="settingsStore.settings.mainPage.enableTransition" class="transition-mode">
      <HTooltip :delay="500" placement="top" text="淡入淡出">
        <div
          :class="{ active: settingsStore.settings.mainPage.transitionMode === 'fade' }" class="mode mode-fade"
          @click="settingsStore.settings.mainPage.transitionMode = 'fade'"
        />
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="向左滑动">
        <div
          :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-left' }"
          class="mode mode-slide-left"
          @click="settingsStore.settings.mainPage.transitionMode = 'slide-left'"
        />
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="向右滑动">
        <div
          :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-right' }"
          class="mode mode-slide-right"
          @click="settingsStore.settings.mainPage.transitionMode = 'slide-right'"
        />
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="向上滑动">
        <div
          :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-top' }"
          class="mode mode-slide-top"
          @click="settingsStore.settings.mainPage.transitionMode = 'slide-top'"
        />
      </HTooltip>
      <HTooltip :delay="500" placement="top" text="向下滑动">
        <div
          :class="{ active: settingsStore.settings.mainPage.transitionMode === 'slide-bottom' }"
          class="mode mode-slide-bottom"
          @click="settingsStore.settings.mainPage.transitionMode = 'slide-bottom'"
        />
      </HTooltip>
    </div>
    <div class="divider">
      导航栏
    </div>
    <div class="setting-item">
      <div class="label">
        主导航切换跳转
        <HTooltip placement="top" text="开启该功能后，切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.switchMainMenuAndPageJump"
        :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航自动隐藏
        <HTooltip placement="top" text="开启该功能后，切换主导航时，如果次导航里只有一个导航时，则自动隐藏">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.subMenuOnlyOneHide"
        :disabled="['single', 'only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航保持展开一个
        <HTooltip placement="top" text="开启该功能后，侧边栏只保持一个子菜单的展开">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.subMenuUniqueOpened"
        :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航是否折叠
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.subMenuCollapse"
        :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        显示次导航折叠按钮
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.enableSubMenuCollapseButton"
        :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        是否圆角
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.isRounded"
        :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        激活风格
      </div>
      <HCheckList
        v-model="settingsStore.settings.menu.menuActiveStyle"
        :disabled="settingsStore.settings.menu.menuMode === 'single'"
        :options="[
          { icon: 'jam:stop-sign', value: '' },
          { icon: ['head', 'only-head'].includes(settingsStore.settings.menu.menuMode) ? 'ep:caret-top' : 'ep:caret-left', value: 'arrow' },
          { icon: ['side', 'only-side'].includes(settingsStore.settings.menu.menuMode) ? 'tabler:minus-vertical' : 'tabler:minus', value: 'line' },
          { icon: 'icon-park-outline:dot', value: 'dot' },
        ]"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle
        v-model="settingsStore.settings.menu.enableHotkeys"
        :disabled="['only-side', 'only-head'].includes(settingsStore.settings.menu.menuMode)"
      />
    </div>
    <div class="divider">
      顶栏
    </div>
    <div class="setting-item">
      <div class="label">
        模式
        <HTooltip placement="top" text="包含标签栏和工具栏">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
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
        <HTooltip placement="top" text="切换标签栏和工具栏的展示顺序">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.topbar.switchTabbarAndToolbar" />
    </div>
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
        v-model="settingsStore.settings.tabbar.style"
        :disabled="!settingsStore.settings.tabbar.enable"
        :options="[
          { label: '时尚', value: 'fashion' },
          { label: '卡片', value: 'card' },
          { label: '方块', value: 'square' },
        ]"
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
        v-model="settingsStore.settings.tabbar.mergeTabsBy"
        :disabled="!settingsStore.settings.tabbar.enable"
        :options="[
          { label: '不合并', value: '' },
          { label: '根据 activeMenu 合并', value: 'activeMenu' },
          { label: '根据路由名称合并', value: 'routeName' },
        ]"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用记忆功能
        <HTooltip
          placement="top"
          text="开启该功能后，非固定和非常驻的标签页将在本次会话窗口中始终存在，刷新浏览器或重新登录时不会丢失"
        >
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle
        v-model="settingsStore.settings.tabbar.enableMemory"
        :disabled="!settingsStore.settings.tabbar.enable"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle
        v-model="settingsStore.settings.tabbar.enableHotkeys"
        :disabled="!settingsStore.settings.tabbar.enable"
      />
    </div>
    <ElDivider>工具栏</ElDivider>
    <div class="setting-item">
      <div class="label">
        通知中心
        <HTooltip placement="top" text="该功能具体业务功能需自行开发，框架仅提供示例模版">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.enableNotification" />
    </div>
    <div class="setting-item">
      <div class="label">
        国际化
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.enableI18n" />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        全屏
        <HTooltip
          placement="top"
          text="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果"
        >
          <HToggle name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.enableFullscreen" />
    </div>
    <div class="setting-item">
      <div class="label">
        页面刷新
        <HTooltip placement="top" text="开启时会阻止原生 F5 键刷新功能，并采用框架提供的刷新模式进行页面刷新">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.enablePageReload" />
    </div>
    <div class="setting-item">
      <div class="label">
        颜色主题
        <HTooltip placement="top" text="开启后可在明亮/暗黑模式中切换">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.enableColorScheme" />
    </div>

    <div v-if="settingsStore.mode === 'pc'" class="divider">
      面包屑导航
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        是否启用
      </div>
      <HToggle v-model="settingsStore.settings.breadcrumb.enable" />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        风格
      </div>
      <HCheckList
        v-model="settingsStore.settings.breadcrumb.style"
        :disabled="!settingsStore.settings.breadcrumb.enable"
        :options="[
          { label: '默认', value: '' },
          { label: '现代', value: 'modern' },
        ]"
      />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        是否显示主导航
      </div>
      <HToggle
        v-model="settingsStore.settings.breadcrumb.enableMainMenu"
        :disabled="['single'].includes(settingsStore.settings.menu.menuMode) || !settingsStore.settings.breadcrumb.enable"
      />
    </div>
    <div class="divider">
      页面
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>

      <HToggle v-model="settingsStore.settings.mainPage.enableHotkeys" />
    </div>
    <div class="divider">
      导航搜索
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用
      </div>

      <HToggle v-model="settingsStore.settings.navSearch.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
        <HTooltip placement="top" text="对导航进行快捷搜索">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>

      <HToggle
        v-model="settingsStore.settings.navSearch.enableHotkeys"
        :disabled="!settingsStore.settings.navSearch.enable"
      />
    </div>
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
      <HInput
        v-model="settingsStore.settings.copyright.dates" :disabled="!settingsStore.settings.copyright.enable"
        size="small"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        公司
      </div>
      <HInput
        v-model="settingsStore.settings.copyright.company" :disabled="!settingsStore.settings.copyright.enable"
        size="small"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        网址
      </div>
      <HInput
        v-model="settingsStore.settings.copyright.website" :disabled="!settingsStore.settings.copyright.enable"
        size="small"
      />
    </div>
    <div class="setting-item">
      <div class="label">
        备案
      </div>
      <HInput
        v-model="settingsStore.settings.copyright.beian" :disabled="!settingsStore.settings.copyright.enable"
        size="small"
      />
    </div>
    <div class="divider">
      主页
    </div>
    <div class="setting-item">
      <div class="label">
        是否开启
        <HTooltip placement="top" text="该功能开启时，登录成功默认进入主页，反之则默认进入导航栏里第一个导航页面">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.home.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        主页名称
        <HTooltip placement="top" text="开启国际化时，该设置无效">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HInput
        v-model="settingsStore.settings.home.title" :disabled="settingsStore.settings.toolbar.enableI18n"
        size="small"
      />
    </div>
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
        <HTooltip placement="top" text="该功能开启时，跳转路由会看到页面顶部有进度条">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.app.enableProgress" />
    </div>
    <div class="setting-item">
      <div class="label">
        动态标题
        <HTooltip
          placement="top"
          text="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置"
        >
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.app.enableDynamicTitle" />
    </div>
    <div class="setting-item">
      <div class="label">
        Storage 前缀
        <HTooltip placement="top" text="localStorage 和 sessionStorage 的字段前缀">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HInput v-model="settingsStore.settings.app.storagePrefix" size="small" style="width: 100px;" />
    </div>
    <div class="setting-item">
      <div class="label">
        页面水印
      </div>
      <HToggle v-model="settingsStore.settings.app.enableWatermark" />
    </div>
    <template v-if="isSupported" #footer>
      <HButton block @click="handleCopy">
        <SvgIcon name="ep:document-copy" />
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
    --at-apply: content-empty w-full h-1px bg-stone-2 dark:bg-stone-6;
  }
}

.themes {
  --at-apply: flex flex-wrap items-center justify-center gap-4 pb-4;

  .theme {
    --at-apply: w-12 h-12 cursor-pointer flex items-center justify-center border-rd-2 ring-1 ring-stone-2 dark:ring-stone-7 transition;

    &.active {
      --at-apply: ring-ui-primary ring-2;

      .content {
        --at-apply: rotate-0
      }
    }

    .content {
      --at-apply: w-6 h-4 rotate-45 border-rd-1\/2 transition;
    }
  }
}
.menu-mode {
  --at-apply: flex items-center justify-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark:ring-stone-7 cursor-pointer transition;

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-border-color-darker);
    }

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
      --at-apply: border-width-1 .5 bg-ui-primary/20 border-dashed border-ui-primary;

      &::before {
        --at-apply: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --at-apply: top-2 bottom-2 left-2 w-2 rounded-tl-1 rounded-bl-1;
      }

      &::after {
        --at-apply: top-2 bottom-2 left-4 .5 w-3;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-r-2 inset-b-2 inset-l-8 rounded-tr-1 rounded-br-1;
      }
    }

    &-head {
      &::before {
        --at-apply: top-2 left-2 right-2 h-2 rounded-tl-1 rounded-tr-1;
      }

      &::after {
        --at-apply: top-4 .5 left-2 bottom-2 w-3 rounded-bl-1;
      }

      .mode-container {
        --at-apply: inset-t-4 .5 inset-r-2 inset-b-2 inset-l-5 .5 rounded-br-1;
      }
    }

    &-single {
      &::after {
        --at-apply: top-2 left-2 bottom-2 w-3 rounded-tl-1 rounded-bl-1;
      }

      .mode-container {
        --at-apply: inset-t-2 inset-r-2 inset-b-2 inset-l-5 .5 rounded-tr-1 rounded-br-1;
      }
    }

    &-only-side {
      &::before {
        --at-apply: top-2 left-2 bottom-2 w-2 rounded-tl-1 rounded-bl-1;
      }

      .mode-container {
        --at-apply: top-2 right-2 bottom-2 left-4 .5 rounded-tr-1 rounded-br-1;
      }
    }

    &-only-head {
      &::before {
        --at-apply: top-2 right-2 left-2 h-2 rounded-tl-1 rounded-tr-1;
      }

      .mode-container {
        --at-apply: top-4 .5 right-2 bottom-2 left-2 rounded-bl-1 rounded-br-1;
      }
    }
  }
}

.app-width-mode {
  --at-apply: flex-center gap-4 pb-4;

  .mode {
    --at-apply: relative w16 h12 cursor-pointer overflow-hidden border-rd-2 ring-1 ring-stone-2 dark:ring-stone-7 transform;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &-adaption {
      &::before {

        --at-apply: absolute w-full h-full bg-stone-1 dark:bg-stone-9 content-empty;
      }

      & {
        .left, .right {
          --at-apply: absolute top-1\/2 -translate-y-1\/2;
        }
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
        --at-apply: absolute left-1\/2 w-1\/2 h-full -translate-x-1\/2 bg-stone-1 dark:bg-stone-9 content-empty;
      }

      & {
        .left, .right {
          --at-apply: absolute top-1\/2 -translate-y-1\/2;
        }
      }

      .left {
        --at-apply: left-0 .5;
      }

      .right {
        --at-apply: right-0 .5;
      }
    }

    &-center {
      &::before {
        --at-apply: absolute left-1\/2 w-3\/5 h-full -translate-x-1\/2 bg-stone-1 dark:bg-stone-9 content-empty;
      }
    }

    &-center-max-width {

      &::before {
        --at-apply: absolute left-1\/2 w-3\/5 h-full -translate-x-1\/2 bg-stone-1 dark:bg-stone-9 content-empty;
      }

      .left,
      .right {
        --at-apply: absolute top-1\/2 -translate-y-1\/2;
      }

      .left {
        --at-apply: left-2 .5;
      }

      .right {
        --at-apply: right-2 .5;
      }
    }
  }
}

.transition-mode {
  --at-apply: flex-center gap-4 pb-4;

  .mode {
    --at-apply: relative w-14 h-10 flex-center cursor-pointer border-rd-2 ring-1 ring-stone-2 dark:ring-stone-7;

    &.active {
      --at-apply: ring-ui-primary ring-2;
    }

    &::after {
      --at-apply: absolute top-1\/5 left-1\/5 w-3\/5 h-3\/5 border-rd-2 bg-stone-2 dark:bg-stone-9 transform content-empty;
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
.setting-item {
  --at-apply: flex items-center justify-between gap-4 px-4 py-2 rounded-2 transition hover:bg-stone-1 dark:hover:bg-stone-9;

  .label {
    --at-apply: flex items-center flex-shrink-0 gap-2 text-sm;

    i {
      --at-apply: text-xl text-orange cursor-help;
    }
  }
}
</style>
