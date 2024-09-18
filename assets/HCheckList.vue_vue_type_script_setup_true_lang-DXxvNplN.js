
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as u,aw as l,ax as m,y as b,o as a,c as t,F as o,aa as p,n as _,h,p as f,t as g,_ as v}from"./index-2if5aP_c.js";const y={class:"inline-flex select-none items-center justify-center of-hidden rounded-md bg-stone-3 dark-bg-stone-7"},k=["disabled","onClick"],V=u({__name:"HCheckList",props:l({options:{},disabled:{type:Boolean,default:!1}},{modelValue:{},modelModifiers:{}}),emits:l(["change"],["update:modelValue"]),setup(i,{emit:d}){const r=d,n=m(i,"modelValue");return b(n,s=>{r("change",s)}),(s,x)=>{const c=v;return a(),t("div",y,[(a(!0),t(o,null,p(s.options,e=>(a(),t("button",{key:e.value,disabled:s.disabled||e.disabled,class:_(["flex cursor-pointer items-center truncate border-size-0 bg-inherit px-2 py-1.5 text-sm disabled-cursor-not-allowed disabled-opacity-50 hover-not-disabled-bg-ui-primary hover-not-disabled-text-ui-text",{"text-ui-text bg-ui-primary":n.value===e.value}]),onClick:C=>n.value=e.value},[e.icon?(a(),h(c,{key:0,name:e.icon},null,8,["name"])):(a(),t(o,{key:1},[f(g(e.label),1)],64))],10,k))),128))])}}});export{V as _};
