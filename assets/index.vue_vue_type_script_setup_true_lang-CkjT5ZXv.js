
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as u,c as m,x as h,o as p,f as b,w as i,h as l,e,a0 as k,s as f,z as _,A as g,a1 as y,a2 as v,a3 as x,a4 as B,a as C,b as w}from"./bootstrap-BssOdyNs.js";import{C as V}from"./check-j-djfDI9.js";const M=u({__name:"Checkbox",props:{defaultChecked:{type:Boolean},checked:{type:[Boolean,String]},disabled:{type:Boolean},required:{type:Boolean},name:{},value:{},id:{},asChild:{type:Boolean},as:{},class:{}},emits:["update:checked"],setup(d,{emit:a}){const s=d,o=a,t=m(()=>{const{class:c,...n}=s;return n}),r=h(t,o);return(c,n)=>(p(),b(e(y),_(e(r),{class:e(g)("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",s.class)}),{default:i(()=>[l(e(k),{class:"h-full w-full flex items-center justify-center text-current"},{default:i(()=>[f(c.$slots,"default",{},()=>[l(e(V),{class:"h-4 w-4"})])]),_:3})]),_:3},16,["class"]))}}),$={class:"flex-center-start gap-2"},z=["for"],P=u({name:"KCheckbox",__name:"index",props:v({disabled:{type:Boolean}},{modelValue:{type:Boolean},modelModifiers:{}}),emits:["update:modelValue"],setup(d){const a=x(d,"modelValue"),s=B();return(o,t)=>(p(),C("div",$,[l(e(M),{id:e(s),checked:a.value,"onUpdate:checked":t[0]||(t[0]=r=>a.value=r),disabled:o.disabled},null,8,["id","checked","disabled"]),w("label",{for:e(s),class:"cursor-pointer text-sm"},[f(o.$slots,"default")],8,z)]))}});export{P as _};
