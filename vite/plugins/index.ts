import process from 'node:process'
import type { Plugin } from 'rollup'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueLegacy from '@vitejs/plugin-legacy'
import createAutoImport from './auto-import'
import createComponents from './components'

import createSvgIcon from './svg-icon'
import createUnoCss from './unocss'
import createBanner from './banner'
import createCompression from './compression'
import createPwa from './pwa'
import createMock from './mock'
import createVisualizer from './visualizer'
import createVueDevTools from './vue-dev-tools'
import createInspector from './inspector'

export default function creactVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[] | Plugin)[] = [vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        'es.array.at',
        'es.array.find-last',
      ],
    }),
  ]
  vitePlugins.push(createInspector())
  vitePlugins.push(createVueDevTools())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createUnoCss())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(createBanner())
  process.env.REPORT === 'true' && vitePlugins.push(createVisualizer())
  viteEnv.VITE_BUILD_PWA === 'true' && vitePlugins.push(createPwa())
  return vitePlugins
}
