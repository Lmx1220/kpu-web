
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as i}from"./index.vue_vue_type_script_setup_true_lang-ia1rdtXp.js";import{_ as m}from"./index.vue_vue_type_script_setup_true_lang-CJRusrx0.js";import{d as p,r as u,ar as f,cc as _,aH as d,o as v,a as x,h as n,w as h,e as w,Q as B}from"./bootstrap-BssOdyNs.js";import{b as a}from"./route-block-B_A1xBdJ.js";import"./index-CI4shd_A.js";const g=p({__name:"leavetips",setup(E){const e=u(!0);return f((s,o,t)=>{e.value?_.confirm("当前页面还没有保存，是否确定要离开？","温馨提醒",{confirmButtonText:"确定离开",cancelButtonText:"取消",type:"warning"}).then(()=>{t()}).catch(()=>{}):t()}),(s,o)=>{const t=m,c=d("ElSwitch"),l=i;return v(),x("div",null,[n(t,{title:"页面离开提醒",content:"在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空"}),n(l,null,{default:h(()=>[n(c,{modelValue:w(e),"onUpdate:modelValue":o[0]||(o[0]=r=>B(e)?e.value=r:null),"active-text":"开启提醒","inactive-text":"关闭提醒"},null,8,["modelValue"])]),_:1})])}}});typeof a=="function"&&a(g);export{g as default};
