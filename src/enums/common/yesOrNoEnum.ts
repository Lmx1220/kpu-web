export enum YesOrNoEnum {
  Yes = 1,
  No = 0,
}

export default {
  enum: (all = false) => {
    const { t } = useI18n()
    return all
      ? [

          {
            label: '所有',
            value: undefined,
          },
          {
            label: t('kpu.common.yes'),
            value: true,
          },
          {
            label: t('kpu.common.no'),
            value: false,
          },
        ]
      : [
          {
            label: t('kpu.common.yes'),
            value: true,
          },
          {
            label: t('kpu.common.no'),
            value: false,
          },
        ]
  },
  false: '否',
  true: '是',
  yes: false,
  no: true,
} as Record<string, any>
