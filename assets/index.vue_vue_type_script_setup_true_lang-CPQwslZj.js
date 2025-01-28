
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,r as l,bv as y,bw as _,c as v,e as u,O as h,a8 as b,o as B,a as F,M as S,a7 as T}from"./bootstrap-BssOdyNs.js";const g=V({name:"KCountTo",__name:"index",props:{startVal:{},endVal:{},autoplay:{type:Boolean,default:!0},duration:{default:2e3},transition:{default:"linear"},delay:{default:0},decimals:{default:0},separator:{default:","},prefix:{},suffix:{}},emits:["onStarted","onFinished"],setup(d,{expose:f,emit:c}){const a=d,o=c,t=l(!1),n=l(a.startVal),p=y(n,{duration:a.duration,transition:_[a.transition],delay:a.delay,disabled:t,onFinished:()=>o("onFinished"),onStarted:()=>o("onStarted")}),m=v(()=>{let e=u(p);if(e=Number(e).toFixed(a.decimals),a.separator){const[r,i]=e.split(".");e=r.replace(/\B(?=(\d{3})+(?!\d))/g,a.separator)+(i?`.${i}`:"")}return a.prefix&&(e=a.prefix+e),a.suffix&&(e=e+a.suffix),e});function s(){n.value=a.endVal}function x(){t.value=!0,n.value=a.startVal,T(()=>{t.value=!1})}return h([()=>a.startVal,()=>a.endVal],()=>{s()}),b(()=>{a.autoplay&&s()}),f({start:s,reset:x}),(e,r)=>(B(),F("span",null,S(u(m)),1))}});export{g as _};
