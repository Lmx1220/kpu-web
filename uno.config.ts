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
    [/^flex-?(col)?-(start|end|center|baseline|stretch)-?(start|end|center|between|around|evenly|left|right)?$/, ([, col, items, justify]) => {
      const cls = ['flex']
      if (col === 'col') {
        cls.push('flex-col')
      }
      if (items === 'center' && !justify) {
        cls.push('items-center')
        cls.push('justify-center')
      }
      else {
        cls.push(`items-${items}`)
        if (justify) {
          cls.push(`justify-${justify}`)
        }
      }
      return cls.join(' ')
    }],
    [/^square-\[?(.*?)\]?$/, ([, size]) => `w-${size} h-${size}`],
    [/^circle-\[?(.*?)\]?$/, ([, size]) => `square-${size} rounded-full`],
  ],
  preflights: [
    {
      getCSS: () => {
        const returnCss = []
        Object.keys(themes).forEach((key) => {
          const css = entriesToCss(Object.entries(themes[key]))
          const roots = toArray(
            themes[key]['color-scheme'] === 'light'
              ? [`[data-theme="${key}"],[data-theme="${key}"] *,[data-theme="${key}"] ::before,[data-theme="${key}"] ::after`, `[data-theme="${key}"] ::backdrop`]
              : [`html.dark [data-theme="${key}"],html.dark [data-theme="${key}"] *,html.dark [data-theme="${key}"] ::before,html.dark [data-theme="${key}"] ::after`, `html.dark [data-theme="${key}"] ::backdrop`],
          )
          returnCss.push(roots.map(root => `${root}{${css}}`).join(''))
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
