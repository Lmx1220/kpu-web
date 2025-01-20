
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,as as p,H as f,at as b,f as a,o as i,b as V,ah as _,n as r,$ as m,ap as g,aq as v,h as x,s as k}from"./index-putfknEa.js";const M=d({__name:"Input",props:{defaultValue:{},modelValue:{},class:{}},emits:["update:modelValue"],setup(l,{emit:o}){const e=l,s=p(e,"modelValue",o,{passive:!0,defaultValue:e.defaultValue});return(n,u)=>f((i(),V("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>_(s)?s.value=c:null),class:r(a(m)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e.class))},null,2)),[[b,a(s)]])}}),w=d({name:"KInput",__name:"index",props:g({disabled:{type:Boolean},class:{}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(l){const o=l,e=v(l,"modelValue");return(t,s)=>(i(),x(a(M),{modelValue:e.value,"onUpdate:modelValue":s[0]||(s[0]=n=>e.value=n),disabled:t.disabled,autocomplete:"off",class:r(a(m)("w-[200px]",o.class))},null,8,["modelValue","disabled","class"]))}}),h=k(w,[["__scopeId","data-v-adf00c27"]]);export{h as _};
