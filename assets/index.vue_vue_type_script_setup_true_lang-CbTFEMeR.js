
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-BGJ1nThW.js";import{d as B,z as k,r as N,D as c,o as f,c as $,h as g,w as e,j as a,s as r,ab as C,f as d,Y as w,i as U}from"./index-nFO8NRRw.js";const D=B({__name:"index",props:{modelValue:{type:Boolean,default:!1},mode:{default:"dialog"},id:{default:""},type:{}},emits:["update:modelValue","success"],setup(b,{emit:v}){const s=b,p=v,o=k({get(){return s.modelValue},set(l){p("update:modelValue",l)}}),u=N(),_=k(()=>{switch(s.type){case"add":return"新增";case"edit":return"编辑";case"view":return"查看";default:return"查看角色"}});function y(){var l;(l=u.value)==null||l.submit((t=!0)=>{t&&p("success"),i()})}function i(){o.value=!1}return(l,t)=>{const n=c("el-button"),z=c("el-dialog"),x=c("el-drawer");return f(),$("div",null,[s.mode==="dialog"?(f(),g(z,{key:0,modelValue:d(o),"onUpdate:modelValue":t[0]||(t[0]=m=>w(o)?o.value=m:null),title:d(_),width:"600px","close-on-click-modal":!1,"append-to-body":"","destroy-on-close":""},{footer:e(()=>[a(n,{size:"large",onClick:i},{default:e(()=>[r(" 取 消 ")]),_:1}),a(n,{type:"primary",size:"large",onClick:y},{default:e(()=>[r(" 确 定 ")]),_:1})]),default:e(()=>[a(V,C({ref_key:"form",ref:u},l.$props),null,16)]),_:1},8,["modelValue","title"])):s.mode==="drawer"?(f(),g(x,{key:1,modelValue:d(o),"onUpdate:modelValue":t[1]||(t[1]=m=>w(o)?o.value=m:null),title:d(_),size:"600px","close-on-click-modal":!1,"destroy-on-close":""},{footer:e(()=>[a(n,{size:"large",onClick:i},{default:e(()=>[r(" 取 消 ")]),_:1}),a(n,{type:"primary",size:"large",onClick:y},{default:e(()=>[r(" 确 定 ")]),_:1})]),default:e(()=>[a(V,C({ref_key:"form",ref:u},l.$props),null,16)]),_:1},8,["modelValue","title"])):U("",!0)])}}});export{D as _};
