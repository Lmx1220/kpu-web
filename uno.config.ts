import type { Theme } from 'unocss/preset-uno'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { entriesToCss, toArray } from '@unocss/core'
import themes from './themes'

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  preflights: [
    {
      getCSS: () => {
        const returnCss: any = []
        const lightRoots = toArray(['{},{} *,{} ::before,{} ::after', '{} ::backdrop'])
        const darkRoots = toArray(['html.dark {},html.dark {} *,html.dark {} ::before,html.dark {} ::after', 'html.dark {} ::backdrop'])
        Object.keys(themes).forEach((key) => {
          if (themes[key]['color-scheme'] === 'light') {
            const lightCss = entriesToCss(Object.entries(themes[key]))
            returnCss.push(lightRoots.map(root => `${root.replace(/\{\s*}/g, `[data-theme=${key}]`)}{${lightCss}}`).join(''))
          }
          else {
            const darkCss = entriesToCss(Object.entries(themes[key]))
            returnCss.push(darkRoots.map(root => `${root.replace(/\{\s*}/g, `[data-theme=${key}]`)}{${darkCss}}`).join(''))
          }
        })

        return returnCss.join('')
      },
    },
  ],
  theme: {
    colors: {
      'ui-primary': 'rgb(var(--ui-primary))',
      'ui-text': 'rgb(var(--ui-text))',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  configDeps: [
    'themes/index.ts',
  ],
})
