import { $t } from '@/locales'

export enum EnableOrDisableEnum {
  ENABLE = 1,
  DISABLE = 0,
}
export default {
  enum: (all = false) => {
    return all
      ? [

          {
            label: '所有',
            value: undefined,
          },
          {
            label: $t('kpu.common.enable'),
            value: true,
          },
          {
            label: $t('kpu.common.disable'),
            value: false,
          },
        ]
      : [
          {
            label: $t('kpu.common.enable'),
            value: true,
          },
          {
            label: $t('kpu.common.disable'),
            value: false,
          },
        ]
  },
  formatter: (value: boolean) => {
    return value ? $t('kpu.common.enable') : $t('kpu.common.disable')
  },
  false: '启用',
  true: '禁用',
  ENABLE: false,
  DISABLE: true,
}
