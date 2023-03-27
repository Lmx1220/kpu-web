import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    /**
     * 颜色方案
     * @默认值 `''` 跟随系统
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme: 'light',
    // 默认语言，留空则跟随系统
    defaultLang: '',
  },

}

export default globalSettingsDefault
