import type { InjectionKey } from 'vue'

export function createInjectionKey<T>(key: string): InjectionKey<T> {
  return key as any
}

export const i18nTitleInjectionKey = createInjectionKey<any>('i18nTitle')
export const rootMenuInjectionKey = createInjectionKey<any>('rootMenu')
