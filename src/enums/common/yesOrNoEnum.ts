import { $t } from '@/locales'

export enum YesOrNoEnum {
  Yes = 1,
  No = 0,
}

export default {
  enum: (all = false) => {
    return all
      ? {
          options: [

            {
              label: '所有',
              value: undefined,
            },
            {
              label: $t('common.yes'),
              value: true,
            },
            {
              label: $t('common.no'),
              value: false,
            },
          ],
        }
      : { options: [
          {
            label: $t('common.yes'),
            value: true,
          },
          {
            label: $t('common.no'),
            value: false,
          },
        ] }
  },
  false: '否',
  true: '是',
  yes: false,
  no: true,
} as Record<string, any>
