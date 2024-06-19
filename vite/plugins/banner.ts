import banner from 'vite-plugin-banner'

export default function createBanner() {
  return banner(`
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/vue3-ts
 */
    `)
}
