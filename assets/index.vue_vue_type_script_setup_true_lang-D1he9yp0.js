
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as l,o as n,f as o,w as t,t as p,n as u,e,B as f,bm as d,v as h,y as m,bn as _,A as v,bo as b,bp as x,i,M as y,N as g}from"./bootstrap-aYN_ym_b.js";const w=l({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(a){const r=a;return(s,c)=>(n(),o(e(d),{class:u(e(f)(e($)({size:s.size,shape:s.shape}),r.class))},{default:t(()=>[p(s.$slots,"default")]),_:3},8,["class"]))}}),k=l({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(_),h(m(r)),{default:t(()=>[p(s.$slots,"default")]),_:3},16))}}),z=l({__name:"AvatarImage",props:{src:{},referrerPolicy:{},asChild:{type:Boolean},as:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(b),v(r,{class:"h-full w-full object-cover"}),null,16))}}),$=x("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),C=l({__name:"index",props:{src:{},fallback:{},shape:{},class:{}},setup(a){const r=a;return(s,c)=>(n(),o(e(w),{shape:s.shape,class:u(r.class)},{default:t(()=>[i(e(z),{src:s.src},null,8,["src"]),i(e(k),{class:"inline-flex"},{default:t(()=>[p(s.$slots,"default",{},()=>[y(g(s.fallback),1)])]),_:3})]),_:3},8,["shape","class"]))}});export{C as _};
