
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,r as f,C as m,e as u,o as _,f as p,h as n,w as d,j as v,Z as x,b3 as h,V as w,X as a}from"./index-D6ceO_Rb.js";import{_ as B}from"./index.vue_vue_type_script_setup_true_lang-bcVZrhLq.js";const V=r({__name:"leavetips",setup(g){const e=f(!0);return m((s,o,t)=>{e.value?h.confirm("当前页面还没有保存，是否确定要离开？","温馨提醒",{confirmButtonText:"确定离开",cancelButtonText:"取消",type:"warning"}).then(()=>{t()}).catch(()=>{}):t()}),(s,o)=>{const t=B,l=u("ElSwitch"),c=w;return _(),p("div",null,[n(t,{title:"页面离开提醒",content:"在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空"}),n(c,null,{default:d(()=>[n(l,{modelValue:v(e),"onUpdate:modelValue":o[0]||(o[0]=i=>x(e)?e.value=i:null),"active-text":"开启提醒","inactive-text":"关闭提醒"},null,8,["modelValue"])]),_:1})])}}});typeof a=="function"&&a(V);export{V as default};
