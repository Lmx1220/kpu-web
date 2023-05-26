import type { Plugin } from 'rollup'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import createI18n from './i8n'
import createAutoImport from './auto-import'
import createComponents from './components'

import createSvgIcon from './svg-icon'
import createUnoCss from './unocss'
import createBanner from './banner'
import createCompression from './compression'
import createPwa from './pwa'
import createMock from './mock'
import createVisualizer from './visualizer'

export default function creactVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[] | Plugin)[] = [vue()]
  // vitePlugins.push(createInspector())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createUnoCss())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  vitePlugins.push(createI18n())
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(createBanner())
  process.env.REPORT === 'true' && vitePlugins.push(createVisualizer())
  viteEnv.VITE_BUILD_PWA === 'true' && vitePlugins.push(createPwa())
  return vitePlugins
}
