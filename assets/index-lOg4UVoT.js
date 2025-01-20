
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,aZ as l,bT as m,C as u,G as c,r as p,v as _,L as f,o as g,h as b,w as h,e as r,n as v,f as x,V as B,s as w}from"./index-putfknEa.js";const y=d({name:"KFixedActionBar",__name:"index",setup(E){const n=l("actionBarRef"),{height:i}=m(n);u(i,e=>{document.documentElement.style.setProperty("--g-main-container-padding-bottom",`${e}px`)},{immediate:!0}),c(()=>{document.documentElement.style.removeProperty("--g-main-container-padding-bottom")});const a=p(!1);_(()=>{t(),window.addEventListener("scroll",t)}),c(()=>{window.removeEventListener("scroll",t)});function t(){const e=document.documentElement.scrollTop||document.body.scrollTop,s=document.documentElement.clientHeight||document.body.clientHeight,o=document.documentElement.scrollHeight||document.body.scrollHeight;a.value=Math.ceil(e+s)>=o}return(e,s)=>{const o=f("FaSmartFixedBlock");return g(),b(o,{position:"bottom"},{default:h(()=>[r("div",{ref_key:"actionBarRef",ref:n},[r("div",{class:v(["fixed-action-bar bottom-0 z-4 border-t bg-background p-5 text-center transition",{mask:!x(a)}])},[B(e.$slots,"default",{},void 0,!0)],2)],512)]),_:3})}}}),H=w(y,[["__scopeId","data-v-ab0d3890"]]);export{H as _};
