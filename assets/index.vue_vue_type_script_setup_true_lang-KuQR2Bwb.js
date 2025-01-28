
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as l,o as n,f as o,w as t,s as p,n as i,e,A as f,bj as d,t as h,v as m,bk as _,z as v,bl as b,bm as x,h as u,L as g,M as k}from"./bootstrap-BssOdyNs.js";const w=l({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(a){const r=a;return(s,c)=>(n(),o(e(d),{class:i(e(f)(e($)({size:s.size,shape:s.shape}),r.class))},{default:t(()=>[p(s.$slots,"default")]),_:3},8,["class"]))}}),y=l({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(_),h(m(r)),{default:t(()=>[p(s.$slots,"default")]),_:3},16))}}),z=l({__name:"AvatarImage",props:{src:{},referrerPolicy:{},asChild:{type:Boolean},as:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(b),v(r,{class:"h-full w-full object-cover"}),null,16))}}),$=x("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),A=l({__name:"index",props:{src:{},fallback:{},shape:{},class:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(w),{shape:s.shape,class:i(r.class)},{default:t(()=>[u(e(z),{src:s.src},null,8,["src"]),u(e(y),{class:"inline-flex"},{default:t(()=>[p(s.$slots,"default",{},()=>[g(k(s.fallback),1)])]),_:3})]),_:3},8,["shape","class"]))}});export{A as _};
