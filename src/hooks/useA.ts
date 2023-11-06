import { cloneDeep } from 'lodash-es'
import type { AnyFunction } from '@/hooks/utils.ts'

export function useKeepAlive(anyfu: AnyFunction) {
  const route = useRoute()
  const from = cloneDeep(unref(route))
  onDeactivated(() => {
    if (!anyfu) {
      return
    }
    const to = route
    if (from.meta.cache && !from.meta.iframe) {
      const componentName = from.matched.at(-1)?.components?.default.name
      if (componentName) {
        // 通过 meta.cache 判断针对哪些页面进行缓存
        switch (typeof from.meta.cache) {
          case 'string':
            if (from.meta.cache !== to.name) {
              anyfu()
            }
            break
          case 'object':
            if (!from.meta.cache.includes(to.name as string)) {
              anyfu()
            }
            break
        }
        // 通过 meta.noCache 判断针对哪些页面不需要进行缓存
        if (from.meta.noCache) {
          switch (typeof from.meta.noCache) {
            case 'string':
              if (from.meta.noCache === to.name) {
                anyfu()
              }
              break
            case 'object':
              if (from.meta.noCache.includes(to.name as string)) {
                anyfu()
              }
              break
          }
        }
      }
    }
  })
}
