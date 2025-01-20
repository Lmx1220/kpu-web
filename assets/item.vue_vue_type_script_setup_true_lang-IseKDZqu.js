
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as n,l as c,o as i,b as p,e as s,y as l,V as m,n as u}from"./index-putfknEa.js";const d={class:"breadcrumb-item flex items-center text-foreground"},f={class:"separator mx-2"},h=n({__name:"item",props:{to:{},replace:{type:Boolean},separator:{default:"/"}},setup(a){const e=a,t=c();function r(){e.to&&(e.replace?t.replace(e.to):t.push(e.to))}return(o,_)=>(i(),p("div",d,[s("span",f,l(o.separator),1),s("span",{class:u(["text flex items-center opacity-60",{"is-link cursor-pointer transition-opacity hover-opacity-100":!!e.to}]),onClick:r},[m(o.$slots,"default")],2)]))}});export{h as _};
