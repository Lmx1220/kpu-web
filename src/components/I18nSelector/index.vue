<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useI18nTitle from '@/util/composables/useI18nTitle'
import { getElementLocales } from '@/locales'
import useSettingsStore from '@/store/modules/settings.js'

defineOptions({
  name: 'I18nSelector',
})

// 切换语言工具
const { locale } = useI18n()
const settingsStore = useSettingsStore()

const locales = computed(() => getElementLocales())
// 生成国际化标题
const { generateI18nTitle } = useI18nTitle()

function languageCommand(command: string) {
  // 切换语言
  locale.value = command
  settingsStore.setDefaultLang(command)
  // 生成国际化标题
  generateI18nTitle('route.login', 'Login')
}
</script>

<template>
  <el-dropdown class="language-container" size="default" @command="languageCommand">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in locales" :key="index" :disabled="settingsStore.settings.app.defaultLang === item.name" :command="item.name">
          {{ item.labelName }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
