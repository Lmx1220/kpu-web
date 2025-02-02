
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as y,r as l,by as V,bz as _,c as h,e as u,P as v,aa as b,o as B,a as F,N as S,a9 as T}from"./bootstrap-BlzOfB9o.js";const g=y({name:"KCountTo",__name:"index",props:{startVal:{},endVal:{},autoplay:{type:Boolean,default:!0},duration:{default:2e3},transition:{default:"linear"},delay:{default:0},decimals:{default:0},separator:{default:","},prefix:{},suffix:{}},emits:["onStarted","onFinished"],setup(d,{expose:f,emit:c}){const a=d,o=c,t=l(!1),n=l(a.startVal),p=V(n,{duration:a.duration,transition:_[a.transition],delay:a.delay,disabled:t,onFinished:()=>o("onFinished"),onStarted:()=>o("onStarted")}),m=h(()=>{let e=u(p);if(e=Number(e).toFixed(a.decimals),a.separator){const[r,i]=e.split(".");e=r.replace(/\B(?=(\d{3})+(?!\d))/g,a.separator)+(i?`.${i}`:"")}return a.prefix&&(e=a.prefix+e),a.suffix&&(e=e+a.suffix),e});function s(){n.value=a.endVal}function x(){t.value=!0,n.value=a.startVal,T(()=>{t.value=!1})}return v([()=>a.startVal,()=>a.endVal],()=>{s()}),b(()=>{a.autoplay&&s()}),f({start:s,reset:x}),(e,r)=>(B(),F("span",null,S(u(m)),1))}});export{g as _};
