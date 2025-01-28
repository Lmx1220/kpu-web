
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
const e={required:"请输入{0}",selectRequired:"请选择{0}"},r={input:"请输入",select:"请选择"},o={title:"请完成安全验证",sliderSuccessText:"验证通过",sliderDefaultText:"请按住滑块拖动",sliderRotateDefaultTip:"点击图片可刷新",sliderRotateFailTip:"验证失败",sliderRotateSuccessTip:"验证成功，耗时{0}秒",alt:"支持img标签src属性值",refreshAriaLabel:"刷新验证码",confirmAriaLabel:"确认选择",confirm:"确认",pointAriaLabel:"点击点",clickInOrder:"请依次点击"},t={placeholder:"选择一个图标",search:"搜索图标..."},i={pageNotFound:"哎呀！未找到页面",pageNotFoundDesc:"抱歉，我们无法找到您要找的页面。",forbidden:"哎呀！访问被拒绝",forbiddenDesc:"抱歉，您没有权限访问此页面。",internalError:"哎呀！出错了",internalErrorDesc:"抱歉，服务器遇到错误。",offline:"离线页面",offlineError:"哎呀！网络错误",offlineErrorDesc:"抱歉，无法连接到互联网，请检查您的网络连接并重试。",comingSoon:"即将推出",http:{requestTimeout:"请求超时，请稍后再试。",networkError:"网络异常，请检查您的网络连接后重试。",badRequest:"请求错误。请检查您的输入并重试。",unauthorized:"登录认证过期，请重新登录后继续。",forbidden:"禁止访问, 您没有权限访问此资源。",notFound:"未找到, 请求的资源不存在。",internalServerError:"内部服务器错误，请稍后再试。"}},n={formRules:e,placeholder:r,captcha:o,iconPicker:t,fallback:i};export{o as captcha,n as default,i as fallback,e as formRules,t as iconPicker,r as placeholder};
