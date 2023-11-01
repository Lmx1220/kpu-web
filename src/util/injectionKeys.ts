import type { InjectionKey } from 'vue'

// Todo 待合并
export function createInjectionKey<T>(key: string): InjectionKey<T> {
  return key as any
}

export const rootMenuInjectionKey = createInjectionKey<any>('rootMenu')
