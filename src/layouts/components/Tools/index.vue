<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useFullscreen } from '@vueuse/core'
import Notification from './Notification/index.vue'
import eventBus from '@/util/eventBus'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import useI18nTitle from '@/util/composables/useI18nTitle'
import useMainPage from '@/util/composables/useMainPage'
import useNotificationStore from '@/store/modules/notification'

defineOptions({
  name: 'Tools',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const { t } = useI18n()

const { generateI18nTitle } = useI18nTitle()
const mainPage = useMainPage()

const notificationStore = useNotificationStore()
notificationStore.init()
const { isFullscreen, toggle } = useFullscreen()

function userCommand(command: string) {
  switch (command) {
    case 'home':
      router.push({
        name: 'home',
      })
      break
    case 'setting':
      router.push({
        name: 'personalSetting',
      })
      break
    case 'preferences':
      eventBus.emit('global-preferences-toggle')
      break
    case 'hotkeys':
      eventBus.emit('global-hotkeys-intro-toggle')
      break
    case 'logout':
      userStore.logout().then(() => {
        router.push({
          name: 'login',
        })
      })
      break
  }
}
</script>

<template>
  <div class="tools">
    <div class="buttons">
      <span v-if="settingsStore.settings.navSearch.enable" class="item" @click="eventBus.emit('global-search-toggle', 'menu')">
        <svg-icon name="i-ri:search-line" />
      </span>
      <el-popover v-if="settingsStore.settings.toolbar.enableNotification" trigger="hover" :show-after="200" placement="bottom" :width="350">
        <Notification />
        <template #reference>
          <span class="item">
            <el-badge :hidden="notificationStore.total <= 0" type="primary" :value="notificationStore.total" :max="99">
              <svg-icon name="i-ri:notification-3-line" />
            </el-badge>
          </span>
        </template>
      </el-popover>
      <i18n-selector>
        <span class="item">
          <svg-icon name="i-ri:translate" />
        </span>
      </i18n-selector>
      <span v-if="settingsStore.mode === 'pc' && settingsStore.settings.toolbar.enableFullscreen" class="item" @click="toggle">
        <svg-icon :name="isFullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'" />
      </span>
      <span v-if="settingsStore.settings.toolbar.enablePageReload" class="item" @click="mainPage.reload()">
        <svg-icon name="i-iconoir:refresh-double" />
      </span>
      <span v-if="settingsStore.settings.toolbar.enableColorScheme" class="item" @click="settingsStore.setColorScheme(settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark')">
        <svg-icon :name="settingsStore.settings.app.colorScheme === 'light' ? 'i-ri:sun-line' : 'i-ri:moon-line'" />
      </span>
    </div>
    <el-dropdown class="user-container" size="default" @command="userCommand">
      <div class="user-wrapper">
        <el-avatar size="small">
          <svg-icon name="i-ep:user-filled" />
        </el-avatar>
        {{ userStore.account }}
        <svg-icon name="i-ep:caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item v-if="settingsStore.settings.home.enable" command="home">
            {{ generateI18nTitle('route.home', settingsStore.settings.home.title) }}
          </el-dropdown-item>
          <el-dropdown-item command="setting">
            {{ t('app.profile') }}
          </el-dropdown-item>
          <el-dropdown-item v-if="settingsStore.settings.app.enableUserPreferences" command="preferences">
            {{ t('app.preferences') }}
          </el-dropdown-item>
          <el-dropdown-item v-if="settingsStore.mode === 'pc'" divided command="hotkeys">
            {{ t('app.hotkeys') }}
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            {{ t('app.logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;

    .buttons {
        margin-right: 20px;

        .item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 26px;
            width: 34px;
            cursor: pointer;
            vertical-align: middle;

          .icon {
            color: var(--el-text-color-primary);
            transition: var(--el-transition-color);
          }

            .el-badge {
                display: flex;
                align-items: center;
            }
        }
    }

    :deep(.language-container) {
        font-size: 16px;
    }

    :deep(.user-container) {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        cursor: pointer;

        .user-wrapper {
            .el-avatar {
                vertical-align: middle;
                margin-top: -2px;
                margin-right: 4px;
            }
        }
    }
}
</style>
