
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as l,o as n,h as o,w as t,V as p,n as i,f as e,$ as f,bq as d,W as h,X as _,br as m,Z as v,bs as b,bt as x,j as u,x as y,y as g}from"./index-putfknEa.js";const w=l({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(a){const r=a;return(s,c)=>(n(),o(e(d),{class:i(e(f)(e(z)({size:s.size,shape:s.shape}),r.class))},{default:t(()=>[p(s.$slots,"default")]),_:3},8,["class"]))}}),$=l({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(m),h(_(r)),{default:t(()=>[p(s.$slots,"default")]),_:3},16))}}),k=l({__name:"AvatarImage",props:{src:{},referrerPolicy:{},asChild:{type:Boolean},as:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(b),v(r,{class:"h-full w-full object-cover"}),null,16))}}),z=x("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),B=l({__name:"index",props:{src:{},fallback:{},shape:{},class:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(w),{shape:s.shape,class:i(r.class)},{default:t(()=>[u(e(k),{src:s.src},null,8,["src"]),u(e($),{class:"inline-flex"},{default:t(()=>[p(s.$slots,"default",{},()=>[y(g(s.fallback),1)])]),_:3})]),_:3},8,["shape","class"]))}});export{B as _};
