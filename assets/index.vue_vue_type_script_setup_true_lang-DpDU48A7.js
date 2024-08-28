
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{D as V}from"./index-BUYojNSu.js";import{d as B,A as k,r as N,G as c,o as p,c as D,h as g,w as e,j as a,t as n,ac as C,f as d,Z as w,i as U}from"./index-D8CVJ9uq.js";const j=B({__name:"index",props:{modelValue:{type:Boolean,default:!1},mode:{default:"dialog"},id:{default:""},type:{}},emits:["update:modelValue","success"],setup(v,{emit:b}){const s=v,f=b,o=k({get(){return s.modelValue},set(t){f("update:modelValue",t)}}),u=N(),_=k(()=>{switch(s.type){case"add":return"新增";case"edit":return"编辑";case"view":return"查看";default:return"查看角色"}});function y(){var t;(t=u.value)==null||t.submit((l=!0)=>{l&&f("success"),i()})}function i(){o.value=!1}return(t,l)=>{const r=c("el-button"),x=c("el-dialog"),z=c("el-drawer");return p(),D("div",null,[s.mode==="dialog"?(p(),g(x,{key:0,modelValue:d(o),"onUpdate:modelValue":l[0]||(l[0]=m=>w(o)?o.value=m:null),title:d(_),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[a(r,{size:"large",onClick:i},{default:e(()=>[n(" 取 消 ")]),_:1}),a(r,{type:"primary",size:"large",onClick:y},{default:e(()=>[n(" 确 定 ")]),_:1})]),default:e(()=>[a(V,C({ref_key:"form",ref:u},t.$props),null,16)]),_:1},8,["modelValue","title"])):s.mode==="drawer"?(p(),g(z,{key:1,modelValue:d(o),"onUpdate:modelValue":l[1]||(l[1]=m=>w(o)?o.value=m:null),title:d(_),size:"600px","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[a(r,{size:"large",onClick:i},{default:e(()=>[n(" 取 消 ")]),_:1}),a(r,{type:"primary",size:"large",onClick:y},{default:e(()=>[n(" 确 定 ")]),_:1})]),default:e(()=>[a(V,C({ref_key:"form",ref:u},t.$props),null,16)]),_:1},8,["modelValue","title"])):U("",!0)])}}});export{j as _};
