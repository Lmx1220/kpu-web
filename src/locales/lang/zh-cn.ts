import elementLocale from 'element-plus/dist/locale/zh-cn.mjs'
import vxeZhCN from 'vxe-table/lib/locale/lang/zh-CN'
import { genMessage } from '../helper'

const modules = import.meta.glob('./zh-cn/**/*.json', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'zh-cn'),
    elementLocale,
    ...vxeZhCN,
  },
  labelName: '中文(繁體)',
  name: 'zh-tw',
}
