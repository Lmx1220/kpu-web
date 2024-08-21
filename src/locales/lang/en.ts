import en from 'ant-design-vue/es/locale/en_US'
import vxeEnUS from 'vxe-table/lib/locale/lang/en-US'
import { genMessage } from '../helper'

const modules = import.meta.glob('./en/**/*.json', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'en'),
    uiLocale: { ...en },
    ...vxeEnUS,
  },

  dateLocale: null,
  dateLocaleName: 'en',
}
