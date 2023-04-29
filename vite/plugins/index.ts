import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import createI18n from './i8n'
import createAutoImport from './auto-import'
import createComponents from './components'

// import createSetupExtend from './setup-extend'
import createSvgIcon from './svg-icon'
import createUnocss from './unocss'
import createBanner from './banner'
import createCompression from './compression'
import createPwa from './pwa'
import createHtml from './html'
import createMock from './mock'
import createSetupExtendPlus from './setup-extend-plus'

export default function creactVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]
  // vitePlugins.push(createInspector())
  vitePlugins.push(createHtml(viteEnv, isBuild))
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  // 添加 setup语法没有name名字
  // vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSetupExtendPlus())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  vitePlugins.push(createI18n())
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(createBanner())
  viteEnv.VITE_BUILD_PWA === 'true' && vitePlugins.push(createPwa())
  return vitePlugins
}
