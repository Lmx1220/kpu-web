
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as d}from"./index-Dh5LPACC.js";import{d as m,aM as l,bB as u,P as p,aX as s,r as _,a9 as f,o as g,f as b,w as h,b as r,n as B,e as v,t as w,s as x}from"./bootstrap-CFLGDgEx.js";const y=m({name:"KFixedActionBar",__name:"index",setup(E){const n=l("actionBarRef"),{height:i}=u(n);p(i,e=>{document.documentElement.style.setProperty("--g-main-container-padding-bottom",`${e}px`)},{immediate:!0}),s(()=>{document.documentElement.style.removeProperty("--g-main-container-padding-bottom")});const a=_(!1);f(()=>{t(),window.addEventListener("scroll",t)}),s(()=>{window.removeEventListener("scroll",t)});function t(){const e=document.documentElement.scrollTop||document.body.scrollTop,c=document.documentElement.clientHeight||document.body.clientHeight,o=document.documentElement.scrollHeight||document.body.scrollHeight;a.value=Math.ceil(e+c)>=o}return(e,c)=>{const o=d;return g(),b(o,{position:"bottom"},{default:h(()=>[r("div",{ref_key:"actionBarRef",ref:n},[r("div",{class:B(["fixed-action-bar bottom-0 z-4 border-t bg-background p-5 text-center transition",{mask:!v(a)}])},[w(e.$slots,"default",{},void 0,!0)],2)],512)]),_:3})}}}),R=x(y,[["__scopeId","data-v-d8ca323c"]]);export{R as _};
