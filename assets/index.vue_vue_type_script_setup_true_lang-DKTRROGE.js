
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as c,aN as a,aO as u,o as l,f as n,a1 as m,i as f,h as g,N as p,K as b,_ as v}from"./index-Cv74hUM5.js";const _={key:0,class:"absolute bottom-0 left-0 w-full translate-y-1/2 text-center"},k=c({name:"SearchBar",__name:"index",props:a({showToggle:{type:Boolean,default:!0},background:{type:Boolean,default:!1}},{fold:{type:Boolean,default:!0},foldModifiers:{}}),emits:a(["toggle"],["update:fold"]),setup(s,{emit:r}){const d=r,e=u(s,"fold");function t(){e.value=!e.value,d("toggle",e.value)}return(o,h)=>{const i=v;return l(),n("div",{class:b(["relative",{"py-4":o.showToggle,"px-4 bg-[var(--g-bg)] transition":o.background}])},[m(o.$slots,"default",{fold:e.value,toggle:t}),o.showToggle?(l(),n("div",_,[f("button",{class:"h-5 inline-flex cursor-pointer select-none items-center border-size-0 rounded bg-[var(--g-bg)] px-2 text-xs font-medium outline-none",onClick:t},[g(i,{name:e.value?"i-ep:caret-bottom":"i-ep:caret-top"},null,8,["name"])])])):p("",!0)],2)}}});export{k as _};
