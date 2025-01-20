
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as u,c as m,U as h,o as p,h as b,w as i,j as l,V as f,f as e,an as k,Z as _,$ as g,ao as y,ap as v,aq as B,ar as x,b as C,e as w}from"./index-putfknEa.js";import{C as V}from"./check-Dh6LfzOj.js";const $=u({__name:"Checkbox",props:{defaultChecked:{type:Boolean},checked:{type:[Boolean,String]},disabled:{type:Boolean},required:{type:Boolean},name:{},value:{},id:{},asChild:{type:Boolean},as:{},class:{}},emits:["update:checked"],setup(r,{emit:a}){const s=r,o=a,t=m(()=>{const{class:c,...n}=s;return n}),d=h(t,o);return(c,n)=>(p(),b(e(y),_(e(d),{class:e(g)("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",s.class)}),{default:i(()=>[l(e(k),{class:"h-full w-full flex items-center justify-center text-current"},{default:i(()=>[f(c.$slots,"default",{},()=>[l(e(V),{class:"h-4 w-4"})])]),_:3})]),_:3},16,["class"]))}}),M={class:"flex-center-start gap-2"},j=["for"],N=u({name:"KCheckbox",__name:"index",props:v({disabled:{type:Boolean}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:["update:modelValue"],setup(r){const a=B(r,"modelValue"),s=x();return(o,t)=>(p(),C("div",M,[l(e($),{id:e(s),checked:a.value,"onUpdate:checked":t[0]||(t[0]=d=>a.value=d),disabled:o.disabled},null,8,["id","checked","disabled"]),w("label",{for:e(s),class:"cursor-pointer text-sm"},[f(o.$slots,"default")],8,j)]))}});export{N as _};
