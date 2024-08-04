
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as y}from"./index-u7cE-7aB.js";import{d as C,c as S,u as h,a as w,r as B,e as r,o as E,f as z,h as e,w as t,q as l,j as _,S as M,_ as N,U as T,z as $}from"./index-B3Xk5Nw4.js";import{_ as D}from"./index.vue_vue_type_script_setup_true_lang-BFrOrUaO.js";import{D as L}from"./index-Hc6U800u.js";import{u as R}from"./useTabbar-BmQU7tI6.js";import"./index.es-DpaXYJhj.js";const V=C({name:"StandardModuleExampleEdit",__name:"detail",setup(j){const c=S(),a=h(),m=w(),u=R(),i=B();function d(){var n;(n=i.value)==null||n.submit(()=>{M.emit("get-data-list"),o()})}function p(){o()}function o(){c.settings.tabbar.enable&&c.settings.tabbar.mergeTabsBy!=="activeMenu"?u.close({name:"standardModuleExampleList"}):m.push({name:"standardModuleExampleList"})}return(n,q)=>{const f=N,s=r("el-button"),b=D,g=r("el-col"),x=r("el-row"),k=T,v=y;return E(),z("div",null,[e(b,{title:_(a).name==="routerName"?"新增":"编辑"},{default:t(()=>[e(s,{size:"default",round:"",onClick:o},{icon:t(()=>[e(f,{name:"ep:arrow-left"})]),default:t(()=>[l(" 返回 ")]),_:1})]),_:1},8,["title"]),e(k,null,{default:t(()=>[e(x,null,{default:t(()=>[e(g,{md:24,lg:16},{default:t(()=>[e(L,{id:_(a).params.id,ref_key:"form",ref:i,type:_(a).params.type},null,8,["id","type"])]),_:1})]),_:1})]),_:1}),e(v,null,{default:t(()=>[e(s,{type:"primary",size:"large",onClick:d},{default:t(()=>[l(" 提交 ")]),_:1}),e(s,{size:"large",onClick:p},{default:t(()=>[l(" 取消 ")]),_:1})]),_:1})])}}}),J=$(V,[["__scopeId","data-v-02fbd316"]]);export{J as default};
