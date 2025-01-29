
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as r}from"./index.vue_vue_type_script_setup_true_lang-CjgLcnfR.js";import{_ as m}from"./index.vue_vue_type_script_setup_true_lang-Cmc5FAQ9.js";import{d as f,r as p,as as u,cf as _,aI as d,o as v,a as x,i as n,w,e as B,R as h}from"./bootstrap-CFLGDgEx.js";import{b as a}from"./route-block-B_A1xBdJ.js";import"./index-CWw-wBac.js";const g=f({__name:"leavetips",setup(E){const e=p(!0);return u((s,o,t)=>{e.value?_.confirm("当前页面还没有保存，是否确定要离开？","温馨提醒",{confirmButtonText:"确定离开",cancelButtonText:"取消",type:"warning"}).then(()=>{t()}).catch(()=>{}):t()}),(s,o)=>{const t=m,l=d("ElSwitch"),c=r;return v(),x("div",null,[n(t,{title:"页面离开提醒",content:"在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空"}),n(c,null,{default:w(()=>[n(l,{modelValue:B(e),"onUpdate:modelValue":o[0]||(o[0]=i=>h(e)?e.value=i:null),"active-text":"开启提醒","inactive-text":"关闭提醒"},null,8,["modelValue"])]),_:1})])}}});typeof a=="function"&&a(g);export{g as default};
