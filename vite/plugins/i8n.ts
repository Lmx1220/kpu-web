import path from 'node:path'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'

export default function createI18n() {
  return vueI18n({
    include: path.resolve(__dirname, '../../src/locales/lang/**'),
  })
}
