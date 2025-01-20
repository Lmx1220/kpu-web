
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as m,ac as h,r as b,o as t,b as r,V as l,i as n,e as g,h as y,w as v,j as _,n as o,f as s,q as k,ad as w,p as C,x,y as z}from"./index-putfknEa.js";const B={key:0,class:"title-container border-b px-5 py-4 transition-border-color"},S=m({name:"KPageMain",__name:"index",props:{title:{default:""},collaspe:{type:Boolean,default:!1},height:{default:""}},setup(i){const c=i,f=h(),a=b(c.collaspe);function p(){a.value=!a.value}return(e,V)=>{const d=w,u=C;return t(),r("div",{class:o(["page-main m-4 flex flex-col border rounded-lg bg-card transition-[background-color,border-color]",{"overflow-hidden":e.collaspe}])},[f.title||e.title?(t(),r("div",B,[l(e.$slots,"title",{},()=>[x(z(e.title),1)])])):n("",!0),g("div",{class:o(["group main-container relative h-[calc-size(auto,size)] p-5 transition-height after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-1 after:h-12 after:max-h-full after:w-full after:from-transparent after:to-[hsl(var(--card))] after:bg-gradient-to-b after:opacity-0 after:transition-opacity after:content-empty",{"overflow-hidden":e.collaspe,"after:opacity-100":s(a)}]),style:k({height:s(a)?e.height:""})},[l(e.$slots,"default"),e.collaspe?(t(),y(u,{key:0,variant:"link",size:"icon",class:o(["absolute inset-b-0 inset-s-1/2 opacity-0 transition-all -translate-x-1/2 group-hover-opacity-100",{"rotate-x-180":!s(a)}]),onClick:p},{default:v(()=>[_(d,{name:"i-ep:arrow-down",class:"text-xl"})]),_:1},8,["class"])):n("",!0)],6)],2)}}});export{S as _};
