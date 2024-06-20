import process from 'node:process'
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
import createConsole from './console'
import createArchiver from './archiver'
import appInfo from './app-info'
import createDevtools from './devtools'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    appInfo(),
    vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        'es.array.at',
        'es.array.find-last',
      ],
    }),
  ]
  vitePlugins.push(createDevtools(viteEnv))
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createUnoCss())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  vitePlugins.push(...createCompression(viteEnv, isBuild))
  vitePlugins.push(createArchiver(viteEnv))
  vitePlugins.push(createConsole())
  vitePlugins.push(createBanner())
  process.env.REPORT === 'true' && vitePlugins.push(createVisualizer() as any)
  viteEnv.VITE_BUILD_PWA === 'true' && vitePlugins.push(createPwa())
  return vitePlugins
}
