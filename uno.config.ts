import type { PresetOrFactoryAwaitable } from 'unocss'
import type { Theme } from 'unocss/preset-uno'
import { entriesToCss, toArray } from '@unocss/core'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
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
        Object.keys(themes).forEach((theme) => {
          Object.keys(themes[theme]).forEach((key) => {
            themes[theme][key]['color-scheme'] = key
            const css = entriesToCss(Object.entries(themes[theme][key]))
            // console.log(css)

            const roots = toArray(
              key === 'light'
                ? [`[data-theme="${theme}"],[data-theme="${theme}"] *,[data-theme="${theme}"] ::before,[data-theme="${theme}"] ::after`, `[data-theme="${theme}"] ::backdrop`]
                : [`html.dark [data-theme="${theme}"],html.dark [data-theme="${theme}"] *,html.dark [data-theme="${theme}"] ::before,html.dark [data-theme="${theme}"] ::after`, `html.dark [data-theme="${theme}"] ::backdrop`],
            )
            returnCss.push(roots.map(root => `${root}{${css}}`).join(''))
          })
        })
        return returnCss.join('')
      },
    },
  ],
  theme: {
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      xl: 'calc(var(--radius) + 4px)',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
  },
  presets: [
    presetUno(),
    await presetAnimations() as PresetOrFactoryAwaitable<Theme>,
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetScrollbar(),
    presetLegacyCompat({
      legacyColorSpace: true,
    }) as PresetOrFactoryAwaitable<Theme>,
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
