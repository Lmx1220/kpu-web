
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as v}from"./index.vue_vue_type_script_setup_true_lang-C2ukESE2.js";import{d as m,ae as u,c as i,af as b,o as f,h as p,w as c,V as h,f as d,r as x,C as $,j as r,n as w,_ as C,p as I,s as L}from"./index-putfknEa.js";const S=m({name:"I18nSelector",__name:"index",setup(g){const{changeLocale:n,getLocale:t}=u(),s=i(()=>b()),a=i(()=>Object.keys(s.value).map(e=>({label:s.value[e].labelName,disabled:t.value===e,handle:()=>o(e)})));async function o(e){await n(e)}return(e,l)=>{const _=v;return f(),p(_,{items:[d(a)]},{default:c(()=>[h(e.$slots,"default")]),_:3},8,["items"])}}}),k=m({name:"I18n",__name:"index",setup(g){const n=x(!1),{getLocale:t}=u();return $(t,(s,a)=>{s!==a&&(n.value=!0)}),(s,a)=>{const o=C,e=I,l=S;return f(),p(l,{class:w({animation:d(n)}),onAnimationend:a[0]||(a[0]=_=>n.value=!1)},{default:c(()=>[r(e,{variant:"ghost",size:"icon"},{default:c(()=>[r(o,{name:"i-ri:translate",size:16})]),_:1})]),_:1},8,["class"])}}}),j=L(k,[["__scopeId","data-v-d25820b6"]]);export{j as default};
