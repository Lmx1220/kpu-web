
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as i,a4 as a,a5 as u,o as n,a as s,t as m,b as f,i as p,h as g,n as b,m as _}from"./bootstrap-CKvMAU9X.js";const h={key:0,class:"absolute bottom-0 left-0 w-full translate-y-1/2 text-center"},B=i({name:"KSearchBar",__name:"index",props:a({showToggle:{type:Boolean,default:!0},background:{type:Boolean,default:!1}},{fold:{type:Boolean,default:!0},foldModifiers:{}}),emits:a(["toggle"],["update:fold"]),setup(l,{emit:r}){const d=r,e=u(l,"fold");function t(){e.value=!e.value,d("toggle",e.value)}return(o,v)=>{const c=_;return n(),s("div",{class:b(["relative",{"py-4":o.showToggle,"px-4 bg-secondary transition":o.background}])},[m(o.$slots,"default",{fold:e.value,toggle:t}),o.showToggle?(n(),s("div",h,[f("button",{class:"h-5 inline-flex cursor-pointer select-none items-center border-size-0 rounded bg-secondary px-2 text-xs font-medium outline-none",onClick:t},[p(c,{name:e.value?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])])])):g("",!0)],2)}}});export{B as _};
