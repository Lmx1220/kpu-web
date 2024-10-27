import type { Theme } from 'unocss/preset-uno'
import { entriesToCss, toArray } from '@unocss/core'
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
import { presetAnimations } from 'unocss-preset-animations'
import { presetScrollbar } from 'unocss-preset-scrollbar'
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
      'background': 'var(--g-container-bg)',
      'border': 'var(--g-border-color)',
    },
  },
  presets: [
    presetUno(),
    () => presetAnimations(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetScrollbar(),

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
