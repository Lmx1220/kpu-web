
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
const f=/\d/,l=["-","_","/","."];function h(e=""){if(!f.test(e))return e!==e.toLowerCase()}function C(e,o){const u=l,n=[];if(!e||typeof e!="string")return n;let t="",i,a;for(const r of e){const p=u.includes(r);if(p===!0){n.push(t),t="",i=void 0;continue}const s=h(r);if(a===!1){if(i===!1&&s===!0){n.push(t),t=r,i=s;continue}if(i===!0&&s===!1&&t.length>1){const c=t.at(-1);n.push(t.slice(0,Math.max(0,t.length-1))),t=c+r,i=s;continue}}t+=r,i=s,a=p}return n.push(t),n}function R(e){return e?e[0].toUpperCase()+e.slice(1):""}function S(e,o){return e?(Array.isArray(e)?e:C(e)).map(u=>R(o!=null&&o.normalize?u.toLowerCase():u)).join(""):""}export{S as p};
