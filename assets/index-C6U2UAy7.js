
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as s,r as l,l as r,A as a,o as d,c as i,V as m,n as u,f as _}from"./index-vu1a6MAo.js";import{_ as p}from"./_plugin-vue_export-helper-DlAUqK2U.js";const f=s({name:"FixedActionBar",__name:"index",setup(g){const t=l(!1);r(()=>{e(),window.addEventListener("scroll",e)}),a(()=>{window.removeEventListener("scroll",e)});function e(){const o=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientHeight||document.body.clientHeight,c=document.documentElement.scrollHeight||document.body.scrollHeight;t.value=Math.ceil(o+n)>=c}return(o,n)=>(d(),i("div",{class:u(["fixed-action-bar bottom-0 z-4 bg-[var(--g-container-bg)] p-5 text-center transition",{shadow:!_(t)}]),"data-fixed-calc-width":""},[m(o.$slots,"default",{},void 0,!0)],2))}}),w=p(f,[["__scopeId","data-v-08e3fc2c"]]);export{w as _};
