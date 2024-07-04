import en from 'element-plus/es/locale/lang/en.mjs'
import vxeEnUS from 'vxe-table/lib/locale/lang/en-US'
import { genMessage } from '../helper'

const modules = import.meta.glob('./en/**/*.json', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'en'),
    elementLocale: { ...en },
    ...vxeEnUS,
  },

  dateLocale: null,
  dateLocaleName: 'en',
}
