
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as c,r as d,e as f,o as v,f as V,h as l,w as r,q as m,j as i,Y as p}from"./index-DWg0Z22n.js";const w=c({__name:"rate",setup(_){const t=d(),n=d(),a=d(3.7);return(x,e)=>{const s=f("ElDivider"),u=f("ElRate");return v(),V("div",null,[l(s,{"content-position":"left"},{default:r(()=>[m(" 基础用法 ")]),_:1}),l(u,{modelValue:i(t),"onUpdate:modelValue":e[0]||(e[0]=o=>p(t)?t.value=o:null)},null,8,["modelValue"]),l(s,{"content-position":"left"},{default:r(()=>[m(" 辅助文字 ")]),_:1}),l(u,{modelValue:i(n),"onUpdate:modelValue":e[1]||(e[1]=o=>p(n)?n.value=o:null),"show-text":"",texts:["极差","差","一般","好","极好"]},null,8,["modelValue"]),l(s,{"content-position":"left"},{default:r(()=>[m(" 只读 ")]),_:1}),l(u,{modelValue:i(a),"onUpdate:modelValue":e[2]||(e[2]=o=>p(a)?a.value=o:null),disabled:"","show-score":"","text-color":"#ff9900","score-template":"{value}"},null,8,["modelValue"])])}}});export{w as _};
