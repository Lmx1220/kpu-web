import zhCN from 'ant-design-vue/es/locale/zh_CN'
import vxeZhCN from 'vxe-table/lib/locale/lang/zh-CN'
import { genMessage } from '../helper'

const modules = import.meta.glob('./zh-cn/**/*.json', { eager: true })
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'zh-cn'),
    uiLocale: { ...zhCN },
    ...vxeZhCN,
  },
  labelName: '中文(简体)',
  name: 'zh-cn',
}
