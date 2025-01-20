
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as r}from"./index.vue_vue_type_script_setup_true_lang-BYjOVmS1.js";import{_ as m}from"./index.vue_vue_type_script_setup_true_lang-CjtEiaWg.js";import{d as f,r as _,t as u,L as p,o as d,b as v,j as n,w as x,f as h,ah as w,c5 as B,Q as a}from"./index-putfknEa.js";const g=f({__name:"leavetips",setup(E){const e=_(!0);return u((s,o,t)=>{e.value?B.confirm("当前页面还没有保存，是否确定要离开？","温馨提醒",{confirmButtonText:"确定离开",cancelButtonText:"取消",type:"warning"}).then(()=>{t()}).catch(()=>{}):t()}),(s,o)=>{const t=m,l=p("ElSwitch"),c=r;return d(),v("div",null,[n(t,{title:"页面离开提醒",content:"在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空"}),n(c,null,{default:x(()=>[n(l,{modelValue:h(e),"onUpdate:modelValue":o[0]||(o[0]=i=>w(e)?e.value=i:null),"active-text":"开启提醒","inactive-text":"关闭提醒"},null,8,["modelValue"])]),_:1})])}}});typeof a=="function"&&a(g);export{g as default};
