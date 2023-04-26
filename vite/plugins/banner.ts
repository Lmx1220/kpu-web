import banner from 'vite-plugin-banner'

export default function createBanner() {
  return banner(`
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * https://admin.netlify.app
 * 代码仓库
 * Gitee  https://gitee.com/hooray/admin
 * Github https://github.com/hooray/admin
 */
    `)
}
