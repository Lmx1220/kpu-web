
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as m,K as h,r as g,o as a,a as r,s as l,L as b,M as y,g as n,b as v,f as _,w as k,h as w,n as o,e as s,p as C,l as z,m as B}from"./bootstrap-BssOdyNs.js";const x={key:0,class:"title-container border-b px-5 py-4 transition-border-color"},S=m({name:"KpuPageMain",__name:"index",props:{title:{default:""},collaspe:{type:Boolean,default:!1},height:{default:""}},setup(i){const c=i,p=h(),t=g(c.collaspe);function f(){t.value=!t.value}return(e,K)=>{const d=z,u=B;return a(),r("div",{class:o(["page-main m-4 flex flex-col border rounded-lg bg-card transition-[background-color,border-color]",{"overflow-hidden":e.collaspe}])},[p.title||e.title?(a(),r("div",x,[l(e.$slots,"title",{},()=>[b(y(e.title),1)])])):n("",!0),v("div",{class:o(["group main-container relative h-[calc-size(auto,size)] p-5 transition-height after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-1 after:h-12 after:max-h-full after:w-full after:from-transparent after:to-[hsl(var(--card))] after:bg-gradient-to-b after:opacity-0 after:transition-opacity after:content-empty",{"overflow-hidden":e.collaspe,"after:opacity-100":s(t)}]),style:C({height:s(t)?e.height:""})},[l(e.$slots,"default"),e.collaspe?(a(),_(u,{key:0,variant:"link",size:"icon",class:o(["absolute inset-b-0 inset-s-1/2 opacity-0 transition-all -translate-x-1/2 group-hover-opacity-100",{"rotate-x-180":!s(t)}]),onClick:f},{default:k(()=>[w(d,{name:"i-ep:arrow-down",class:"text-xl"})]),_:1},8,["class"])):n("",!0)],6)],2)}}});export{S as _};
