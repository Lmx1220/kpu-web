
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as m}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-9JE-MPF_.js";import{d as r,$ as u,G as o,a0 as _,M as p,w as d,j as i,o as f,a1 as g}from"./index-RH8yPTKC.js";const k=r({name:"I18nSelector",__name:"index",setup(b){const{changeLocale:n,getLocale:s}=u(),a=o(()=>_()),t=o(()=>Object.keys(a.value).map(e=>({label:a.value[e].labelName,disabled:s.value===e,handle:()=>l(e)})));async function l(e){await n(e)}return(e,h)=>{const c=m;return f(),p(c,{items:[i(t)]},{default:d(()=>[g(e.$slots,"default")]),_:3},8,["items"])}}});export{k as _};
