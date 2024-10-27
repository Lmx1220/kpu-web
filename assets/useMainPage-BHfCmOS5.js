
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{u as m,ay as l,i as c,j as f}from"./index-DI_iSbuB.js";import{u as g}from"./useTabbar-BM5yzBM0.js";function d(){const s=c(),u=f(),t=m(),a=l(),o=g();function r(){u.push({name:"reload"})}function n(e){t.setCustomTitle(s.fullPath,e),t.settings.tabbar.enable&&a.setCustomTitle({tabId:o.getId(),title:e})}function i(){t.resetCustomTitle(s.fullPath),t.settings.tabbar.enable&&a.resetCustomTitle(o.getId())}function b(e){t.setMainPageMaximize(e)}return{reload:r,setCustomTitle:n,resetCustomTitle:i,maximize:b}}export{d as u};
