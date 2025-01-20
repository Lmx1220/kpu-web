
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{aM as _,d as i,c as f,o as p,h as u,w as l,V as m,j as n,f as e,Z as b,$ as h,bV as L,n as y,W as v,X as C,bW as V,p as g,bX as I,bY as K,bZ as E,ap as k,aq as R,b as w,m as j,F as x,b_ as M,b$ as q,c0 as F,x as N,y as S}from"./index-putfknEa.js";/**
 * @license lucide-vue-next v0.471.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=_("ChevronLeftIcon",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-vue-next v0.471.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=_("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-vue-next v0.471.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=_("ChevronsLeftIcon",[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]]);/**
 * @license lucide-vue-next v0.471.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=_("ChevronsRightIcon",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]]);/**
 * @license lucide-vue-next v0.471.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=_("EllipsisIcon",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]),U=i({__name:"PaginationEllipsis",props:{asChild:{type:Boolean},as:{},class:{}},setup(o){const a=o,c=f(()=>{const{class:t,...s}=a;return s});return(t,s)=>(p(),u(e(L),b(c.value,{class:e(h)("flex size-8 items-center justify-center",a.class)}),{default:l(()=>[m(t.$slots,"default",{},()=>[n(e(T),{class:"size-4"})])]),_:3},16,["class"]))}}),Y=i({__name:"PaginationFirst",props:{asChild:{type:Boolean,default:!0},as:{},class:{}},setup(o){const a=o,c=f(()=>{const{class:t,...s}=a;return s});return(t,s)=>{const r=g;return p(),u(e(V),v(C(c.value)),{default:l(()=>[n(r,{class:y(e(h)("size-8 p-0",a.class)),variant:"outline"},{default:l(()=>[m(t.$slots,"default",{},()=>[n(e(Z),{class:"size-4"})])]),_:3},8,["class"])]),_:3},16)}}}),A=i({__name:"PaginationLast",props:{asChild:{type:Boolean,default:!0},as:{},class:{}},setup(o){const a=o,c=f(()=>{const{class:t,...s}=a;return s});return(t,s)=>{const r=g;return p(),u(e(I),v(C(c.value)),{default:l(()=>[n(r,{class:y(e(h)("size-8 p-0",a.class)),variant:"outline"},{default:l(()=>[m(t.$slots,"default",{},()=>[n(e(D),{class:"size-4"})])]),_:3},8,["class"])]),_:3},16)}}}),G=i({__name:"PaginationNext",props:{asChild:{type:Boolean,default:!0},as:{},class:{}},setup(o){const a=o,c=f(()=>{const{class:t,...s}=a;return s});return(t,s)=>{const r=g;return p(),u(e(K),v(C(c.value)),{default:l(()=>[n(r,{class:y(e(h)("size-8 p-0",a.class)),variant:"outline"},{default:l(()=>[m(t.$slots,"default",{},()=>[n(e(X),{class:"size-4"})])]),_:3},8,["class"])]),_:3},16)}}}),H=i({__name:"PaginationPrev",props:{asChild:{type:Boolean,default:!0},as:{},class:{}},setup(o){const a=o,c=f(()=>{const{class:t,...s}=a;return s});return(t,s)=>{const r=g;return p(),u(e(E),v(C(c.value)),{default:l(()=>[n(r,{class:y(e(h)("size-8 p-0",a.class)),variant:"outline"},{default:l(()=>[m(t.$slots,"default",{},()=>[n(e(W),{class:"size-4"})])]),_:3},8,["class"])]),_:3},16)}}}),O=i({name:"KPagination",__name:"index",props:k({size:{},total:{}},{modelValue:{},modelModifiers:{}}),emits:k(["pageChange"],["update:modelValue"]),setup(o,{emit:a}){const c=a,t=R(o,"modelValue");return(s,r)=>{const B=g;return p(),u(e(q),{total:s.total,"sibling-count":1,"show-edges":"","default-page":t.value,"items-per-page":s.size,"onUpdate:page":r[0]||(r[0]=z=>c("pageChange",z))},{default:l(({page:z})=>[n(e(M),{class:"flex-center gap-1"},{default:l(({items:$})=>[n(e(Y),{class:"h-8 w-8 p-0"}),n(e(H),{class:"h-8 w-8 p-0"}),(p(!0),w(x,null,j($,(d,P)=>(p(),w(x,null,[d.type==="page"?(p(),u(e(F),{key:P,value:d.value,"as-child":""},{default:l(()=>[n(B,{variant:d.value===z?"default":"outline",class:"h-8 w-8 p-0"},{default:l(()=>[N(S(d.value),1)]),_:2},1032,["variant"])]),_:2},1032,["value"])):(p(),u(e(U),{key:d.type,index:P,class:"size-5"},null,8,["index"]))],64))),256)),n(e(G),{class:"h-8 w-8 p-0"}),n(e(A),{class:"h-8 w-8 p-0"})]),_:2},1024)]),_:1},8,["total","default-page","items-per-page"])}}});export{O as _};
