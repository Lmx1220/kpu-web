
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import d from"./index-BNdG1KK1.js";import{_ as v}from"./index.vue_vue_type_script_setup_true_lang-BTi--0fw.js";import{_ as g}from"./index.vue_vue_type_script_setup_true_lang-Dg-wpO-o.js";import{_ as h}from"./index.vue_vue_type_script_setup_true_lang-Be4XB6nh.js";import x from"./index-ByQnmDW_.js";import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-CfhYzka5.js";import C from"./index-BFXhb5eC.js";import y from"./index-BW454nZe.js";import{d as S,c as B,G as E,o as f,f as _,X as R,O as p,j as l,M as k,Q as N,N as T}from"./index-RH8yPTKC.js";const U=/\d/,$=["-","_","/","."];function F(e=""){if(!U.test(e))return e!==e.toLowerCase()}function L(e,i){const a=$,s=[];if(!e||typeof e!="string")return s;let t="",n,r;for(const o of e){const u=a.includes(o);if(u===!0){s.push(t),t="",n=void 0;continue}const c=F(o);if(r===!1){if(n===!1&&c===!0){s.push(t),t=o,n=c;continue}if(n===!0&&c===!1&&t.length>1){const m=t.at(-1);s.push(t.slice(0,Math.max(0,t.length-1))),t=m+o,n=c;continue}}t+=o,n=c,r=u}return s.push(t),s}function j(e){return e?e[0].toUpperCase()+e.slice(1):""}function A(e,i){return e?(Array.isArray(e)?e:L(e)).map(a=>j(i!=null&&i.normalize?a.toLowerCase():a)).join(""):""}const Q=S({name:"ToolbarTools",__name:"tools",props:{mode:{}},setup(e){const i=e,a=Object.assign({"./Breadcrumb/index.vue":d,"./ColorScheme/index.vue":v,"./Favorites/index.vue":g,"./Fullscreen/index.vue":h,"./I18n/index.vue":x,"./NavSearch/index.vue":b,"./Notification/index.vue":C,"./PageReload/index.vue":y}),s=B(),t=E(()=>{const n=s.settings.toolbar.layout.findIndex(o=>o==="->"),r=[];return i.mode==="left-side"?s.settings.toolbar.layout.forEach((o,u)=>{u<n&&o!=="->"&&r.push(o)}):s.settings.toolbar.layout.forEach((o,u)=>{u>n&&o!=="->"&&r.push(o)}),r});return(n,r)=>(f(!0),_(p,null,R(l(t),o=>(f(),_(p,{key:o},[l(s).settings.toolbar[o]?(f(),k(N(l(a)[`./${l(A)(o)}/index.vue`]),{key:0})):T("",!0)],64))),128))}});export{Q as _};
