import elementLocale from 'element-plus/dist/locale/en.mjs'
import vxeEnUS from 'vxe-table/lib/locale/lang/en-US'
import { genMessage } from '../helper'

const modules = import.meta.glob('./en/**/*.json', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'en'),
    elementLocale,
    ...vxeEnUS,
  },

  dateLocale: null,
  dateLocaleName: 'en',
}
