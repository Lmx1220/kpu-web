
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{c2 as u}from"./bootstrap-CKvMAU9X.js";var t=(e=>(e.GET="GET",e.POST="POST",e.PUT="PUT",e.DELETE="DELETE",e))(t||{});const r="standardModuleExample",o="mock",n={Page:{url:`${o}/${r}/page`,method:t.POST},Save:{url:`${o}/${r}`,method:t.POST},Update:{url:`${o}/${r}`,method:t.PUT},Delete:{url:`${o}/${r}`,method:t.DELETE},Query:{url:`${o}/${r}/query`,method:t.POST},Detail:{url:`${o}/${r}/detail`,method:t.GET},Option:{url:`${o}/${r}/option`,method:t.GET}};function a(e){return u.post(n.Page.url,e)}function l(e){return u.post(n.Save.url,e)}function i(e){return u.post(n.Update.url,e)}function p(e){return u.delete(n.Delete.url,{data:e})}function d(e){return u.post(n.Query.url,e)}function c(e){return u.get(n.Delete.url,{params:{id:e}})}function T(){return u.get(n.Option.url)}const s={page:a,save:l,update:i,remove:p,query:d,detail:c,getOption:T};export{s as c,T as g,a as p};
