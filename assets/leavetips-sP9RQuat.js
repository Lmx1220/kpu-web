
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,r as m,m as f,G as u,o as _,c as p,j as n,w as d,f as v,Z as x,Y as w,O as B,R as a}from"./index-D8CVJ9uq.js";import{_ as h}from"./index.vue_vue_type_script_setup_true_lang-CwqCei2-.js";const g=r({__name:"leavetips",setup(E){const e=m(!0);return f((s,o,t)=>{e.value?w.confirm("当前页面还没有保存，是否确定要离开？","温馨提醒",{confirmButtonText:"确定离开",cancelButtonText:"取消",type:"warning"}).then(()=>{t()}).catch(()=>{}):t()}),(s,o)=>{const t=h,l=u("ElSwitch"),c=B;return _(),p("div",null,[n(t,{title:"页面离开提醒",content:"在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空"}),n(c,null,{default:d(()=>[n(l,{modelValue:v(e),"onUpdate:modelValue":o[0]||(o[0]=i=>x(e)?e.value=i:null),"active-text":"开启提醒","inactive-text":"关闭提醒"},null,8,["modelValue"])]),_:1})])}}});typeof a=="function"&&a(g);export{g as default};
