
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as _,r as u,e as v,o as x,f as c,h as l,w as a,q as m,j as s,Y as d}from"./index-4WfM3T31.js";const N=_({__name:"inputnumber",setup(b){const i=u(1),p=u(1),r=u(5),f=u(1),V=u(1);return(E,e)=>{const o=v("ElDivider"),t=v("ElInputNumber");return x(),c("div",null,[l(o,{"content-position":"left"},{default:a(()=>[m(" 基础用法 ")]),_:1}),l(t,{modelValue:s(i),"onUpdate:modelValue":e[0]||(e[0]=n=>d(i)?i.value=n:null),min:1,max:10,"aria-label":"描述文字"},null,8,["modelValue"]),l(o,{"content-position":"left"},{default:a(()=>[m(" 禁用状态 ")]),_:1}),l(t,{modelValue:s(p),"onUpdate:modelValue":e[1]||(e[1]=n=>d(p)?p.value=n:null),disabled:!0},null,8,["modelValue"]),l(o,{"content-position":"left"},{default:a(()=>[m(" 步数 ")]),_:1}),l(t,{modelValue:s(r),"onUpdate:modelValue":e[2]||(e[2]=n=>d(r)?r.value=n:null),step:2},null,8,["modelValue"]),l(o,{"content-position":"left"},{default:a(()=>[m(" 精度 ")]),_:1}),l(t,{modelValue:s(f),"onUpdate:modelValue":e[3]||(e[3]=n=>d(f)?f.value=n:null),precision:2,step:.1,max:10},null,8,["modelValue"]),l(o,{"content-position":"left"},{default:a(()=>[m(" 按钮位置 ")]),_:1}),l(t,{modelValue:s(V),"onUpdate:modelValue":e[4]||(e[4]=n=>d(V)?V.value=n:null),"controls-position":"right",min:1,max:10},null,8,["modelValue"])])}}});export{N as _};
