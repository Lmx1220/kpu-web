
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as n,a as c,o as i,f as p,i as o,t as l,a1 as m,K as d}from"./index-7K-q7dm5.js";const u={class:"breadcrumb-item flex items-center text-dark dark-text-white"},f={class:"separator mx-2"},k=n({__name:"item",props:{to:{},replace:{type:Boolean},separator:{default:"/"}},setup(s){const e=s,t=c();function r(){e.to&&(e.replace?t.replace(e.to):t.push(e.to))}return(a,_)=>(i(),p("div",u,[o("span",f,l(a.separator),1),o("span",{class:d(["text flex items-center opacity-60",{"is-link cursor-pointer transition-opacity hover-opacity-100":!!e.to}]),onClick:r},[m(a.$slots,"default")],2)]))}});export{k as _};
