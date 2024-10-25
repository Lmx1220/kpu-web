
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as g}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-DAaMDTXp.js";import{d as l,W as _,y as c,X as v,o as r,e as i,w as m,V as x,b as p,r as b,z as h,h as w,n as I,_ as L,k as $}from"./index-BNUlLVNv.js";const k=l({name:"I18nSelector",__name:"index",setup(u){const{changeLocale:n,getLocale:t}=_(),s=c(()=>v()),a=c(()=>Object.keys(s.value).map(e=>({label:s.value[e].labelName,disabled:t.value===e,handle:()=>o(e)})));async function o(e){await n(e)}return(e,d)=>{const f=g;return r(),i(f,{items:[p(a)]},{default:m(()=>[x(e.$slots,"default")]),_:3},8,["items"])}}}),y=l({name:"I18n",__name:"index",setup(u){const n=b(!1),{getLocale:t}=_();return h(t,(s,a)=>{s!==a&&(n.value=!0)}),(s,a)=>{const o=L,e=k;return r(),i(e,{class:I(["flex-center cursor-pointer px-2 py-1",{animation:p(n)}]),onAnimationend:a[0]||(a[0]=d=>n.value=!1)},{default:m(()=>[w(o,{name:"i-ri:translate"})]),_:1},8,["class"])}}}),z=$(y,[["__scopeId","data-v-0dadb475"]]);export{z as default};
