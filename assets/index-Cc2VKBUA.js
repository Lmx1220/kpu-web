
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as g}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-DvkSIhQ5.js";import{d as l,ae as _,A as c,af as v,o as r,h as i,w as m,a9 as x,f as p,r as b,B as h,j as w,n as I,_ as L,l as $}from"./index-D8CVJ9uq.js";const C=l({name:"I18nSelector",__name:"index",setup(u){const{changeLocale:n,getLocale:t}=_(),s=c(()=>v()),a=c(()=>Object.keys(s.value).map(e=>({label:s.value[e].labelName,disabled:t.value===e,handle:()=>o(e)})));async function o(e){await n(e)}return(e,d)=>{const f=g;return r(),i(f,{items:[p(a)]},{default:m(()=>[x(e.$slots,"default")]),_:3},8,["items"])}}}),S=l({name:"I18n",__name:"index",setup(u){const n=b(!1),{getLocale:t}=_();return h(t,(s,a)=>{s!==a&&(n.value=!0)}),(s,a)=>{const o=L,e=C;return r(),i(e,{class:I(["flex-center cursor-pointer px-2 py-1",{animation:p(n)}]),onAnimationend:a[0]||(a[0]=d=>n.value=!1)},{default:m(()=>[w(o,{name:"i-ri:translate"})]),_:1},8,["class"])}}}),A=$(S,[["__scopeId","data-v-0dadb475"]]);export{A as default};
