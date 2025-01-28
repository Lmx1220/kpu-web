export type Locale = 'en' | 'zh-cn'

export const messages: Record<Locale, Record<string, string>> = {
  'en': {
    cancel: 'Cancel',
    collapse: 'Collapse',
    confirm: 'Confirm',
    expand: 'Expand',
    reset: 'Reset',
    submit: 'Submit',
  },
  'zh-cn': {
    cancel: '取消',
    collapse: '收起',
    confirm: '确认',
    expand: '展开',
    reset: '重置',
    submit: '提交',
  },
}

export const getMessages = (locale: Locale) => messages[locale]
