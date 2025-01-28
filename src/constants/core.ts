import type { SupportedLanguagesType } from '@/locales/typing.ts'

export interface LanguageOption {
  label: string
  value: SupportedLanguagesType
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-cn',
  },
  {
    label: 'English',
    value: 'en',
  },
]
