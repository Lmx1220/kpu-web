
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as g}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-CAVB0Xov.js";import{d as l,ad as _,z as c,ae as v,o as r,h as m,w as i,a8 as x,f as p,r as b,A as h,j as w,n as I,_ as L}from"./index-nFO8NRRw.js";import{_ as $}from"./_plugin-vue_export-helper-DlAUqK2U.js";const C=l({name:"I18nSelector",__name:"index",setup(u){const{changeLocale:n,getLocale:o}=_(),s=c(()=>v()),a=c(()=>Object.keys(s.value).map(e=>({label:s.value[e].labelName,disabled:o.value===e,handle:()=>t(e)})));async function t(e){await n(e)}return(e,d)=>{const f=g;return r(),m(f,{items:[p(a)]},{default:i(()=>[x(e.$slots,"default")]),_:3},8,["items"])}}}),S=l({name:"I18n",__name:"index",setup(u){const n=b(!1),{getLocale:o}=_();return h(o,(s,a)=>{s!==a&&(n.value=!0)}),(s,a)=>{const t=L,e=C;return r(),m(e,{class:I(["flex-center cursor-pointer px-2 py-1",{animation:p(n)}]),onAnimationend:a[0]||(a[0]=d=>n.value=!1)},{default:i(()=>[w(t,{name:"i-ri:translate"})]),_:1},8,["class"])}}}),j=$(S,[["__scopeId","data-v-0dadb475"]]);export{j as default};
