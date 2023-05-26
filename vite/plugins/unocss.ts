import presetIcons from '@unocss/preset-icons'
import UnoCSS from 'unocss/vite'

export default function createUnoCss() {
  return UnoCSS({
    presets: [
      presetIcons({
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
      }),
    ],
  })
}
